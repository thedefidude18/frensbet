require('@nomiclabs/hardhat-ethers');
require('dotenv').config();
<<<<<<< HEAD

module.exports = {
  solidity: "0.8.0", // Update with your contract's Solidity version
  networks: {
    sepolia: {
      url: `https://sepolia.eth.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
=======
require("@nomiclabs/hardhat-etherscan");

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
>>>>>>> c3a4da3 (hardhat22)
