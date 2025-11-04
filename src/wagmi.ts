import { createConfig, http } from 'wagmi';
import { storyAeneid } from 'wagmi/chains';
import { baseAccount, injected } from 'wagmi/connectors';
import { aegis } from './aegis/aegisConnector';

export const config = createConfig({
  chains: [storyAeneid],
  connectors: [
    injected(),
    baseAccount(),
    // walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
    aegis(),
  ],
  transports: {
    [storyAeneid.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
