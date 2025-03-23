import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config"

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    fire: {
      url: "https://rpc.testnet.5ire.network",
      chainId: 997,
      accounts: [process.env.PRIVATE_KEY as string]
    }
  }
};

export default config;
