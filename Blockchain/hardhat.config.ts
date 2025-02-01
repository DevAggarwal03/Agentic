import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
      // accounts: [{privateKey: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", balance: "1000000"}]
    },
    LineaSepolia: {
      // chainId: 59141,
      url: "https://rpc.sepolia.linea.build",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    }
  },
};

export default config;
