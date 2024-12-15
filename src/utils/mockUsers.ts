// Test user data for simulating users
export const testUsers = {
    userA: { username: 'userA', walletAddress: '0xA1B2C3D4E5F6G7H8' },
    userB: { username: 'userB', walletAddress: '0xB1A2C3D4E5F6G7H8' },
  };
  
  // Sample challenge structure
  export interface ChallengeDetails {
    event: string;
    wager: { amount: number, currency: string };
    challengedUser: string; // User being challenged
    creatorUser: string; // User creating the challenge
  }
  