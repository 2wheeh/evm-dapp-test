import { useEffect, useMemo, useState } from 'react';

import { AegisProvider } from '../aegis/aegisProvider';
import { AegisUIPlugin } from '../aegis/AegisUIPlugin';
import { PasswordModal } from './PasswordModal';
import { SocialLoginModal } from './SocialLoginModal';
import { WalletSelectModal } from './WalletSelectModal';

export const AegisWallet = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSocialLoginModalOpen, setIsSocialLoginModalOpen] = useState(false);
  const [isWalletSelectModalOpen, setIsWalletSelectModalOpen] = useState(false);

  const uiPlugin = useMemo(() => new AegisUIPlugin(), []);

  useEffect(() => {
    AegisProvider.registerUIPlugin(uiPlugin);

    uiPlugin.registerModalCallbacks({
      openPasswordModal: () => setIsPasswordModalOpen(true),
      closePasswordModal: () => setIsPasswordModalOpen(false),
      openSocialLoginModal: () => setIsSocialLoginModalOpen(true),
      closeSocialLoginModal: () => setIsSocialLoginModalOpen(false),
      openWalletSelectModal: () => setIsWalletSelectModalOpen(true),
      closeWalletSelectModal: () => setIsWalletSelectModalOpen(false),
    });

    return () => {
      AegisProvider.registerUIPlugin(null);
    };
  }, [uiPlugin]);

  return (
    <div>
      {isPasswordModalOpen && (
        <PasswordModal
          onConfirm={password => uiPlugin.resolvePassword(password)}
          onCancel={() => uiPlugin.cancelPassword()}
        />
      )}

      {isSocialLoginModalOpen && (
        <SocialLoginModal
          onConfirm={() => uiPlugin.resolveSocialLogin()}
          onCancel={() => uiPlugin.cancelSocialLogin()}
        />
      )}

      {isWalletSelectModalOpen && (
        <WalletSelectModal
          onConfirm={() => uiPlugin.resolveWalletSelect()}
          onCancel={() => uiPlugin.cancelWalletSelect()}
        />
      )}
    </div>
  );
};
