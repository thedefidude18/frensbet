import React, { useState, useRef } from 'react';
import { Image, Smile, Send } from 'lucide-react';
import { useAccount } from 'wagmi';

// Define interface for challenge details
interface ChallengeDetails {
  challengedUser: string;
  event: string;
  wager: {
    amount: number;
    currency: string;
  };
}

// Define props type for ComposeBox
interface ComposeBoxProps {
  onPost: (text: string, challengeDetails: ChallengeDetails, walletAddress: string) => void;
  onSuggestUsers: (text: string) => string[]; // New prop to handle user suggestions
}

function Notification({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-2">
      <span>{message}</span>
      <button onClick={onClose} className="text-white font-bold">
        &times;
      </button>
    </div>
  );
}

function ComposeBox({ onPost, onSuggestUsers }: ComposeBoxProps) {
  const { address, isConnected } = useAccount(); // Get wallet connection status and address
  const [text, setText] = useState<string>('');
  const [mentionedUsers, setMentionedUsers] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState<string[]>([]); // State for suggested users
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

    // Extract mentioned users
    const matches = value.match(/@(\w+)/g) || [];
    setMentionedUsers(matches.map((match) => match.slice(1)));

    // Suggest users based on input text
    const suggestions = onSuggestUsers(value);
    setSuggestedUsers(suggestions);
  };

  const handlePost = () => {
    if (text.trim()) {
      // Check if wallet is connected
      if (!isConnected || !address) {
        alert('Please connect your wallet to post a challenge.');
        return;
      }

      // Validate challenge format
      const challengeRegex =
        /@frensbot\s+challenge\s+@(\w+):\s*Event:\s*(.+)\s*Wager:\s*(\d+(\.\d+)?)\s*(\w+)/i;
      const match = text.match(challengeRegex);

      if (match) {
        const challengeDetails: ChallengeDetails = {
          challengedUser: match[1],
          event: match[2],
          wager: {
            amount: parseFloat(match[3]),
            currency: match[5],
          },
        };

        // Include wallet address in the post logic
        onPost(text, challengeDetails, address);

        setText('');
        setShowNotification(true); // Show notification
        setTimeout(() => setShowNotification(false), 3000); // Auto-hide after 3 seconds
      } else {
        // Show error for incorrect challenge format
        alert(
          'Invalid challenge format. Please use: @frensbot challenge @opponent: Event: [description] Wager: [amount] [currency]'
        );
      }
    }
  };

  return (
    <div className="bg-[#1a1b1f] text-white rounded-2xl p-4 w-full max-w-md shadow-lg mb-4 mx-auto">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          {mentionedUsers.length > 0 && (
            <span className="text-xs text-gray-400">
              Mentioning: {mentionedUsers.join(', ')}
            </span>
          )}
        </div>
        <button className="text-gray-400 hover:text-white">&times;</button>
      </div>
      <div className="flex items-center gap-4 mb-2">
        <img
          src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=random"
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="@frensbot challenge @userB: Event: [description] Wager: [amount] [currency]"
          className="bg-transparent flex-grow text-white placeholder-gray-500 focus:outline-none"
        />
      </div>
      {/* Suggested users display */}
      {suggestedUsers.length > 0 && (
        <div className="mt-2 p-2 bg-gray-700 rounded-md">
          <h3 className="text-sm text-gray-400">Suggested Opponents:</h3>
          <ul className="text-white">
            {suggestedUsers.map((user) => (
              <li key={user} className="hover:bg-gray-600 p-1 rounded">
                {user}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button className="text-gray-400 hover:text-white">
            <Image size={20} />
          </button>
          <button className="text-gray-400 hover:text-white">
  🔮
</button>
        </div>
        <button
          onClick={handlePost}
          className="bg-purple-600 text-white px-4 py-1 rounded-full hover:bg-purple-500 flex items-center"
        >
          <Send size={16} className="mr-2" />
          Challenge
        </button>
      </div>
      {showNotification && (
        <Notification
          message="Challenge posted! Awaiting acceptance or decline."
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}

export default function Explore() {
  // Function to simulate user suggestions based on input text
  const suggestUsers = (inputText: string): string[] => {
    // You can replace this with real user fetching logic, like from an API
    if (inputText.includes('@')) {
      return ['userA', 'userB', 'userC']; // Example suggested users
    }
    return [];
  };

  const addPost = (text: string, challengeDetails: ChallengeDetails, walletAddress: string) => {
    console.log('New challenge:', text);
    console.log('Challenge Details:', challengeDetails);
    console.log('Wallet Address:', walletAddress);
    // Implement challenge submission logic
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo and Tagline */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <img
            src="/assets/output-onlinegiftools.gif"
            alt="Cute Pet"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <h1
          className="text-4xl md:text-6xl font-bold mb-4"
          style={{ fontFamily: 'UI-Rounded, SF Pro, sans-serif', fontWeight: 600 }}
        >
          <span className="text-blue-500">frens.</span>
          <span className="text-gray-900">bet</span>
        </h1>
        <p
          className="text-gray-600 text-md md:text-xl"
          style={{ fontFamily: 'SF Pro, sans-serif' }}
        >
          Challenge your frens.
        </p>
      </div>
      {/* Compose Box */}
      <ComposeBox onPost={addPost} onSuggestUsers={suggestUsers} />
    </div>
  );
}
