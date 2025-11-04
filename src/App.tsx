import { Account } from './components/Account';
import { Balance } from './components/Balance';
import { HelloWorld } from './components/HelloWorld';
import { SignTx } from './components/Sign';
import { AegisWallet } from './components/AegisWallet';

function App() {
  return (
    <>
      <AegisWallet />
      <Account />
      <Balance />
      <SignTx />
      <HelloWorld />
    </>
  );
}

export default App;
