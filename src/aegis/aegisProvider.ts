import { Decrypt } from '@delight-labs/aegis-js';
import mitt, { type Emitter } from 'mitt';
import {
  type EIP1193Events,
  type EIP1193EventMap,
  type WalletRpcSchema,
  type Chain,
  type WalletClient,
  ProviderRpcError,
  createWalletClient,
  http,
  hexToBigInt,
  numberToHex,
  getAddress,
  isHex,
  hexToNumber,
  // UserRejectedRequestError,
  ProviderDisconnectedError,
  UnsupportedProviderMethodError,
} from 'viem';
import { mnemonicToAccount, privateKeyToAccount } from 'viem/accounts';
import { storyAeneid } from 'wagmi/chains';

import { aegisStorageManager } from './aegisStorage';

type EventMap = {
  [K in keyof EIP1193EventMap]: Parameters<EIP1193EventMap[K]>[0];
};

interface EIP1193RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

type SupportedMethods = Extract<
  WalletRpcSchema[number]['Method'],
  | 'eth_requestAccounts'
  | 'eth_accounts'
  | 'eth_chainId'
  | 'eth_sendTransaction'
  | 'eth_signTransaction'
  | 'personal_sign'
>;

type MethodReturnTypeMap = {
  [P in WalletRpcSchema[number] as P['Method']]: P['ReturnType'];
};

type MethodParamsMap = {
  [P in WalletRpcSchema[number] as P['Method']]: P['Parameters'];
};

interface RequestArguments<T extends SupportedMethods> extends EIP1193RequestArguments {
  readonly method: T;
  readonly params?: MethodParamsMap[T];
}

interface Provider {
  disconnect: () => void;
  close: () => void;
  request: <T extends SupportedMethods>(args: RequestArguments<T>) => Promise<MethodReturnTypeMap[T]>;
}

export interface AegisProviderConfig {
  chain: Chain;
  onPasswordRequest: () => Promise<string>;
  selectConnection: () => Promise<void>;
}

export class AegisProvider implements Provider, EIP1193Events {
  private emitter: Emitter<EventMap>;
  private walletClient: WalletClient | undefined = undefined;
  private config: AegisProviderConfig;

  private storageManager = aegisStorageManager;
  private get storage() {
    return this.storageManager.getStorage();
  }
  private get selectedWalletAddress() {
    const selected = this.storageManager.getSelectedWalletAddress();
    return Boolean(selected) ? getAddress(selected) : undefined;
  }

  private emit: Emitter<EventMap>['emit'];

  public on: EIP1193Events['on'];
  public removeListener: EIP1193Events['removeListener'];

  constructor(config: AegisProviderConfig) {
    console.log('AegisProvider: constructing with config', config);
    this.config = config;
    this.emitter = mitt<EventMap>();
    this.on = this.emitter.on;
    this.emit = this.emitter.emit;
    this.removeListener = this.emitter.off;

    this.walletClient = createWalletClient({
      chain: this.config.chain,
      transport: http(),
    });

    console.log('AegisProvider: initialized', { chain: config.chain.name });
  }

