import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
  apiKey: 'o3VW3WRXrsXXMRX3l7jZxLUqhWyZzXBy', // Replace with your Alchemy API Key
  network: Network.ETH_MAINNET,  // Use Network.ETH_GOERLI for testing
};

const alchemy = new Alchemy(settings);

export default alchemy;
