import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Clock, 
  Users, 
  Bell, 
  Wallet, 
  PlusCircle, 
  ArrowUpRight 
} from 'lucide-react';

// Preserve existing interfaces
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

// Sample data (same as before)
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

const ChallengeCard: React.FC<{ challenge: Challenge, type: 'active' | 'pending' | 'resolved' }> = ({ 
  challenge, 
  type 
}) => {
  const statusColors = {
    active: 'bg-blue-50 border-blue-200',
    pending: 'bg-yellow-50 border-yellow-200',
    resolved: 'bg-green-50 border-green-200'
  };

  return (
    <div className={`
      ${statusColors[type]} 
      border rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-all 
      flex items-center justify-between
    `}>
      <div>
        <h3 className="font-semibold text-lg mb-2">{challenge.event}</h3>
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <Trophy className="w-4 h-4 mr-2 text-gray-500" />
            <span>Stake: {challenge.stake} ETH</span>
          </div>
          {challenge.participants && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2 text-gray-500" />
              <span>{challenge.participants.join(' vs ')}</span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-gray-500" />
            <span>{challenge.timeLeft} left</span>
          </div>
        </div>
      </div>
      <button className="
        bg-blue-500 text-white rounded-full p-2 
        hover:bg-blue-600 transition-colors
        flex items-center
      ">
        <ArrowUpRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const Dashboard: React.FC<{ userAddress: string }> = ({ userAddress }) => {
  // Log wallet address when component mounts
  useEffect(() => {
    console.log('User Address:', userAddress);
  }, [userAddress]);

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: User & Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Wallet className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
                <p 
                  className="text-sm text-gray-500 truncate" 
                  style={{ maxWidth: '180px' }}
                >
                  {userAddress.substring(0, 6)}...{userAddress.substring(userAddress.length - 4)}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Balance</span>
                <span className="font-semibold text-gray-800">2.5 ETH</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <Link 
                to="/create-challenge" 
                className="
                  w-full flex items-center justify-center 
                  bg-blue-500 text-white py-3 rounded-lg 
                  hover:bg-blue-600 transition-colors
                "
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Create Challenge
              </Link>
              <button 
                disabled 
                className="
                  w-full py-3 rounded-lg 
                  bg-gray-200 text-gray-400 cursor-not-allowed
                  flex items-center justify-center
                "
              >
                Withdraw Winnings
              </button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <Bell className="w-6 h-6 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            </div>
            <ul className="space-y-2">
              {notifications.length ? (
                notifications.map((note, index) => (
                  <li 
                    key={index} 
                    className="
                      text-sm text-gray-600 
                      bg-gray-50 p-2 rounded 
                      border border-gray-100 
                      truncate
                    "
                  >
                    {note}
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-center">No notifications</p>
              )}
            </ul>
          </div>
        </div>
    {/* Right Column */}
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Challenges</h2>
        <div className="space-y-6">
          {/* Active */}
          <div>
            <div className="flex items-center mb-4">
              <Trophy className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-700">Active Challenges</h3>
            </div>
            {sampleChallenges.active.length ? (
              sampleChallenges.active.map((challenge, index) => (
                <ChallengeCard key={index} challenge={challenge} type="active" />
              ))
            ) : (
              <p className="text-gray-500 text-center">No active challenges</p>
            )}
          </div>
          {/* Pending */}
          <div>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-700">Pending Challenges</h3>
            </div>
            {sampleChallenges.pending.length ? (
              sampleChallenges.pending.map((challenge, index) => (
                <ChallengeCard key={index} challenge={challenge} type="pending" />
              ))
            ) : (
              <p className="text-gray-500 text-center">No pending challenges</p>
            )}
          </div>
          {/* Resolved */}
          <div>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-700">Resolved Challenges</h3>
            </div>
            {sampleChallenges.resolved.length ? (
              sampleChallenges.resolved.map((challenge, index) => (
                <ChallengeCard key={index} challenge={challenge} type="resolved" />
              ))
            ) : (
              <p className="text-gray-500 text-center">No resolved challenges</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Dashboard;
