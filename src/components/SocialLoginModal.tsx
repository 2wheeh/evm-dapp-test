import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { aegisStorageManager } from '../aegis/aegisStorage';
import {
  TEST_ENCRYPTED_SECRET,
  TEST_ENCRYPTED_SECRET_2,
  TEST_PUBLIC_KEY,
  TEST_PUBLIC_KEY_2,
  TEST_UUID,
  TEST_WALLET_ADDRESS,
  TEST_WALLET_ADDRESS_2,
} from '../utils';

interface SocialLoginModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const useSocialLogin = () => {
  const { data, mutate: socialLogin } = useMutation({
    mutationKey: ['socialLogin'],
    mutationFn: async (provider: 'Google' | 'Apple') => {
      // Implement social login logic here
      console.log(`Logging in with ${provider}...`);
      return {
        credential: 'credential',
        provider,
      };
    },
  });

  return { socialLogin, data };
};

const useLoadSharesFromCitadel = () => {
  const { data, mutate: loadShares } = useMutation({
    mutationKey: ['loadSharesFromCitadel'],
    mutationFn: async (_: { provider: 'Google' | 'Apple'; credential: string }) => {
      // Implement load shares from Citadel logic here
      // const { data } = await xgApi.user.loginCreate({
      //   sso_token: credential,
      //   sso_provider: provider,
      // });

      // const accessToken = data.response?.access_token ?? '';
      // const refreshToken = data.response?.refresh_token ?? '';
      // xgApi.setAccessToken(accessToken);
      // xgApi.setRefreshToken(refreshToken);
      // const uuid = xgApi.getUUID();
      // if (!uuid) {
      //   throw new Error('Invalid JWT token');
      // }

      // const citadelUrlsListRes = await xgApi.citadelUrls.citadelUrlsList();

      // xgApi.setAccessToken('');
      // xgApi.setRefreshToken('');

      // const fortUrls = citadelUrlsListRes.data.response ?? [];

      // const shares = await aegisStorage.getSharesFromCitadel({
      //   fortUrls,
      //   uuid,
      //   accessToken,
      // });

      // aegisStorage.loadFromShares(message.data.shares, message.data.uuid);

      // load from citadel
      // Encrypt(

      // )

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
          {
            address: TEST_WALLET_ADDRESS_2,
            name: 'Test Wallet 2',
            encryptedSecret: TEST_ENCRYPTED_SECRET_2,
            publicKey: TEST_PUBLIC_KEY_2,
            version: 'V1',
          },
        ],
      });

      return true;
    },
  });

  return {
    isLoaded: data,
    loadShares,
  };
};

export function SocialLoginModal({ onConfirm, onCancel }: SocialLoginModalProps) {
  // Workaround for preventing the dialog from closing not due to cancel button
  // TODO: Remove this once we have a better solution
  // const handleOpenChange = (open: boolean) => {
  //   if (open === false) {
  //     return;
  //   }
  // if (dialogProps.onOpenChange) {
  //   dialogProps.onOpenChange(open);
  // }
  // };

  const { socialLogin, data } = useSocialLogin();
  const { isLoaded, loadShares } = useLoadSharesFromCitadel();

  useEffect(() => {
    if (data) {
      loadShares(data);
    }
  }, [data, loadShares]);

  useEffect(() => {
    if (isLoaded) {
      onConfirm();
    }
  }, [isLoaded, onConfirm]);

  return (
    <>
      <div>
        <div>Continue with SNS</div>
        <button onClick={() => socialLogin('Google')}>Google</button>
        <button onClick={() => socialLogin('Apple')}>Apple</button>
        <button onClick={() => onCancel()}>Cancel</button>
      </div>
    </>
  );
}
