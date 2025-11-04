import { create } from 'zustand';

interface SocialLoginState {
  resolver: (() => void) | null;
  rejector: ((error?: Error) => void) | null;
  requestLogin: () => Promise<void>;
  resolveLogin: () => void;
  cancelLogin: (error?: Error) => void;
}

export const useSocialLoginStore = create<SocialLoginState>((set, get) => ({
  resolver: null,
  rejector: null,

  cancelLogin: error => {
    const { resolver, rejector } = get();

    if (resolver) {
      set({ resolver: null });
    }

    if (rejector) {
      rejector(error);
      set({ rejector: null });
    }
  },
  requestLogin: () => {
    return new Promise<void>((resolve, reject) => {
      set({ resolver: resolve, rejector: reject });
    });
  },

  resolveLogin: () => {
    const { resolver } = get();
    if (resolver) {
      resolver();
      set({ resolver: null });
    }
  },
}));
