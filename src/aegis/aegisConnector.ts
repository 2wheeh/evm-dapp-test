import { type Connector, createConnector } from 'wagmi';
import { AegisProvider } from './aegisProvider';
import { getAddress } from 'viem';

const AEGIS_WALLET_ID = 'aegis';
const AEGIS_WALLET_NAME = 'AEGIS WALLET';
const AEGIS_TYPE = 'aegis';

// life cycle: setup => getProvider => connect
const aegisConnector = () => {
  let provider: AegisProvider | null = null;

  let accountsChanged: Connector['onAccountsChanged'] | undefined;
  let chainChanged: Connector['onChainChanged'] | undefined;
  let disconnect: Connector['onDisconnect'] | undefined;

  return createConnector<AegisProvider>(config => ({
    id: AEGIS_WALLET_ID,
    name: AEGIS_WALLET_NAME,
    type: AEGIS_TYPE,
    // icon:
    async setup() {
      // check ui state
      console.log('AEGIS connector: setup called');
    },
    async getProvider({ chainId } = {}) {
      console.log('AEGIS connector: getProvider called', { chainId });
      if (!provider) {
        // Find chain by chainId if provided, otherwise use first chain
        const chain = chainId ? config.chains.find(c => c.id === chainId) || config.chains[0] : config.chains[0];

        provider = new AegisProvider({
          chain,
        });
      }

      return provider;
    },
    async connect({ chainId, withCapabilities } = {}) {
      console.log('AEGIS connector: connect called', { chainId, withCapabilities });
      const provider = await this.getProvider();

      if (!accountsChanged) {
        accountsChanged = this.onAccountsChanged.bind(this);
        provider.on('accountsChanged', accountsChanged);
      }
      if (!chainChanged) {
        chainChanged = this.onChainChanged.bind(this);
        provider.on('chainChanged', chainChanged);
      }
      if (!disconnect) {
        disconnect = this.onDisconnect.bind(this);
        provider.on('disconnect', disconnect);
      }

      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      console.log('AEGIS connector: accounts received', accounts);

      const currentChainId = await this.getChainId();
      if (chainId && currentChainId !== chainId) {
        throw new Error(`Connected to wrong chain. Expected ${chainId}, got ${currentChainId}`);
        //  const chain = await this.switchChain!({ chainId }).catch((error) => {
        //     if (error.code === UserRejectedRequestError.code) throw error
        //     return { id: currentChainId }
        //   })
        //   currentChainId = chain?.id ?? currentChainId
      }

      return {
        accounts: (withCapabilities ? accounts.map(address => ({ address, capabilities: {} })) : accounts) as never,
        chainId: currentChainId,
      };
    },
    async disconnect() {
      console.log('AEGIS connector: disconnect called');
      const provider = await this.getProvider();
      provider.disconnect();
      provider.close();
    },
    async getAccounts() {
      console.log('AEGIS connector: getAccounts called');
      const provider = await this.getProvider();
      const accounts = await provider.request({ method: 'eth_accounts' });
      return accounts;
    },
    async getChainId() {
      console.log('AEGIS connector: getChainId called');
      const provider = await this.getProvider();
      const chainId = await provider.request({ method: 'eth_chainId' });
      return Number(chainId);
    },
    async isAuthorized() {
      try {
        const accounts = await this.getAccounts();
        return accounts.length > 0;
      } catch (error) {
        return false;
      }
    },
    onAccountsChanged(accounts) {
      console.log('AEGIS connector: accounts changed', accounts);
      if (accounts.length === 0) {
        this.onDisconnect();
      } else {
        config.emitter.emit('change', { accounts: accounts.map(getAddress) });
      }
    },
    onChainChanged(chain) {
      console.log('AEGIS connector: chain changed', chain);
      const chainId = Number(chain);
      config.emitter.emit('change', { chainId });
    },
    async onDisconnect(error) {
      console.log('AEGIS connector: disconnected', error);
      config.emitter.emit('disconnect');

      const provider = await this.getProvider();
      if (accountsChanged) {
        provider.removeListener('accountsChanged', accountsChanged);
        accountsChanged = undefined;
      }
      if (chainChanged) {
        provider.removeListener('chainChanged', chainChanged);
        chainChanged = undefined;
      }
      if (disconnect) {
        provider.removeListener('disconnect', disconnect);
        disconnect = undefined;
      }
    },
    async onConnect(connectInfo) {
      console.log('AEGIS connector: connected', connectInfo);
    },
    // onMessage
    // async switchChain
    // async getChain
  }));
};

export const aegis = aegisConnector;
