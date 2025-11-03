import { useBalance, useEstimateFeesPerGas, useEstimateGas, useWaitForTransactionReceipt, type BaseError } from 'wagmi';
import { useReadHelloWorldHelloWorld, useSimulateHelloWorldSetText, useWriteHelloWorldSetText } from '../generated';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { encodeFunctionData, formatEther } from 'viem';

export const HelloWorld = () => {
  const [text, setText] = useState('');
  const { data: simulatedTx, error } = useSimulateHelloWorldSetText({
    args: [text],
    query: { enabled: Boolean(text) },
  });

  // TODO: abstract this
  const { data: estimatedGas } = useEstimateGas({
    ...simulatedTx?.request,
    account: simulatedTx?.request.account?.address,
    to: simulatedTx?.request.address,
    data: simulatedTx
      ? encodeFunctionData({
          abi: simulatedTx.request.abi,
          functionName: simulatedTx.request.functionName,
          args: simulatedTx.request.args,
        })
      : undefined,
    query: { enabled: Boolean(simulatedTx) },
  });

  const { data: feeData } = useEstimateFeesPerGas();

  const { writeContract, data: hash } = useWriteHelloWorldSetText();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const { data: valueFromContract, queryKey: readHelloWorldKey } = useReadHelloWorldHelloWorld();
  const { queryKey: balanceKey } = useBalance();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isConfirmed) {
      queryClient.invalidateQueries({ queryKey: readHelloWorldKey });
      queryClient.invalidateQueries({ queryKey: balanceKey });
    }
  }, [isConfirmed, queryClient, readHelloWorldKey, balanceKey]);

  const estimatedFee = estimatedGas && feeData ? estimatedGas * (feeData.gasPrice ?? feeData.maxFeePerGas ?? 0n) : null;

  return (
    <div>
      <h2>Hello World</h2>
      <div>
        sendTransaction to{' '}
        <a href='https://aeneid.storyscan.io/address/0x07a2449a9140053A7CD8a9D704701B98D405bb1C' target='_blank'>
          HelloWorld
        </a>
      </div>
      <div>
        <button
          onClick={() => writeContract({ ...simulatedTx!.request, gas: estimatedGas })}
          disabled={!Boolean(simulatedTx?.request) || !Boolean(estimatedGas)}
        >
          Set Text to
        </button>
        <input
          type='text'
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
        />
        <div>{text ? (estimatedFee ? `Est. Fee: ${formatEther(estimatedFee)}` : 'Estimating...') : 'Enter text'}</div>{' '}
        {error && <div>Error: {(error as BaseError).shortMessage || error.message}</div>}
      </div>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      <div>Value from contract: {valueFromContract}</div>
    </div>
  );
};
