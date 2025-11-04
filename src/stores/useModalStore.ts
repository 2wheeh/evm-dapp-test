import { create } from 'zustand';

interface ModalStoreState {
  isPasswordModalOpen: boolean;
  isSocialLoginModalOpen: boolean;
  setIsPasswordModalOpen: (isOpen: boolean) => void;
  setIsSocialLoginModalOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalStoreState>(set => ({
  isPasswordModalOpen: false,
  isSocialLoginModalOpen: false,
  setIsPasswordModalOpen: (isOpen: boolean) => {
    set({ isPasswordModalOpen: isOpen });
  },
  setIsSocialLoginModalOpen: (isOpen: boolean) => {
    set({ isSocialLoginModalOpen: isOpen });
  },
}));
