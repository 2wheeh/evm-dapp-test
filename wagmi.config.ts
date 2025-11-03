import { defineConfig } from '@wagmi/cli';
import { react, fetch as fetchPlugin } from '@wagmi/cli/plugins';

const kolStakingPoolAbi = [
  {
    inputs: [],
    name: 'AmountShouldBeBiggerThanZero',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'userVoted',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'inputAmt',
        type: 'uint256',
      },
    ],
    name: 'BiggerThanVoted',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'message',
        type: 'bytes',
      },
    ],
    name: 'ClaimError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidInitialization',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotCallFromLstToken',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotInitializing',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotSupportedCall',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OnlyCalledByManager',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'message',
        type: 'bytes',
      },
    ],
    name: 'TransferError',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint64',
        name: 'version',
        type: 'uint64',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'RewardReceived',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Unvoted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Voted',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DENOMINATOR',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'allSnsInfos',
    outputs: [
      {
        components: [
          {
            internalType: 'enum SnsType',
            name: 'snsType',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'snsUrl',
            type: 'string',
          },
        ],
        internalType: 'struct SnsInfo[]',
        name: 'ret',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimKolReward',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimableKolReward',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'description',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'iconUrl',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'info',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'iconUrl',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'totalVote',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalLattixer',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingPower',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'since',
            type: 'uint256',
          },
        ],
        internalType: 'struct KolInfo',
        name: 'ret',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_iconUrl',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_lattixManager',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_lstToken',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lattixManager',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lstToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'onTransferReceived',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
    ],
    name: 'setDescription',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_iconUrl',
        type: 'string',
      },
    ],
    name: 'setIconUrl',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
    ],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum SnsType',
        name: '_snsType',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: '_snsUrl',
        type: 'string',
      },
    ],
    name: 'setSnsInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'since',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum SnsType',
        name: '',
        type: 'uint8',
      },
    ],
    name: 'snsInfo',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalLattixer',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalReward',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalVote',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'unvote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userVote',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'lstAmount',
        type: 'uint256',
      },
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
] as const;

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'kolStakingPool',
      abi: kolStakingPoolAbi,
    },
  ],
  plugins: [
    react(),
    fetchPlugin({
      contracts: [
        {
          name: 'lstToken',
          address: '0x3307d19F6DA504f4c0Ec40bACD188f3C544be060',
        },
        {
          name: 'ipTokenStaking',
          address: '0xcccccc0000000000000000000000000000000001',
        },
        {
          name: 'helloWorld',
          address: '0x07a2449a9140053A7CD8a9D704701B98D405bb1C',
        },
        // not varified yet
        // {
        //   name: 'lattixManager',
        //   address: '0xD5dC8704FAcEC46dbb4a9ff851cb96c6eE7953a0',
        // },
        // not varified yet
        // {
        //   name: 'undelegationVault',
        //   address: '0x8706afB115bEF892A4a4dD940a541319985B272E',
        // },
        // not varified yet
        // {
        //   name: 'pythOracle',
        //   address: '0xD458261E832415CFd3BAE5E416FdF3230ce6F134',
        // },
      ],
      request(contract) {
        if (!contract.address) throw new Error('address is required');
        const address = typeof contract.address === 'string' ? contract.address : Object.values(contract.address)[0];
        return { url: `https://aeneid.storyscan.io/api/v2/smart-contracts/${address}` };
      },
      async parse({ response }) {
        const res = await response.json();

        if (!res.abi && res.implementations?.length > 0) {
          const proxyRes = await fetch(
            `https://aeneid.storyscan.io/api/v2/smart-contracts/${res.implementations[0].address_hash}`
          );
          // it will fail when implementation contract is not verified
          return (await proxyRes.json()).abi;
        }

        return res.abi;
      },
    }),
  ],
}) as ReturnType<typeof defineConfig>;
