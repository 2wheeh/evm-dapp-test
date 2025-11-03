export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const TEST_PASSWROD = import.meta.env.VITE_TEST_PASSWROD;
export const TEST_WALLET_ADDRESS = import.meta.env.VITE_TEST_WALLET_ADDRESS;
export const TEST_MNEMONIC = import.meta.env.VITE_TEST_MNEMONIC;
export const TEST_PRIVATE_KEY = import.meta.env.VITE_TEST_PRIVATE_KEY;
export const TEST_PUBLIC_KEY = import.meta.env.VITE_TEST_PUBLIC_KEY;
export const TEST_ENCRYPTED_SECRET = import.meta.env.VITE_TEST_ENCRYPTED_SECRET;
export const TEST_UUID = import.meta.env.VITE_TEST_UUID;
