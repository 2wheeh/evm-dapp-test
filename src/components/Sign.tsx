import { useSignMessage } from 'wagmi';

export const SignTx = () => {
  // const { data: walletClient } = useWalletClient();
  // const [signedTx, setSignedTx] = useState<string | null>(null);
  const { signMessage, data: hash } = useSignMessage();

  return (
    <div>
      <h2>SignTx</h2>

      {/* <div>
        <button
          onClick={() => {
            walletClient?.signTransaction({}).then(signature => {
              console.log('Signed transaction:', signature);
              setSignedTx(signature);
            });
          }}
        >
          signTx (signTransaction)
        </button>

        <div>Signed Transaction: {signedTx} </div>
      </div> */}
      <div>
        <button
          onClick={() => {
            signMessage({ message: 'Hello Aegis!' });
          }}
        >
          signMessage (personal_sign)
        </button>

        <div>signMessage Signature: {hash}</div>
      </div>
    </div>
  );
};
