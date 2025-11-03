import { create } from 'zustand';

interface PasswordStoreState {
  resolver: ((value: string) => void) | null;
  rejector: ((error?: Error) => void) | null;
  requestPassword: () => Promise<string>;
  resolvePassword: (password: string) => void;
  cancelPassword: (error?: Error) => void;
}

export const usePasswordStore = create<PasswordStoreState>((set, get) => ({
  resolver: null,
  rejector: null,

  cancelPassword: error => {
    const { resolver, rejector } = get();

    if (resolver) {
      set({ resolver: null });
    }

    if (rejector) {
      rejector(error);
      set({ rejector: null });
    }
  },
  requestPassword: () => {
    return new Promise<string>((resolve, reject) => {
      set({ resolver: resolve, rejector: reject });
    });
  },

  resolvePassword: (password: string) => {
    const { resolver } = get();
    if (resolver) {
      resolver(password);
      set({ resolver: null });
    }
  },
}));
