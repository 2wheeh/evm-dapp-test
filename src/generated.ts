import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ipTokenStaking
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ipTokenStakingAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'defaultMinFee', internalType: 'uint256', type: 'uint256' },
      { name: 'maxDataLength', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'validatorCmpPubkey',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'moniker',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'stakeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'commissionRate',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'maxCommissionRate',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'maxCommissionChangeRate',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'supportsUnlocked',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'operatorAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'CreateValidator',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'validatorCmpPubkey',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'stakeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'stakingPeriod',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'delegationId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'operatorAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newFee',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FeeSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'minCommissionRate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MinCommissionRateChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'minStakeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MinStakeAmountSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'minUnstakeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MinUnstakeAmountSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'validatorSrcCmpPubkey',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'validatorDstCmpPubkey',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'delegationId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'operatorAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Redelegate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetOperator',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'executionAddress',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'SetRewardAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'executionAddress',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'SetWithdrawalAddress',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'unjailer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'validatorCmpPubkey',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Unjail',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'UnsetOperator',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'validatorCmpPubkey',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'commissionRate',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
    ],
    name: 'UpdateValidatorCommission',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'validatorCmpPubkey',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
      {
        name: 'stakeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'delegationId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'operatorAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Withdraw',
  },
  {
    type: 'function',
    inputs: [],
    name: 'AA',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BB',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_MIN_FEE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_DATA_LENGTH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_MONIKER_LENGTH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PP',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'STAKE_ROUNDING',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validatorCmpPubkey', internalType: 'bytes', type: 'bytes' },
      { name: 'moniker', internalType: 'string', type: 'string' },
      { name: 'commissionRate', internalType: 'uint32', type: 'uint32' },
      { name: 'maxCommissionRate', internalType: 'uint32', type: 'uint32' },
      {
        name: 'maxCommissionChangeRate',
        internalType: 'uint32',
        type: 'uint32',
      },
      { name: 'supportsUnlocked', internalType: 'bool', type: 'bool' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'createValidator',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'args',
        internalType: 'struct IIPTokenStaking.InitializerArgs',
        type: 'tuple',
        components: [
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'minStakeAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minUnstakeAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'minCommissionRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'fee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minCommissionRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minStakeAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minUnstakeAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validatorSrcCmpPubkey', internalType: 'bytes', type: 'bytes' },
      { name: 'validatorDstCmpPubkey', internalType: 'bytes', type: 'bytes' },
      { name: 'delegationId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'redelegate',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'delegator', internalType: 'address', type: 'address' },
      { name: 'validatorSrcCmpPubkey', internalType: 'bytes', type: 'bytes' },
      { name: 'validatorDstCmpPubkey', internalType: 'bytes', type: 'bytes' },
      { name: 'delegationId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'redelegateOnBehalf',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'rawAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'roundedStakeAmount',
    outputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'remainder', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'newFee', internalType: 'uint256', type: 'uint256' }],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newValue', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinCommissionRate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newMinStakeAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setMinStakeAmount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newMinUnstakeAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setMinUnstakeAmount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'setOperator',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newRewardsAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setRewardsAddress',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newWithdrawalAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setWithdrawalAddress',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validatorCmpPubkey', internalType: 'bytes', type: 'bytes' },
      {
        name: 'stakingPeriod',
        internalType: 'enum IIPTokenStaking.StakingPeriod',
        type: 'uint8',
      },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'stake',
    outputs: [
      { name: 'delegationId', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'delegator', internalType: 'address', type: 'address' },
      { name: 'validatorCmpPubkey', internalType: 'bytes', type: 'bytes' },
      {
        name: 'stakingPeriod',
        internalType: 'enum IIPTokenStaking.StakingPeriod',
        type: 'uint8',
      },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'stakeOnBehalf',
    outputs: [
      { name: 'delegationId', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validatorCmpPubkey', internalType: 'bytes', type: 'bytes' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'unjail',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validatorCmpPubkey', internalType: 'bytes', type: 'bytes' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'unjailOnBehalf',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unsetOperator',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validatorCmpPubkey', internalType: 'bytes', type: 'bytes' },
      { name: 'delegationId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'unstake',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'delegator', internalType: 'address', type: 'address' },
      { name: 'validatorCmpPubkey', internalType: 'bytes', type: 'bytes' },
      { name: 'delegationId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'unstakeOnBehalf',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'validatorCmpPubkey', internalType: 'bytes', type: 'bytes' },
      { name: 'commissionRate', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'updateValidatorCommission',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

export const ipTokenStakingAddress =
  '0xCCcCcC0000000000000000000000000000000001' as const

export const ipTokenStakingConfig = {
  address: ipTokenStakingAddress,
  abi: ipTokenStakingAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// kolStakingPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const kolStakingPoolAbi = [
  { type: 'error', inputs: [], name: 'AmountShouldBeBiggerThanZero' },
  {
    type: 'error',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'userVoted', internalType: 'uint256', type: 'uint256' },
      { name: 'inputAmt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'BiggerThanVoted',
  },
  {
    type: 'error',
    inputs: [{ name: 'message', internalType: 'bytes', type: 'bytes' }],
    name: 'ClaimError',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotCallFromLstToken' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'NotSupportedCall' },
  { type: 'error', inputs: [], name: 'OnlyCalledByManager' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'message', internalType: 'bytes', type: 'bytes' }],
    name: 'TransferError',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardReceived',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Unvoted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Voted',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DENOMINATOR',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'allSnsInfos',
    outputs: [
      {
        name: 'ret',
        internalType: 'struct SnsInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'snsType', internalType: 'enum SnsType', type: 'uint8' },
          { name: 'snsUrl', internalType: 'string', type: 'string' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimKolReward',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimableKolReward',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'description',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'iconUrl',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'info',
    outputs: [
      {
        name: 'ret',
        internalType: 'struct KolInfo',
        type: 'tuple',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'iconUrl', internalType: 'string', type: 'string' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'totalVote', internalType: 'uint256', type: 'uint256' },
          { name: 'totalLattixer', internalType: 'uint256', type: 'uint256' },
          { name: 'votingPower', internalType: 'uint256', type: 'uint256' },
          { name: 'since', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_iconUrl', internalType: 'string', type: 'string' },
      { name: '_description', internalType: 'string', type: 'string' },
      { name: '_lattixManager', internalType: 'address', type: 'address' },
      { name: '_lstToken', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lattixManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lstToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onTransferReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_description', internalType: 'string', type: 'string' }],
    name: 'setDescription',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_iconUrl', internalType: 'string', type: 'string' }],
    name: 'setIconUrl',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_name', internalType: 'string', type: 'string' }],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_snsType', internalType: 'enum SnsType', type: 'uint8' },
      { name: '_snsUrl', internalType: 'string', type: 'string' },
    ],
    name: 'setSnsInfo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'since',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'enum SnsType', type: 'uint8' }],
    name: 'snsInfo',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalLattixer',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalReward',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalVote',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'unvote',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'userVote',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'lstAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'vote',
    outputs: [],
    stateMutability: 'payable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// lstToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lstTokenAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1363ApproveFailed',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1363InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC1363InvalidSpender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1363TransferFailed',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1363TransferFromFailed',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approveAndCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'approveAndCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferAndCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transferAndCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'transferFromAndCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFromAndCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

export const lstTokenAddress =
  '0x3307d19F6DA504f4c0Ec40bACD188f3C544be060' as const

export const lstTokenConfig = {
  address: lstTokenAddress,
  abi: lstTokenAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__
 */
export const useReadIpTokenStaking = /*#__PURE__*/ createUseReadContract({
  abi: ipTokenStakingAbi,
  address: ipTokenStakingAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"AA"`
 */
export const useReadIpTokenStakingAa = /*#__PURE__*/ createUseReadContract({
  abi: ipTokenStakingAbi,
  address: ipTokenStakingAddress,
  functionName: 'AA',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"BB"`
 */
export const useReadIpTokenStakingBb = /*#__PURE__*/ createUseReadContract({
  abi: ipTokenStakingAbi,
  address: ipTokenStakingAddress,
  functionName: 'BB',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"DEFAULT_MIN_FEE"`
 */
export const useReadIpTokenStakingDefaultMinFee =
  /*#__PURE__*/ createUseReadContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'DEFAULT_MIN_FEE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"MAX_DATA_LENGTH"`
 */
export const useReadIpTokenStakingMaxDataLength =
  /*#__PURE__*/ createUseReadContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'MAX_DATA_LENGTH',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"MAX_MONIKER_LENGTH"`
 */
export const useReadIpTokenStakingMaxMonikerLength =
  /*#__PURE__*/ createUseReadContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'MAX_MONIKER_LENGTH',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"PP"`
 */
export const useReadIpTokenStakingPp = /*#__PURE__*/ createUseReadContract({
  abi: ipTokenStakingAbi,
  address: ipTokenStakingAddress,
  functionName: 'PP',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"STAKE_ROUNDING"`
 */
export const useReadIpTokenStakingStakeRounding =
  /*#__PURE__*/ createUseReadContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'STAKE_ROUNDING',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"fee"`
 */
export const useReadIpTokenStakingFee = /*#__PURE__*/ createUseReadContract({
  abi: ipTokenStakingAbi,
  address: ipTokenStakingAddress,
  functionName: 'fee',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"minCommissionRate"`
 */
export const useReadIpTokenStakingMinCommissionRate =
  /*#__PURE__*/ createUseReadContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'minCommissionRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"minStakeAmount"`
 */
export const useReadIpTokenStakingMinStakeAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'minStakeAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"minUnstakeAmount"`
 */
export const useReadIpTokenStakingMinUnstakeAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'minUnstakeAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"owner"`
 */
export const useReadIpTokenStakingOwner = /*#__PURE__*/ createUseReadContract({
  abi: ipTokenStakingAbi,
  address: ipTokenStakingAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const useReadIpTokenStakingPendingOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"roundedStakeAmount"`
 */
export const useReadIpTokenStakingRoundedStakeAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'roundedStakeAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__
 */
export const useWriteIpTokenStaking = /*#__PURE__*/ createUseWriteContract({
  abi: ipTokenStakingAbi,
  address: ipTokenStakingAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const useWriteIpTokenStakingAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"createValidator"`
 */
export const useWriteIpTokenStakingCreateValidator =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'createValidator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteIpTokenStakingInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"redelegate"`
 */
export const useWriteIpTokenStakingRedelegate =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'redelegate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"redelegateOnBehalf"`
 */
export const useWriteIpTokenStakingRedelegateOnBehalf =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'redelegateOnBehalf',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteIpTokenStakingRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"setFee"`
 */
export const useWriteIpTokenStakingSetFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'setFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"setMinCommissionRate"`
 */
export const useWriteIpTokenStakingSetMinCommissionRate =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'setMinCommissionRate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"setMinStakeAmount"`
 */
export const useWriteIpTokenStakingSetMinStakeAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'setMinStakeAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"setMinUnstakeAmount"`
 */
export const useWriteIpTokenStakingSetMinUnstakeAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'setMinUnstakeAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"setOperator"`
 */
export const useWriteIpTokenStakingSetOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'setOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"setRewardsAddress"`
 */
export const useWriteIpTokenStakingSetRewardsAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'setRewardsAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"setWithdrawalAddress"`
 */
export const useWriteIpTokenStakingSetWithdrawalAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'setWithdrawalAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"stake"`
 */
export const useWriteIpTokenStakingStake = /*#__PURE__*/ createUseWriteContract(
  {
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'stake',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"stakeOnBehalf"`
 */
export const useWriteIpTokenStakingStakeOnBehalf =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'stakeOnBehalf',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteIpTokenStakingTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"unjail"`
 */
export const useWriteIpTokenStakingUnjail =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'unjail',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"unjailOnBehalf"`
 */
export const useWriteIpTokenStakingUnjailOnBehalf =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'unjailOnBehalf',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"unsetOperator"`
 */
export const useWriteIpTokenStakingUnsetOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'unsetOperator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"unstake"`
 */
export const useWriteIpTokenStakingUnstake =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'unstake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"unstakeOnBehalf"`
 */
export const useWriteIpTokenStakingUnstakeOnBehalf =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'unstakeOnBehalf',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"updateValidatorCommission"`
 */
export const useWriteIpTokenStakingUpdateValidatorCommission =
  /*#__PURE__*/ createUseWriteContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'updateValidatorCommission',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__
 */
export const useSimulateIpTokenStaking =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const useSimulateIpTokenStakingAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"createValidator"`
 */
export const useSimulateIpTokenStakingCreateValidator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'createValidator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateIpTokenStakingInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"redelegate"`
 */
export const useSimulateIpTokenStakingRedelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'redelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"redelegateOnBehalf"`
 */
export const useSimulateIpTokenStakingRedelegateOnBehalf =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'redelegateOnBehalf',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateIpTokenStakingRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"setFee"`
 */
export const useSimulateIpTokenStakingSetFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'setFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"setMinCommissionRate"`
 */
export const useSimulateIpTokenStakingSetMinCommissionRate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'setMinCommissionRate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"setMinStakeAmount"`
 */
export const useSimulateIpTokenStakingSetMinStakeAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'setMinStakeAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"setMinUnstakeAmount"`
 */
export const useSimulateIpTokenStakingSetMinUnstakeAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'setMinUnstakeAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"setOperator"`
 */
export const useSimulateIpTokenStakingSetOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'setOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"setRewardsAddress"`
 */
export const useSimulateIpTokenStakingSetRewardsAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'setRewardsAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"setWithdrawalAddress"`
 */
export const useSimulateIpTokenStakingSetWithdrawalAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'setWithdrawalAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"stake"`
 */
export const useSimulateIpTokenStakingStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'stake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"stakeOnBehalf"`
 */
export const useSimulateIpTokenStakingStakeOnBehalf =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'stakeOnBehalf',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateIpTokenStakingTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"unjail"`
 */
export const useSimulateIpTokenStakingUnjail =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'unjail',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"unjailOnBehalf"`
 */
export const useSimulateIpTokenStakingUnjailOnBehalf =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'unjailOnBehalf',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"unsetOperator"`
 */
export const useSimulateIpTokenStakingUnsetOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'unsetOperator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"unstake"`
 */
export const useSimulateIpTokenStakingUnstake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'unstake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"unstakeOnBehalf"`
 */
export const useSimulateIpTokenStakingUnstakeOnBehalf =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'unstakeOnBehalf',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `functionName` set to `"updateValidatorCommission"`
 */
export const useSimulateIpTokenStakingUpdateValidatorCommission =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    functionName: 'updateValidatorCommission',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__
 */
export const useWatchIpTokenStakingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"CreateValidator"`
 */
export const useWatchIpTokenStakingCreateValidatorEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'CreateValidator',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"Deposit"`
 */
export const useWatchIpTokenStakingDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"FeeSet"`
 */
export const useWatchIpTokenStakingFeeSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'FeeSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchIpTokenStakingInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"MinCommissionRateChanged"`
 */
export const useWatchIpTokenStakingMinCommissionRateChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'MinCommissionRateChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"MinStakeAmountSet"`
 */
export const useWatchIpTokenStakingMinStakeAmountSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'MinStakeAmountSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"MinUnstakeAmountSet"`
 */
export const useWatchIpTokenStakingMinUnstakeAmountSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'MinUnstakeAmountSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const useWatchIpTokenStakingOwnershipTransferStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchIpTokenStakingOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"Redelegate"`
 */
export const useWatchIpTokenStakingRedelegateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'Redelegate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"SetOperator"`
 */
export const useWatchIpTokenStakingSetOperatorEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'SetOperator',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"SetRewardAddress"`
 */
export const useWatchIpTokenStakingSetRewardAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'SetRewardAddress',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"SetWithdrawalAddress"`
 */
export const useWatchIpTokenStakingSetWithdrawalAddressEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'SetWithdrawalAddress',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"Unjail"`
 */
export const useWatchIpTokenStakingUnjailEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'Unjail',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"UnsetOperator"`
 */
export const useWatchIpTokenStakingUnsetOperatorEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'UnsetOperator',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"UpdateValidatorCommission"`
 */
export const useWatchIpTokenStakingUpdateValidatorCommissionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'UpdateValidatorCommission',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ipTokenStakingAbi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchIpTokenStakingWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ipTokenStakingAbi,
    address: ipTokenStakingAddress,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__
 */
export const useReadKolStakingPool = /*#__PURE__*/ createUseReadContract({
  abi: kolStakingPoolAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"DENOMINATOR"`
 */
export const useReadKolStakingPoolDenominator =
  /*#__PURE__*/ createUseReadContract({
    abi: kolStakingPoolAbi,
    functionName: 'DENOMINATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"allSnsInfos"`
 */
export const useReadKolStakingPoolAllSnsInfos =
  /*#__PURE__*/ createUseReadContract({
    abi: kolStakingPoolAbi,
    functionName: 'allSnsInfos',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"claimableKolReward"`
 */
export const useReadKolStakingPoolClaimableKolReward =
  /*#__PURE__*/ createUseReadContract({
    abi: kolStakingPoolAbi,
    functionName: 'claimableKolReward',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"description"`
 */
export const useReadKolStakingPoolDescription =
  /*#__PURE__*/ createUseReadContract({
    abi: kolStakingPoolAbi,
    functionName: 'description',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"iconUrl"`
 */
export const useReadKolStakingPoolIconUrl = /*#__PURE__*/ createUseReadContract(
  { abi: kolStakingPoolAbi, functionName: 'iconUrl' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"info"`
 */
export const useReadKolStakingPoolInfo = /*#__PURE__*/ createUseReadContract({
  abi: kolStakingPoolAbi,
  functionName: 'info',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"lattixManager"`
 */
export const useReadKolStakingPoolLattixManager =
  /*#__PURE__*/ createUseReadContract({
    abi: kolStakingPoolAbi,
    functionName: 'lattixManager',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"lstToken"`
 */
export const useReadKolStakingPoolLstToken =
  /*#__PURE__*/ createUseReadContract({
    abi: kolStakingPoolAbi,
    functionName: 'lstToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"name"`
 */
export const useReadKolStakingPoolName = /*#__PURE__*/ createUseReadContract({
  abi: kolStakingPoolAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"owner"`
 */
export const useReadKolStakingPoolOwner = /*#__PURE__*/ createUseReadContract({
  abi: kolStakingPoolAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"since"`
 */
export const useReadKolStakingPoolSince = /*#__PURE__*/ createUseReadContract({
  abi: kolStakingPoolAbi,
  functionName: 'since',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"snsInfo"`
 */
export const useReadKolStakingPoolSnsInfo = /*#__PURE__*/ createUseReadContract(
  { abi: kolStakingPoolAbi, functionName: 'snsInfo' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"totalLattixer"`
 */
export const useReadKolStakingPoolTotalLattixer =
  /*#__PURE__*/ createUseReadContract({
    abi: kolStakingPoolAbi,
    functionName: 'totalLattixer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"totalReward"`
 */
export const useReadKolStakingPoolTotalReward =
  /*#__PURE__*/ createUseReadContract({
    abi: kolStakingPoolAbi,
    functionName: 'totalReward',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"totalVote"`
 */
export const useReadKolStakingPoolTotalVote =
  /*#__PURE__*/ createUseReadContract({
    abi: kolStakingPoolAbi,
    functionName: 'totalVote',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"userVote"`
 */
export const useReadKolStakingPoolUserVote =
  /*#__PURE__*/ createUseReadContract({
    abi: kolStakingPoolAbi,
    functionName: 'userVote',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kolStakingPoolAbi}__
 */
export const useWriteKolStakingPool = /*#__PURE__*/ createUseWriteContract({
  abi: kolStakingPoolAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"claimKolReward"`
 */
export const useWriteKolStakingPoolClaimKolReward =
  /*#__PURE__*/ createUseWriteContract({
    abi: kolStakingPoolAbi,
    functionName: 'claimKolReward',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteKolStakingPoolInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: kolStakingPoolAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"onTransferReceived"`
 */
export const useWriteKolStakingPoolOnTransferReceived =
  /*#__PURE__*/ createUseWriteContract({
    abi: kolStakingPoolAbi,
    functionName: 'onTransferReceived',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteKolStakingPoolRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: kolStakingPoolAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"setDescription"`
 */
export const useWriteKolStakingPoolSetDescription =
  /*#__PURE__*/ createUseWriteContract({
    abi: kolStakingPoolAbi,
    functionName: 'setDescription',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"setIconUrl"`
 */
export const useWriteKolStakingPoolSetIconUrl =
  /*#__PURE__*/ createUseWriteContract({
    abi: kolStakingPoolAbi,
    functionName: 'setIconUrl',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"setName"`
 */
export const useWriteKolStakingPoolSetName =
  /*#__PURE__*/ createUseWriteContract({
    abi: kolStakingPoolAbi,
    functionName: 'setName',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"setSnsInfo"`
 */
export const useWriteKolStakingPoolSetSnsInfo =
  /*#__PURE__*/ createUseWriteContract({
    abi: kolStakingPoolAbi,
    functionName: 'setSnsInfo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteKolStakingPoolTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: kolStakingPoolAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"unvote"`
 */
export const useWriteKolStakingPoolUnvote =
  /*#__PURE__*/ createUseWriteContract({
    abi: kolStakingPoolAbi,
    functionName: 'unvote',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"vote"`
 */
export const useWriteKolStakingPoolVote = /*#__PURE__*/ createUseWriteContract({
  abi: kolStakingPoolAbi,
  functionName: 'vote',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kolStakingPoolAbi}__
 */
export const useSimulateKolStakingPool =
  /*#__PURE__*/ createUseSimulateContract({ abi: kolStakingPoolAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"claimKolReward"`
 */
export const useSimulateKolStakingPoolClaimKolReward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kolStakingPoolAbi,
    functionName: 'claimKolReward',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateKolStakingPoolInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kolStakingPoolAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"onTransferReceived"`
 */
export const useSimulateKolStakingPoolOnTransferReceived =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kolStakingPoolAbi,
    functionName: 'onTransferReceived',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateKolStakingPoolRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kolStakingPoolAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"setDescription"`
 */
export const useSimulateKolStakingPoolSetDescription =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kolStakingPoolAbi,
    functionName: 'setDescription',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"setIconUrl"`
 */
export const useSimulateKolStakingPoolSetIconUrl =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kolStakingPoolAbi,
    functionName: 'setIconUrl',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"setName"`
 */
export const useSimulateKolStakingPoolSetName =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kolStakingPoolAbi,
    functionName: 'setName',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"setSnsInfo"`
 */
export const useSimulateKolStakingPoolSetSnsInfo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kolStakingPoolAbi,
    functionName: 'setSnsInfo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateKolStakingPoolTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kolStakingPoolAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"unvote"`
 */
export const useSimulateKolStakingPoolUnvote =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kolStakingPoolAbi,
    functionName: 'unvote',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `functionName` set to `"vote"`
 */
export const useSimulateKolStakingPoolVote =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kolStakingPoolAbi,
    functionName: 'vote',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kolStakingPoolAbi}__
 */
export const useWatchKolStakingPoolEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: kolStakingPoolAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchKolStakingPoolInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kolStakingPoolAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchKolStakingPoolOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kolStakingPoolAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `eventName` set to `"RewardReceived"`
 */
export const useWatchKolStakingPoolRewardReceivedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kolStakingPoolAbi,
    eventName: 'RewardReceived',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `eventName` set to `"Unvoted"`
 */
export const useWatchKolStakingPoolUnvotedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kolStakingPoolAbi,
    eventName: 'Unvoted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kolStakingPoolAbi}__ and `eventName` set to `"Voted"`
 */
export const useWatchKolStakingPoolVotedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kolStakingPoolAbi,
    eventName: 'Voted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lstTokenAbi}__
 */
export const useReadLstToken = /*#__PURE__*/ createUseReadContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadLstTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadLstTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadLstTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadLstTokenName = /*#__PURE__*/ createUseReadContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"owner"`
 */
export const useReadLstTokenOwner = /*#__PURE__*/ createUseReadContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadLstTokenSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadLstTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadLstTokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lstTokenAbi}__
 */
export const useWriteLstToken = /*#__PURE__*/ createUseWriteContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteLstTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"approveAndCall"`
 */
export const useWriteLstTokenApproveAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'approveAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteLstTokenBurn = /*#__PURE__*/ createUseWriteContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteLstTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteLstTokenRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteLstTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"transferAndCall"`
 */
export const useWriteLstTokenTransferAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'transferAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteLstTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"transferFromAndCall"`
 */
export const useWriteLstTokenTransferFromAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'transferFromAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteLstTokenTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lstTokenAbi}__
 */
export const useSimulateLstToken = /*#__PURE__*/ createUseSimulateContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateLstTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"approveAndCall"`
 */
export const useSimulateLstTokenApproveAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'approveAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateLstTokenBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateLstTokenMint = /*#__PURE__*/ createUseSimulateContract({
  abi: lstTokenAbi,
  address: lstTokenAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateLstTokenRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateLstTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"transferAndCall"`
 */
export const useSimulateLstTokenTransferAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'transferAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateLstTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"transferFromAndCall"`
 */
export const useSimulateLstTokenTransferFromAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'transferFromAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lstTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateLstTokenTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lstTokenAbi}__
 */
export const useWatchLstTokenEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lstTokenAbi,
  address: lstTokenAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lstTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchLstTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lstTokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchLstTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lstTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchLstTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lstTokenAbi,
    address: lstTokenAddress,
    eventName: 'Transfer',
  })
