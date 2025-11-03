import { UserRejectedRequestError } from 'viem';

import { Account } from './components/Account';
import { Balance } from './components/Balance';
import { HelloWorld } from './components/HelloWorld';
import PasswordModal from './components/PasswordModal';
import { SignTx } from './components/Sign';
import { useModalStore } from './stores/useModalStore';
import { usePasswordStore } from './stores/usePasswordStore';

function App() {
  const isOpen = useModalStore(state => state.isPasswordModalOpen);
  const setIsOpen = useModalStore(state => state.setIsPasswordModalOpen);
  const resolvePassword = usePasswordStore(state => state.resolvePassword);
  const cancelPassword = usePasswordStore(state => state.cancelPassword);

  return (
    <>
      {isOpen && (
        <PasswordModal
          onConfirm={password => {
            resolvePassword(password);
            setIsOpen(false);
          }}
          onCancel={() => {
            cancelPassword(new UserRejectedRequestError(new Error('User cancelled password input')));
            setIsOpen(false);
          }}
        />
      )}
      <Account />
      <Balance />
      <SignTx />
      <HelloWorld />
    </>
  );
}

export default App;
