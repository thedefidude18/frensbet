// Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { getChallenges, withdrawWinnings } from "../api/contractFunctions";
import { useAccount } from 'wagmi';

// Challenge and Challenges interfaces (keep existing)
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

const Dashboard: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState<string>('0');
  const [challenges, setChallenges] = useState<Challenges>({
    active: [],
    pending: [],
    resolved: [],
  });
  const [notifications] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!address) return;

      try {
        // Create provider and fetch balance
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const balance = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(balance));

        // Fetch challenges
        const userChallenges = await getChallenges(address);
        setChallenges(userChallenges);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data.');
      }
    };

    fetchData();
  }, [address]);

  const handleWithdraw = async () => {
    if (!address) return;
    try {
      await withdrawWinnings(address);
      alert('Winnings withdrawn successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to withdraw winnings.');
    }
  };

  if (!isConnected) {
    return (
      <div className="dashboard-container">
        <div className="no-wallet-message">
          <h2>Wallet Not Connected</h2>
          <p>Please connect your wallet to view your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Top Section: User Info */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <p><strong>Wallet Address:</strong> {address}</p>
          <p><strong>Balance:</strong> {balance} ETH</p>
        </div>
        <div className="actions">
          <Link to="/create-challenge" className="btn btn-primary">Create Challenge</Link>
          <button 
            onClick={handleWithdraw} 
            className="btn btn-secondary"
            disabled={!address}
          >
            Withdraw Winnings
          </button>
        </div>
      </div>

      {/* Middle Section: Challenges */}
      <div className="challenges-section">
        <h2>Active Challenges</h2>
        <div className="challenge-list">
          {challenges.active.length ? challenges.active.map((challenge, index) => (
            <div key={index} className="challenge-card">
              <h3>{challenge.event}</h3>
              <p><strong>Stake:</strong> {challenge.stake} ETH</p>
              <p><strong>Participants:</strong> {challenge.participants?.join(' vs ')}</p>
              <p><strong>Time Left:</strong> {challenge.timeLeft}</p>
              <button className="btn btn-link">View</button>
            </div>
          )) : <p>No active challenges.</p>}
        </div>

        <h2>Pending Challenges</h2>
        <div className="challenge-list">
          {challenges.pending.length ? challenges.pending.map((challenge, index) => (
            <div key={index} className="challenge-card">
              <h3>{challenge.event}</h3>
              <p><strong>Stake:</strong> {challenge.stake} ETH</p>
              <p><strong>Invite:</strong> {challenge.invitee}</p>
              <p><strong>Time Left:</strong> {challenge.timeLeft}</p>
              <button className="btn btn-link">Resend Invite</button>
            </div>
          )) : <p>No pending challenges.</p>}
        </div>

        <h2>Resolved Challenges</h2>
        <div className="challenge-list">
          {challenges.resolved.length ? challenges.resolved.map((challenge, index) => (
            <div key={index} className="challenge-card">
              <h3>{challenge.event}</h3>
              <p><strong>Stake:</strong> {challenge.stake} ETH</p>
              <p><strong>Winner:</strong> {challenge.winner}</p>
              <p><strong>Outcome:</strong> {challenge.outcome}</p>
              <button className="btn btn-link">View</button>
            </div>
          )) : <p>No resolved challenges.</p>}
        </div>
      </div>

      {/* Bottom Section: Notifications */}
      <div className="notifications-section">
        <h2>Notifications</h2>
        <ul>
          {notifications.length ? notifications.map((note, index) => (
            <li key={index}>{note}</li>
          )) : <p>No notifications yet.</p>}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;