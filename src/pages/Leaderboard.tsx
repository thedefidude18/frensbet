import React from 'react';
import { leaderboardUsers } from '../data/leaderboardUsers';

export default function Leaderboard() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">

      <div className="shadow-lg rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Placement</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Player</th>
              <th className="py-4 px-6 text-center text-sm font-semibold text-gray-600">Win Streak</th>
              <th className="py-4 px-6 text-center text-sm font-semibold text-gray-600">Total Wins</th>
              <th className="py-4 px-6 text-right text-sm font-semibold text-gray-600">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardUsers.map((user) => (
              <tr
                key={user.rank}
                className="hover:bg-gray-50 even:bg-gray-100 transition-colors"
              >
                <td className="py-4 px-6 text-sm text-gray-800 font-semibold">
                  {user.rank < 10 ? `0${user.rank}` : user.rank}
                </td>
                <td className="py-4 px-6 text-sm flex items-center gap-4">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />
                  <span className="text-gray-800 font-medium">
                    {user.username}
                  </span>
                </td>
                <td className="py-4 px-6 text-center text-sm text-gray-800">
                  {user.winStreak}
                </td>
                <td className="py-4 px-6 text-center text-sm text-gray-800">
                  {user.totalWins}
                </td>
                <td className="py-4 px-6 text-right text-sm text-gray-800 font-bold">
                  {user.score.toLocaleString()} pts
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .table-auto th {
          border-bottom: 2px solid #e2e8f0; /* Light gray border */
        }

        .table-auto td {
          border-bottom: 1px solid #e2e8f0; /* Light gray border */
        }

        @media (max-width: 768px) {
          .table-auto th, .table-auto td {
            padding: 12px 8px; /* Adjust padding for smaller screens */
          }

          h1 {
            font-size: 2rem; /* Smaller font size for mobile */
          }
        }
      `}</style>
    </div>
  );
}
