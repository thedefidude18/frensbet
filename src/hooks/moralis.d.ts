declare module 'moralis' {
    export interface EvmTransaction {
      hash: string;
      fromAddress: string;
      value: string;
      blockTimestamp: string;
      // Add other properties as needed
    }
  
    export namespace EvmApi {
      export const transaction: {
        getWalletTransactions: (options: {
          chain: string;
          address: string;
        }) => Promise<{ result?: EvmTransaction[] }>;
      };
    }
  
    export function start(options: { apiKey: string }): Promise<void>;
  }