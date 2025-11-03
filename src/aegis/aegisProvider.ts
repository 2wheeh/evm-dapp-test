import mitt, { type Emitter } from 'mitt';
import {
  ProviderRpcError,
  type EIP1193Events,
  type EIP1193EventMap,
  WalletRpcSchema,
  createWalletClient,
  http,
  type Chain,
  type WalletClient,
  type Hex,
  hexToBigInt,
  // isHex,
} from 'viem';
// import { mnemonicToAccount, privateKeyToAccount } from 'viem/accounts';

type EventMap = {
  [K in keyof EIP1193EventMap]: Parameters<EIP1193EventMap[K]>[0];
};

interface EIP1193RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

type SupportedMethods = Extract<
  WalletRpcSchema[number]['Method'],
  'eth_requestAccounts' | 'eth_accounts' | 'eth_chainId' | 'eth_sendTransaction'
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

interface AegisProviderConfig {
  chain: Chain;
  // onPasswordRequest: () => Promise<string>;
}

export class AegisProvider implements Provider, EIP1193Events {
  private emitter: Emitter<EventMap>;
  private walletClient: WalletClient | null = null;
  private config: AegisProviderConfig;

  public on: EIP1193Events['on'];
  public removeListener: EIP1193Events['removeListener'];

  constructor(config: AegisProviderConfig) {
    this.config = config;
    this.emitter = mitt<EventMap>();
    this.on = this.emitter.on;
    this.removeListener = this.emitter.off;

    // this.initializeWallet(); // 이거 시도?
    console.log('AegisProvider: initialized', { chain: config.chain.name });
  }

  // 이걸 eth_requestAccounts 에서?
  initializeWallet(/* privateKeyOrMnemonic: string, aegisWallet: AegisWallet */) {
    // private key 를 aegis에서 가져와야함

    // const account = isHex(privateKeyOrMnemonic)
    //   ? privateKeyToAccount(privateKeyOrMnemonic)
    //   : mnemonicToAccount(privateKeyOrMnemonic);

    this.walletClient = createWalletClient({
      // account,
      chain: this.config.chain,
      transport: http(),
    });

    // this.aegisWallet = aegisWallet;

    // Emit accountsChanged event
    // this.emitter.emit('accountsChanged', [account.address]);
  }

  async request<T extends SupportedMethods>(args: RequestArguments<T>): Promise<MethodReturnTypeMap[T]> {
    console.log(`AegisProvider: request called with method ${args.method}`);

    switch (args.method) {
      case 'eth_requestAccounts':
      case 'eth_accounts': {
        // social 로그인 이후 aegis storage 로드 후 여기서 지갑 주소 가져와야함
        // 여기서말하는 account 는 viem account 가 아니라 지갑 주소
        const address = '0xFromAegisWallet'; // TODO: get from Aegis wallet
        console.log('AegisProvider: eth_requestAccounts returning', [address]);
        return [address] satisfies MethodReturnTypeMap['eth_requestAccounts'] as never;
      }

      case 'eth_chainId': {
        console.log('AegisProvider: eth_chainId called');
        // 이거 wallet client 혹은 account 에서 가져와야하는거아닌가? 스펙 확인
        // const chain = this.walletClient?.chain;
        const chainId = `0x${this.config.chain.id.toString(16)}` satisfies Hex;
        console.log('AegisProvider: eth_chainId returning', chainId);
        return chainId satisfies MethodReturnTypeMap['eth_chainId'] as never;
      }

      case 'eth_sendTransaction': {
        if (!this.walletClient) {
          throw new ProviderRpcError(new Error('Wallet not initialized'), {
            code: 4100,
            shortMessage: 'Wallet not initialized',
          });
        }

        // 이게 아니라 매번 sign 해서 얻어야함
        const account = this.walletClient.account;
        if (!account) {
          throw new ProviderRpcError(new Error('No account available'), {
            code: 4100,
            shortMessage: 'No account available in wallet',
          });
        }

        const [txRequest] = args.params as MethodParamsMap['eth_sendTransaction'];
        console.log('AegisProvider: sending transaction', txRequest);
        // viem walletClient automatically signs and broadcasts
        const hash = await this.walletClient.sendTransaction({
          to: txRequest.to,
          value: txRequest.value ? hexToBigInt(txRequest.value) : undefined,
          data: txRequest.data,
          account,
          chain: this.walletClient.chain,
        });
        console.log('AegisProvider: transaction sent', { hash });

        return hash satisfies MethodReturnTypeMap['eth_sendTransaction'] as never;
      }

      default:
        throw new ProviderRpcError(new Error(`Unsupported method: ${args.method}`), {
          code: 4200,
          shortMessage: `Method ${args.method} is not supported`,
        });
    }
  }

  disconnect() {
    console.log('AegisProvider: disconnect called');
    this.walletClient = null;
    // this.aegisWallet = null;
    this.emitter.emit('accountsChanged', []);
    this.emitter.emit(
      'disconnect',
      new ProviderRpcError(new Error('Disconnected'), {
        code: 4900,
        shortMessage: 'Disconnected',
      })
    );
  }

  close() {
    console.log('AegisProvider: close called');
    this.disconnect();
  }
}
