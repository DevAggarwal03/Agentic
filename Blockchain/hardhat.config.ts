import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    LineaSepolia: {
      // chainId: 59141,
      url: "https://rpc.sepolia.linea.build",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    }
  },
};

export default config;
