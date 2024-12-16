require('@nomiclabs/hardhat-ethers');
require('dotenv').config();require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.19", // Adjust this to your version
  networks: {
    polygon: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/o3VW3WRXrsXXMRX3l7jZxLUqhWyZzXBy",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: "7PA1RFUX21VJTKIUJZVFUHX64QERZ3HIN6", // Replace this with your Polygonscan API key
  },
};

