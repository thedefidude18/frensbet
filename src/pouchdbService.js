import PouchDB from 'pouchdb';

// Initialize PouchDB
const db = new PouchDB('challenges');

// Function to add a challenge
export const addChallenge = async (challenge) => {
  try {
    const response = await db.put({
      _id: new Date().toISOString(), // Unique ID based on timestamp
      ...challenge,
      createdAt: new Date().toISOString(),
    });
    return response;
  } catch (error) {
    console.error('Error adding challenge to PouchDB:', error);
    throw error;
  }
};

// Function to retrieve all challenges
export const getChallenges = async () => {
  try {
    const result = await db.allDocs({ include_docs: true });
    return result.rows.map(row => row.doc);
  } catch (error) {
    console.error('Error retrieving challenges from PouchDB:', error);
    throw error;
  }
};