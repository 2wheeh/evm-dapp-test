import { useAccount, useBalance, useBlockNumber } from 'wagmi';
import { formatEther } from 'viem';
// import { useQueryClient } from '@tanstack/react-query';
// import { useEffect } from 'react';

export const Balance = () => {
  const { address } = useAccount();
  // const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: balance, queryKey } = useBalance({
    address,
  });

  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   if (blockNumber && blockNumber % 5n === 0n) {
  //     queryClient.invalidateQueries({ queryKey });
  //   }
  // }, [blockNumber, queryClient, queryKey]);

  return (
    <div>
      <h2>Balance</h2>
      <div>Balance: {balance ? formatEther(balance.value) + balance.symbol : 'Loading...'}</div>
    </div>
  );
};
