import { create } from 'zustand';

interface ModalStoreState {
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalStoreState>(set => ({
  isPasswordModalOpen: false,
  setIsPasswordModalOpen: (isOpen: boolean) => {
    console.log('Modal Store: setIsPasswordModalOpen called with', isOpen);
    set({ isPasswordModalOpen: isOpen });
  },
}));
