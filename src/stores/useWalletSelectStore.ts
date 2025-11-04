import { create } from 'zustand';

interface WalletSelectState {
  resolver: (() => void) | null;
  rejector: ((error?: Error) => void) | null;
  requestSelect: () => Promise<void>;
  resolveSelect: () => void;
  cancelSelect: (error?: Error) => void;
}

export const useWalletSelectStore = create<WalletSelectState>((set, get) => ({
  resolver: null,
  rejector: null,

  cancelSelect: error => {
    const { resolver, rejector } = get();

    if (resolver) {
      set({ resolver: null });
    }

    if (rejector) {
      rejector(error);
      set({ rejector: null });
    }
  },
  requestSelect: () => {
    return new Promise<void>((resolve, reject) => {
      set({ resolver: resolve, rejector: reject });
    });
  },

  resolveSelect: () => {
    const { resolver } = get();
    if (resolver) {
      resolver();
      set({ resolver: null });
    }
  },
}));