  async request<T extends SupportedMethods>(args: RequestArguments<T>): Promise<MethodReturnTypeMap[T]> {
    console.log(`AegisProvider: request called with method ${args.method}`);

    if (!this.storage.wallets.length || !this.selectedWalletAddress) {
      switch (args.method) {
        case 'eth_requestAccounts': {
          console.log('AegisProvider: [eth_requestAccounts] try to connect wallet as no wallets found in storage?');
          await this.config.selectConnection();

          if (!this.walletClient) {
            this.walletClient = createWalletClient({
              chain: this.config.chain,
              transport: http(),
            });
          }
          // 1. wallet.connect open connect flow with connect modal ui
          // 여기서 useConnect state pending => connecter 에서 request 응답 기다리는 동안 react query 로 처리 해줌
          // 모달 중간에 닫음 UserRejected 로 처리되어야함 => // throw new UserRejectedRequestError(new Error('User rejected connection'));

          // 2. emit accountChanges
          this.emit('accountsChanged', [this.selectedWalletAddress!]);
          break;
        }
        case 'eth_chainId': {
          return numberToHex(storyAeneid.id) satisfies MethodReturnTypeMap['eth_chainId'] as never;
        }
        default: {
          console.log("AegisProvider: no wallets in storage, can't process method", args.method);
          throw new ProviderRpcError(new Error('No wallet connected'), {
            code: 4902,
            shortMessage: 'No wallet connected',
          });
        }
      }
    }

    switch (args.method) {
      case 'eth_requestAccounts':
      case 'eth_accounts': {
        // 여기서말하는 account 는 viem account 가 아니라 지갑 주소
        const accounts = this.storage.wallets.map(w => getAddress(w.address));
        return accounts satisfies MethodReturnTypeMap['eth_requestAccounts'] as never;
      }

      case 'eth_chainId': {
        console.log('AegisProvider: eth_chainId called');
        // 이거 wallet client 혹은 account 에서 가져와야하는거아닌가? 스펙 확인 => 우리 경우 둘이 동일함 for now
        return numberToHex(this.config.chain.id) satisfies MethodReturnTypeMap['eth_chainId'] as never;
      }

      // 잘 안쓰임
      case 'eth_signTransaction': {
        console.log('AegisProvider: eth_signTransaction called');
        // TODO abstract to wallet
        const account = this.getAccount(
          await this.config.onPasswordRequest(),
          this.storage.wallets.find(w => w.address === this.selectedWalletAddress)!.encryptedSecret
        );

        console.log('AegisProvider: signing transaction - account obtained');

        const [txRequest] = args.params as MethodParamsMap['eth_signTransaction'];

        if (txRequest.type && txRequest.type !== '0x2') {
          throw new ProviderRpcError(new Error(`Unsupported transaction type: ${txRequest.type}`), {
            code: 4200,
            shortMessage: `Transaction type ${txRequest.type} is not supported`,
          });
        }

        console.log('AegisProvider: signing transaction', txRequest);

        const tx = await account.signTransaction({
          type: 'eip1559', // 0x2,
          to: txRequest.to,
          chainId: this.config.chain.id,
          value: txRequest.value ? hexToBigInt(txRequest.value) : undefined,
          data: txRequest.data,
          gas: txRequest.gas ? hexToBigInt(txRequest.gas) : undefined,
          nonce: txRequest.nonce ? hexToNumber(txRequest.nonce) : undefined,
          maxPriorityFeePerGas: txRequest.maxPriorityFeePerGas
            ? hexToBigInt(txRequest.maxPriorityFeePerGas)
            : undefined,
          maxFeePerGas: txRequest.maxFeePerGas ? hexToBigInt(txRequest.maxFeePerGas) : undefined,
        });

        return tx satisfies MethodReturnTypeMap['eth_signTransaction'] as never;
      }

      case 'personal_sign': {
        const account = this.getAccount(
          await this.config.onPasswordRequest(),
          this.storage.wallets.find(w => w.address === this.selectedWalletAddress)!.encryptedSecret
        );

        const [message, address] = args.params as MethodParamsMap['personal_sign'];
        console.log('AegisProvider: personal_sign called', { message, address });

        if (getAddress(address) !== this.selectedWalletAddress) {
          throw new ProviderRpcError(new Error('Address mismatch'), {
            code: 4900,
            shortMessage: 'Address mismatch',
          });
        }

        const signature = await account.signMessage({ message });

        console.log('AegisProvider: message signed', { signature });

        return signature satisfies MethodReturnTypeMap['personal_sign'] as never;
      }

      // most used
      case 'eth_sendTransaction': {
        if (!this.walletClient) {
          throw new ProviderRpcError(new Error('Wallet client not initialized'), {
            code: 4900,
            shortMessage: 'Wallet client not initialized',
          });
        }

        // TODO abstract to wallet
        const account = this.getAccount(
          await this.config.onPasswordRequest(),
          this.storage.wallets.find(w => w.address === this.selectedWalletAddress)!.encryptedSecret
        );

        console.log('AegisProvider: sending transaction - account obtained');

        const [txRequest] = args.params as MethodParamsMap['eth_sendTransaction'];

        console.log('AegisProvider: sending transaction', txRequest);

        const hash = await this.walletClient.sendTransaction({
          account,
          type: 'eip1559', // 0x2
          chain: this.walletClient.chain,
          to: txRequest.to,
          value: txRequest.value ? hexToBigInt(txRequest.value) : undefined,
          data: txRequest.data,
          // gas: txRequest.gas ? hexToBigInt(txRequest.gas) : undefined,
          nonce: txRequest.nonce ? hexToNumber(txRequest.nonce) : undefined,
          maxPriorityFeePerGas: txRequest.maxPriorityFeePerGas
            ? hexToBigInt(txRequest.maxPriorityFeePerGas)
            : undefined,
          maxFeePerGas: txRequest.maxFeePerGas ? hexToBigInt(txRequest.maxFeePerGas) : undefined,
        });

        console.log('AegisProvider: transaction sent', { hash });

        return hash satisfies MethodReturnTypeMap['eth_sendTransaction'] as never;
      }

      default:
        throw new UnsupportedProviderMethodError(new Error(`Unsupported method: ${args.method}`));
    }
  }

  disconnect() {
    console.log('AegisProvider: disconnect called');
    this.walletClient = undefined;
    this.storageManager.clear();
    this.emit('accountsChanged', []);
    this.emit('disconnect', new ProviderDisconnectedError(new Error('User initiated disconnecttion')));
  }

  close() {
    console.log('AegisProvider: close called');
    this.disconnect();
  }

  // helpers - TODO abstract to wallet
  private getAccount(password: string, encryptedSecret: string, salt = '') {
    const decryptedSecret = Decrypt(
      encryptedSecret,
      new TextEncoder().encode(password),
      new TextEncoder().encode(salt)
    );

    const privateKeyOrMnemonic = new TextDecoder().decode(decryptedSecret);

    try {
      return isHex(privateKeyOrMnemonic)
        ? privateKeyToAccount(privateKeyOrMnemonic)
        : mnemonicToAccount(privateKeyOrMnemonic);
    } catch {
      throw new ProviderRpcError(new Error('Failed to derive account from decrypted secret'), {
        shortMessage: 'Invalid password', // dapp uses this to show error to user
      });
    }
  }
}
