import { createConfig, http } from 'wagmi';
import { storyAeneid } from 'wagmi/chains';
import { baseAccount, injected } from 'wagmi/connectors';
import { aegis } from './aegis/aegisConnector';
import { TEST_ENCRYPTED_SECRET, TEST_PASSWROD, TEST_PUBLIC_KEY, TEST_UUID, TEST_WALLET_ADDRESS, wait } from './utils';
import { aegisStorageManager } from './aegis/aegisStorage';
// import { UserRejectedRequestError } from 'viem';

export const config = createConfig({
  chains: [storyAeneid],
  connectors: [
    injected(),
    baseAccount(),
    // walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
    aegis({
      providerConfig: {
        onPasswordRequest: async () => {
          return TEST_PASSWROD;
        },
        selectConnection: async () => {
          console.log('AegisProvider: selectConnection called - open UI social login modal here');
          // throw new UserRejectedRequestError(new Error('User rejected connection')); // 에러 제대로 받는지 확인 - y

          // load from citadel
          aegisStorageManager.setCurrentUUID(TEST_UUID);
          aegisStorageManager.setStorage({
            wallets: [
              {
                address: TEST_WALLET_ADDRESS,
                name: 'Test Wallet',
                encryptedSecret: TEST_ENCRYPTED_SECRET,
                publicKey: TEST_PUBLIC_KEY,
                version: 'V1',
              },
            ],
          });

          // user select a wallet
          aegisStorageManager.setSelectedWalletAddress(TEST_WALLET_ADDRESS);
          await wait(2_000); // check status is pending for seconds - y
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
