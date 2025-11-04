import { create } from 'zustand';

interface ModalStoreState {
  isPasswordModalOpen: boolean;
  isSocialLoginModalOpen: boolean;
  isWalletSelectModalOpen: boolean;
  setIsPasswordModalOpen: (isOpen: boolean) => void;
  setIsSocialLoginModalOpen: (isOpen: boolean) => void;
  setIsWalletSelectModalOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalStoreState>(set => ({
  isPasswordModalOpen: false,
  isSocialLoginModalOpen: false,
  isWalletSelectModalOpen: false,
  setIsPasswordModalOpen: (isOpen: boolean) => {
    set({ isPasswordModalOpen: isOpen });
  },
  setIsSocialLoginModalOpen: (isOpen: boolean) => {
    set({ isSocialLoginModalOpen: isOpen });
  },
  setIsWalletSelectModalOpen: (isOpen: boolean) => {
    set({ isWalletSelectModalOpen: isOpen });
  },
}));
