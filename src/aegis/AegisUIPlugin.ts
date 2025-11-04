import { UserRejectedRequestError } from 'viem';

interface ModalCallbacks {
  openPasswordModal: () => void;
  closePasswordModal: () => void;
  openSocialLoginModal: () => void;
  closeSocialLoginModal: () => void;
  openWalletSelectModal: () => void;
  closeWalletSelectModal: () => void;
}

export class AegisUIPlugin {
  private passwordResolver: ((value: string) => void) | null = null;
  private passwordRejector: ((error: Error) => void) | null = null;

  private socialLoginResolver: (() => void) | null = null;
  private socialLoginRejector: ((error: Error) => void) | null = null;

  private walletSelectResolver: (() => void) | null = null;
  private walletSelectRejector: ((error: Error) => void) | null = null;

  private modalCallbacks: ModalCallbacks | null = null;

  registerModalCallbacks(callbacks: ModalCallbacks) {
    this.modalCallbacks = callbacks;
  }

  // Password request flow
  requestPassword(): Promise<string> {
    if (!this.modalCallbacks) {
      throw new Error('AegisWallet component not mounted. Please add <AegisWallet /> to your app.');
    }

    this.modalCallbacks.openPasswordModal();

    return new Promise<string>((resolve, reject) => {
      this.passwordResolver = resolve;
      this.passwordRejector = reject;
    });
  }

  resolvePassword(password: string) {
    if (this.passwordResolver) {
      this.passwordResolver(password);
      this.passwordResolver = null;
      this.passwordRejector = null;
    }
    this.modalCallbacks?.closePasswordModal();
  }

  cancelPassword(error?: Error) {
    if (this.passwordRejector) {
      this.passwordRejector(error || new UserRejectedRequestError(new Error('User cancelled password input')));
      this.passwordResolver = null;
      this.passwordRejector = null;
    }
    this.modalCallbacks?.closePasswordModal();
  }

  // Social login request flow
  requestSocialLogin(): Promise<void> {
    if (!this.modalCallbacks) {
      throw new Error('AegisWallet component not mounted. Please add <AegisWallet /> to your app.');
    }

    this.modalCallbacks.openSocialLoginModal();

    return new Promise<void>((resolve, reject) => {
      this.socialLoginResolver = resolve;
      this.socialLoginRejector = reject;
    });
  }

  resolveSocialLogin() {
    if (this.socialLoginResolver) {
      this.socialLoginResolver();
      this.socialLoginResolver = null;
      this.socialLoginRejector = null;
    }
    this.modalCallbacks?.closeSocialLoginModal();
  }

  cancelSocialLogin(error?: Error) {
    if (this.socialLoginRejector) {
      this.socialLoginRejector(error || new UserRejectedRequestError(new Error('User cancelled social login')));
      this.socialLoginResolver = null;
      this.socialLoginRejector = null;
    }
    this.modalCallbacks?.closeSocialLoginModal();
  }

  // Wallet select request flow
  requestWalletSelect(): Promise<void> {
    if (!this.modalCallbacks) {
      throw new Error('AegisWallet component not mounted. Please add <AegisWallet /> to your app.');
    }

    this.modalCallbacks.openWalletSelectModal();

    return new Promise<void>((resolve, reject) => {
      this.walletSelectResolver = resolve;
      this.walletSelectRejector = reject;
    });
  }

  resolveWalletSelect() {
    if (this.walletSelectResolver) {
      this.walletSelectResolver();
      this.walletSelectResolver = null;
      this.walletSelectRejector = null;
    }
    this.modalCallbacks?.closeWalletSelectModal();
  }

  cancelWalletSelect(error?: Error) {
    if (this.walletSelectRejector) {
      this.walletSelectRejector(error || new UserRejectedRequestError(new Error('User cancelled wallet selection')));
      this.walletSelectResolver = null;
      this.walletSelectRejector = null;
    }
    this.modalCallbacks?.closeWalletSelectModal();
  }

  async requestConnection(): Promise<void> {
    await this.requestSocialLogin();
    await this.requestWalletSelect();
  }
}
