import { testUsers } from '../utils/mockUsers';

// Modify this function to return test users
const suggestUsers = (inputText: string): string[] => {
  if (inputText.includes('@')) {
    return [testUsers.userA.username, testUsers.userB.username]; // Return test users
  }
  return [];
};
