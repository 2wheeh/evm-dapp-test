import { Account } from './components/Account';
import { Balance } from './components/Balance';
import { HelloWorld } from './components/HelloWorld';
import { SignTx } from './components/Sign';

function App() {
  return (
    <>
      <Account />
      <Balance />
      <SignTx />
      <HelloWorld />
    </>
  );
}

export default App;
