export interface Pool {
  id: string;
  address: string;
  token0: {
    symbol: string;
    address: string;
    logoURI: string;
  };
  token1: {
    symbol: string;
    address: string;
    logoURI: string;
  };
  fee: number;
  source: string;
  chainId: number;
}

export const pools: Pool[] = [
  {
    id: "uniswap-v3-usdc-eth",
    address: "0x4C36388Be6F416A29C8d8Eee81C771cE6bE14B18",
    token0: {
      symbol: "USDC",
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      logoURI: "https://ethereum-optimism.github.io/data/USDC/logo.png"
    },
    token1: {
      symbol: "ETH",
      address: "0x0000000000000000000000000000000000000000",
      logoURI: "https://res.cloudinary.com/dg5ddxvko/image/upload/v1738785154/eth-diamond-black-gray_dlsr8g.png"
    },
    fee: 500,
    source: "Uniswap V3",
    chainId: 8453
  },
  {
    id: "uniswap-v3-usdc-weth",
    address: "0x205C9B8c1fCa803B779b1eB4B887Aa0E00FE629",
    token0: {
      symbol: "USDC",
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      logoURI: "https://ethereum-optimism.github.io/data/USDC/logo.png"
    },
    token1: {
      symbol: "WETH",
      address: "0x4200000000000000000000000000000000000006",
      logoURI: "https://ethereum-optimism.github.io/data/WETH/logo.png"
    },
    fee: 500,
    source: "Uniswap V3",
    chainId: 8453
  },
  {
    id: "uniswap-v3-usdc-dai",
    address: "0x6FDC8415B654B0F60475944A0b9421Dc36ee1363",
    token0: {
      symbol: "USDC",
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      logoURI: "https://ethereum-optimism.github.io/data/USDC/logo.png"
    },
    token1: {
      symbol: "DAI",
      address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
      logoURI: "https://ethereum-optimism.github.io/data/DAI/logo.svg"
    },
    fee: 100,
    source: "Uniswap V3",
    chainId: 8453
  },
  {
    id: "uniswap-v3-weth-cbeth",
    address: "0x0D7E906BD9cAFa154b048cFa766Cc1E54E39AF9B",
    token0: {
      symbol: "WETH",
      address: "0x4200000000000000000000000000000000000006",
      logoURI: "https://ethereum-optimism.github.io/data/WETH/logo.png"
    },
    token1: {
      symbol: "cbETH",
      address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
      logoURI: "https://ethereum-optimism.github.io/data/cbETH/logo.svg"
    },
    fee: 100,
    source: "Uniswap V3",
    chainId: 8453
  },
  {
    id: "uniswap-v3-usdc-usdbc",
    address: "0x4C36388Be6F416A29C8d8Eee81C771cE6bE14B18",
    token0: {
      symbol: "USDC",
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      logoURI: "https://ethereum-optimism.github.io/data/USDC/logo.png"
    },
    token1: {
      symbol: "USDbC",
      address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
      logoURI: "https://ethereum-optimism.github.io/data/USDC/logo.png"
    },
    fee: 100,
    source: "Uniswap V3",
    chainId: 8453
  },
  {
    id: "uniswap-v3-weth-toshi",
    address: "0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4",
    token0: {
      symbol: "WETH",
      address: "0x4200000000000000000000000000000000000006",
      logoURI: "https://ethereum-optimism.github.io/data/WETH/logo.png"
    },
    token1: {
      symbol: "TOSHI",
      address: "0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4",
      logoURI: "https://coin-images.coingecko.com/coins/images/31126/large/Toshi_Logo_-_Circular.png"
    },
    fee: 3000,
    source: "Uniswap V3",
    chainId: 8453
  },
  {
    id: "uniswap-v3-weth-aero",
    address: "0x2073D8035bB2b0F2e85aAF5a8732C6c0c06D5561",
    token0: {
      symbol: "WETH",
      address: "0x4200000000000000000000000000000000000006",
      logoURI: "https://ethereum-optimism.github.io/data/WETH/logo.png"
    },
    token1: {
      symbol: "AERO",
      address: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
      logoURI: "https://basescan.org/token/images/aerodrome_32.png"
    },
    fee: 3000,
    source: "Uniswap V3",
    chainId: 8453
  },
  {
    id: "uniswap-v3-weth-degen",
    address: "0x6E08Aa8D6Ac6E028282A5B3FD2548a0E89809Ff1",
    token0: {
      symbol: "WETH",
      address: "0x4200000000000000000000000000000000000006",
      logoURI: "https://ethereum-optimism.github.io/data/WETH/logo.png"
    },
    token1: {
      symbol: "DEGEN",
      address: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
      logoURI: "https://assets.coingecko.com/coins/images/34515/large/android-chrome-512x512.png"
    },
    fee: 3000,
    source: "Uniswap V3",
    chainId: 8453
  }
];
