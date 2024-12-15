require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.0", // Use the same Solidity version as in your contract
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID`, // Rinkeby URL from Infura
      accounts: [`0x${YOUR_PRIVATE_KEY}`], // Your wallet's private key
    },
  },
};
