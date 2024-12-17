// Dashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// Challenge and Challenges interfaces
interface Challenge {
  event: string;
  stake: string;
  participants?: string[];
  timeLeft?: string;
  invitee?: string;
  winner?: string;
  outcome?: string;
}

interface Challenges {
  active: Challenge[];
  pending: Challenge[];
  resolved: Challenge[];
}

// Sample data for challenges and notifications
const sampleChallenges: Challenges = {
  active: [
    { event: 'Challenge 1', stake: '1.0', participants: ['Alice', 'Bob'], timeLeft: '2 days' },
    { event: 'Challenge 2', stake: '0.5', participants: ['Charlie', 'Dave'], timeLeft: '1 day' },
  ],
  pending: [
    { event: 'Challenge 3', stake: '0.3', invitee: 'Eve', timeLeft: '3 days' },
  ],
  resolved: [
    { event: 'Challenge 4', stake: '0.8', winner: 'Frank', outcome: 'Won' },
  ],
};

const notifications: string[] = [
  'You have a new challenge invite.',
  'Your challenge has been resolved.',
];

const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => (
  <div className="challenge-card">
    <h3>{challenge.event}</h3>
    <p><strong>Stake:</strong> {challenge.stake} ETH</p>
    <p><strong>Participants:</strong> {challenge.participants?.join(' vs ')}</p>
    <p><strong>Time Left:</strong> {challenge.timeLeft}</p>
    <button className="btn btn-link">View</button>
  </div>
);

// Accept userAddress as a prop
const Dashboard: React.FC<{ userAddress: string }> = ({ userAddress }) => {
  return (
    <div className="dashboard-container">
      {/* Top Section: User Info */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <p><strong>Wallet Address:</strong> {userAddress}</p>
          <p><strong>Balance:</strong> 2.5 ETH</p>
        </div>
        <div className="actions">
          <Link to="/create-challenge" className="btn btn-primary">Create Challenge</Link>
          <button className="btn btn-secondary" disabled>
            Withdraw Winnings
          </button>
        </div>
      </div>

      {/* Middle Section: Challenges */}
      <div className="challenges-section">
        <h2>Active Challenges</h2>
        <div className="challenge-list">
          {sampleChallenges.active.length ? sampleChallenges.active.map((challenge, index) => (
            <ChallengeCard key={index} challenge={challenge} />
          )) : <p>No active challenges.</p>}
        </div>

        <h2>Pending Challenges</h2>
        <div className="challenge-list">
          {sampleChallenges.pending.length ? sampleChallenges.pending.map((challenge, index) => (
            <ChallengeCard key={index} challenge={challenge} />
          )) : <p>No pending challenges.</p>}
        </div>

        <h2>Resolved Challenges</h2>
        <div className="challenge-list">
          {sampleChallenges.resolved.length ? sampleChallenges.resolved.map((challenge, index) => (
            <ChallengeCard key={index} challenge={challenge} />
          )) : <p>No resolved challenges.</p>}
        </div>
      </div>

      {/* Bottom Section: Notifications */}
      <div className="notifications-section">
        <h2>Notifications</h2>
        <ul>
          {notifications.length ? notifications.map((note, index) => (
            <li key={index}>{note}</li>
          )) : <li>No notifications yet.</li>}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;