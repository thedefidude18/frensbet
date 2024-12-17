// src/api/contractFunctions.ts
export const getChallenges = async (address: string) => {
  console.log('Fetching challenges for', address);
  // Return some mock data for testing
  return {
    active: [
      {
        event: "Basketball Challenge",
        stake: "0.1",
        participants: ["0x123", "0x456"],
        timeLeft: "3 days"
      }
    ],
    pending: [],
    resolved: []
  };
};

export const withdrawWinnings = async (address: string) => {
  console.log('Withdrawing winnings for', address);
  return true;
};