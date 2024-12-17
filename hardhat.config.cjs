require('@nomiclabs/hardhat-ethers');
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.19",
  networks: {
    polygon: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/o3VW3WRXrsXXMRX3l7jZxLUqhWyZzXBy",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
     Amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      chainId: 80002,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      polygon: "7PA1RFUX21VJTKIUJZVFUHX64QERZ3HIN6",
      polygonAmoy: "7PA1RFUX21VJTKIUJZVFUHX64QERZ3HIN6"
    },
  },
};