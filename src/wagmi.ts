import { createConfig, http } from 'wagmi';
import { storyAeneid } from 'wagmi/chains';
import { baseAccount, injected } from 'wagmi/connectors';
import { aegis } from './aegis/aegisConnector';
import { useModalStore } from './stores/useModalStore';
import { usePasswordStore } from './stores/usePasswordStore';
import { useSocialLoginStore } from './stores/useSocialLoginStore';

export const config = createConfig({
  chains: [storyAeneid],
  connectors: [
    injected(),
    baseAccount(),
    // walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
    aegis({
      providerConfig: {
        // TODO: move these to inside provider
        onPasswordRequest: async () => {
          const { setIsPasswordModalOpen } = useModalStore.getState();
          setIsPasswordModalOpen(true);
          const { requestPassword } = usePasswordStore.getState();
          return requestPassword();
        },
        selectConnection: async () => {
          const { setIsSocialLoginModalOpen } = useModalStore.getState();
          setIsSocialLoginModalOpen(true);
          const { requestLogin } = useSocialLoginStore.getState();
          await requestLogin();
        },
      },
    }),
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
