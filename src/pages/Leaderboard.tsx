import React from 'react';
import { leaderboardUsers } from '../data/leaderboard';

const Leaderboard = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="b
trophies: ReactNode;
name: ReactNode;g-gray-200 text-gray-600 font-medium">
                <th className="px-4 py-3 text-left">Rank</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-center">Rank</th>
                <th className="px-4 py-3 text-center">Trophies</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardUsers.map((user, index) => (
                <tr
                  key={user.username}
                  className="border-b hover:bg-gray-100 transition-colors duration-300"
                >
                  <td className="px-4 py-3 font-medium">{index + 1}</td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{user.name}</span>
                  </td>
                  <td className="px-4 py-3 text-center">{user.rank}</td>
                  <td className="px-4 py-3 text-center">{user.trophies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
