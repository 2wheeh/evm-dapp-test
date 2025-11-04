import { UserRejectedRequestError } from 'viem';

import { useModalStore } from '../stores/useModalStore';
import { usePasswordStore } from '../stores/usePasswordStore';
import { PasswordModal } from './PasswordModal';
import { SocialLoginModal } from './SocialLoginModal';
import { useSocialLoginStore } from '../stores/useSocialLoginStore';

export const AegisWallet = () => {
  const isPasswordModalOpen = useModalStore(state => state.isPasswordModalOpen);
  const setIsPasswordModalOpen = useModalStore(state => state.setIsPasswordModalOpen);
  const resolvePassword = usePasswordStore(state => state.resolvePassword);
  const cancelPassword = usePasswordStore(state => state.cancelPassword);

  const isSocialLoginModalOpen = useModalStore(state => state.isSocialLoginModalOpen);
  const setIsSocialLoginModalOpen = useModalStore(state => state.setIsSocialLoginModalOpen);
  const resolveLogin = useSocialLoginStore(state => state.resolveLogin);
  const cancelLogin = useSocialLoginStore(state => state.cancelLogin);

  return (
    <div>
      {isPasswordModalOpen && (
        <PasswordModal
          onConfirm={password => {
            resolvePassword(password);
            setIsPasswordModalOpen(false);
          }}
          onCancel={() => {
            cancelPassword(new UserRejectedRequestError(new Error('User cancelled password input')));
            setIsPasswordModalOpen(false);
          }}
        />
      )}

      {isSocialLoginModalOpen && (
        <SocialLoginModal
          onConfirm={() => {
            setIsSocialLoginModalOpen(false);
            resolveLogin();
          }}
          onCancel={() => {
            cancelLogin(new UserRejectedRequestError(new Error('User cancelled social login')));
            setIsSocialLoginModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
