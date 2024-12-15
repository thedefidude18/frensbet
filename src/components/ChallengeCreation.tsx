import React, { useState } from 'react';
import { ChallengeDetails } from '../utils/mockUsers';

const ChallengeCreation = () => {
  const [challenges, setChallenges] = useState<ChallengeDetails[]>([]);
  const [challengeText, setChallengeText] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  // Function to handle adding challenges (for User A)
  const addPost = (challengeDetails: ChallengeDetails) => {
    console.log('New challenge:', challengeDetails);
    setChallenges([...challenges, challengeDetails]); // Save challenge to state
  };

  // Function to simulate challenge acceptance (for User B)
  const acceptChallenge = (challenge: ChallengeDetails) => {
    console.log('Challenge accepted:', challenge);
    // Implement acceptance logic here
  };

  // Sample challenge details
  const challengeDetails = {
    event: 'Who will win the next crypto challenge?',
    wager: { amount: 10, currency: 'ETH' },
    creatorUser: 'userA',
    challengedUser: selectedUser,
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter challenge details"
        value={challengeText}
        onChange={(e) => setChallengeText(e.target.value)}
        className="w-full p-2 bg-gray-700 rounded-lg mb-4"
      />
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="w-full p-2 bg-gray-700 rounded-lg mb-4"
      >
        <option value="">Select User to Challenge</option>
        <option value="userA">userA</option>
        <option value="userB">userB</option>
      </select>
      <button
        onClick={() => addPost(challengeDetails)}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Create Challenge
      </button>

      {/* Display Incoming Challenges for User B */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">Incoming Challenges</h3>
        <ul>
          {challenges.map((challenge, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded-lg mb-4">
              <p><strong>Challenged by:</strong> {challenge.creatorUser}</p>
              <p><strong>Event:</strong> {challenge.event}</p>
              <p><strong>Wager:</strong> {challenge.wager.amount} {challenge.wager.currency}</p>
              <button
                onClick={() => acceptChallenge(challenge)}
                className="bg-green-500 text-white py-2 px-4 rounded-lg mt-2"
              >
                Accept Challenge
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChallengeCreation;
