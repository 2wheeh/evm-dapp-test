import { useAccount, useSignMessage, useVerifyMessage } from 'wagmi';

export const SignTx = () => {
  // const { data: walletClient } = useWalletClient();
  // const [signedTx, setSignedTx] = useState<string | null>(null);
  const message = 'Hello Aegis!';

  const { signMessage, data: signature, error: signError } = useSignMessage();
  const { address } = useAccount();
  const { data: verified, error: verifyError } = useVerifyMessage({
    address,
    message,
    signature,
  });

  return (
    <div>
      <h2>Sign Message</h2>

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
        <button onClick={() => signMessage({ message })}>signMessage (personal_sign)</button>
        <div>signMessage Signature: {signature}</div>
        <div>Verified: {verified !== undefined ? (verified ? 'true' : 'false') : 'pending'}</div>
        {signError && <div>signError: {signError.message}</div>}
        {verifyError && <div>verifyError: {verifyError.message}</div>}
      </div>
    </div>
  );
};
