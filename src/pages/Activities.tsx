import React from 'react';

interface Challenge {
  id: number;
  challenger: {
    username: string;
    avatar: string;
  };
  opponent: {
    username: string;
    avatar: string;
  };
  description: string;
  pool: string;
}

const Activities: React.FC = () => {
  const challenges: Challenge[] = [
    {
      id: 1,
      challenger: {
        username: 'user_3bqww',
        avatar: 'https://example.com/avatar1.png',
      },
      opponent: {
        username: 'mortysol',
        avatar: 'https://example.com/avatar2.png',
      },
      description: 'ETH will break $3000 by end of January',
      pool: '4.81',
    },
    {
      id: 2,
      challenger: {
        username: 'user_ouxqvu',
        avatar: 'https://example.com/avatar3.png',
      },
      opponent: {
        username: 'johndoe',
        avatar: 'https://example.com/avatar4.png',
      },
      description: 'BTC will hit $60k in Q1 2024',
      pool: '3.52',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Activities</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4">Users</th>
              <th className="p-4">Challenge</th>
              <th className="p-4">Pool</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((challenge, index) => (
              <tr
                key={challenge.id}
                className={`border-t ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={challenge.challenger.avatar}
                      alt={challenge.challenger.username}
                      className="w-8 h-8 rounded-full border-2 border-blue-500"
                    />
                    <span className="text-sm text-gray-800 font-medium">
                      {challenge.challenger.username} vs
                    </span>
                    <img
                      src={challenge.opponent.avatar}
                      alt={challenge.opponent.username}
                      className="w-8 h-8 rounded-full border-2 border-red-500"
                    />
                    <span className="text-sm text-gray-800 font-medium">
                      {challenge.opponent.username}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-gray-700 font-medium">
                  {challenge.description}
                </td>
                <td className="p-4 text-center">
                  <div className="bg-emerald-600 text-white px-4 py-1 rounded-xl font-medium">
                    {challenge.pool} ETH
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities; // Ensure this is the only default export