import {
  useReadIpTokenStakingDefaultMinFee,
  useReadLstToken,
  useReadLstTokenBalanceOf,
  useReadLstTokenOwner,
  useWriteLstTokenApprove,
  useWriteKolStakingPoolVote,
} from './generated';

export const Test = () => {
  // const { data } = useReadLstTokenBalanceOf({
  //   args: ['0x123'],
  // });

  const { data } = useReadIpTokenStakingDefaultMinFee({
    args: [],
  });

  const { writeContract: vote } = useWriteKolStakingPoolVote();

  vote({
    address: '0x123',
    args: [123n],
  });
};
