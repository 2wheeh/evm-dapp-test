import { useState } from 'react';
import { aegisStorageManager } from '../aegis/aegisStorage';

interface WalletSelectMoalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function WalletSelectModal({ onConfirm, onCancel }: WalletSelectMoalProps) {
  const [selectedWallet, setSelectedWallet] = useState(aegisStorageManager.getStorage().wallets[0] ?? null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (selectedWallet) {
      aegisStorageManager.setSelectedWalletAddress(selectedWallet.address);
      onConfirm();
    }
    // if (dialogProps.onOpenChange) {
    //   dialogProps.onOpenChange(false);
    // }
  };

  // Workaround for preventing the dialog from closing not due to cancel button
  // TODO: Remove this once we have a better solution
  // const handleOpenChange = (open: boolean) => {
  //   if (open === false) {
  //     return;
  //   }
  // if (dialogProps.onOpenChange) {
  //   dialogProps.onOpenChange(open);
  // }
  // };

  return (
    <>
      <div>
        <h2>Select a Wallet</h2>
      </div>

      <div>
        selected: {selectedWallet.name}: {selectedWallet.address}
      </div>
      <form onSubmit={handleSubmit}>
        {aegisStorageManager.getStorage().wallets.map(w => (
          <button key={w.address} type='button' onClick={() => setSelectedWallet(w)}>
            {w.name}: {w.address}
          </button>
        ))}
        <div>
          <button disabled={!selectedWallet} type='submit'>
            Done
          </button>
          <button onClick={() => onCancel()}>Cancel</button>
        </div>
      </form>
    </>
  );
}
