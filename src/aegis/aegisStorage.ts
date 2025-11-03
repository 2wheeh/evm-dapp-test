import { Aegis, Citadel } from '@delight-labs/aegis-js';

interface AegisWallet {
  address: string;
  name: string;
  publicKey: string;
  encryptedSecret: string;
  version: string;
}

interface AegisStorage {
  wallets: AegisWallet[];
}

const AEGIS_PREFIX = 'aegis_evm_';

const AEGIS_STORAGE_KEY = `${AEGIS_PREFIX}storage`;
const AEGIS_SELECTED_WALLET_ADDRESS_KEY = `${AEGIS_PREFIX}selected_wallet_address`;
const AEGIS_CURRENT_UUID_KEY = `${AEGIS_PREFIX}uuid`;

function getStorage(uuid = getCurrentUUID()): AegisStorage {
  const storage = localStorage.getItem(`${AEGIS_STORAGE_KEY}_${uuid}`);
  if (!storage) {
    return { wallets: [] };
  }

  return JSON.parse(storage);
}

function setStorage(storage: AegisStorage, uuid = getCurrentUUID()) {
  localStorage.setItem(`${AEGIS_STORAGE_KEY}_${uuid}`, JSON.stringify(storage));
}

function getSelectedWalletAddress(uuid = getCurrentUUID()): string {
  return localStorage.getItem(`${AEGIS_SELECTED_WALLET_ADDRESS_KEY}_${uuid}`) || '';
}

function setSelectedWalletAddress(address: string, uuid = getCurrentUUID()) {
  localStorage.setItem(`${AEGIS_SELECTED_WALLET_ADDRESS_KEY}_${uuid}`, address);
}

function getCurrentUUID(): string {
  return localStorage.getItem(AEGIS_CURRENT_UUID_KEY) || '';
}

function setCurrentUUID(uuid: string) {
  localStorage.setItem(AEGIS_CURRENT_UUID_KEY, uuid);
}

async function getSharesFromCitadel({
  fortUrls,
  accessToken,
  uuid: _uuid,
}: {
  fortUrls: (URL | string)[];
  accessToken: string;
  uuid: string;
}) {
  const citadel = new Citadel(
    accessToken,
    fortUrls.map(url => new URL(url))
  );
  const uuid = new Uint8Array(Buffer.from(_uuid));
  const res = await citadel.retrieve(uuid);

  return res;
}

function loadAegisStorageFromShares(shares: string[], uuid: string) {
  const combined = Aegis.combineShares(shares);
  const aegisStorage = JSON.parse(Buffer.from(combined).toString()) as AegisStorage;

  //! Temporary fix for wrong key name 🤔
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aegisStorageAny = aegisStorage as any;
  if (aegisStorageAny.wallet) {
    aegisStorage.wallets = aegisStorageAny.wallet;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (aegisStorage as any).wallet;
  }

  setCurrentUUID(uuid);
  setStorage(aegisStorage);

  return aegisStorage;
}

async function loadAegisStorageFromCitadel({
  fortUrls,
  accessToken,
  uuid,
}: {
  fortUrls: (URL | string)[];
  accessToken: string;
  uuid: string;
}) {
  const shares = await getSharesFromCitadel({
    fortUrls,
    accessToken,
    uuid,
  });

  return loadAegisStorageFromShares(shares, uuid);
}

function clear() {
  Object.keys(localStorage)
    .filter(key => key.startsWith(AEGIS_PREFIX))
    .forEach(key => localStorage.removeItem(key));
}

export const aegisStorageManager = {
  clear,
  getStorage,
  setStorage,
  getSelectedWalletAddress,
  setSelectedWalletAddress,
  getCurrentUUID,
  setCurrentUUID,
  getSharesFromCitadel,
  loadFromShares: loadAegisStorageFromShares,
  loadFromCitadel: loadAegisStorageFromCitadel,
};
