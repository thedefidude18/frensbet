import React, { useState, useRef } from 'react';
import { Image, Smile, Send } from 'lucide-react';

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
  onPost: (text: string, challengeDetails: ChallengeDetails) => void;
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

function ComposeBox({ onPost }: ComposeBoxProps) {
  const [text, setText] = useState<string>('');
  const [mentionedUsers, setMentionedUsers] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

    // Extract mentioned users
    const matches = value.match(/@(\w+)/g) || [];
    setMentionedUsers(matches.map((match) => match.slice(1)));
  };

  const handlePost = () => {
    if (text.trim()) {
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

        onPost(text, challengeDetails);
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
    <div className="bg-[#1a1b1f] text-white rounded-xl p-4 w-full max-w-md shadow-lg mb-4 mx-auto">
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
          className="w-10 h-10 rounded-full"
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
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button className="text-gray-400 hover:text-white">
            <Image size={20} />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Smile size={20} />
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
  const addPost = (text: string, challengeDetails: ChallengeDetails) => {
    console.log('New challenge:', text);
    console.log('Challenge Details:', challengeDetails);
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
            className="w-25 h-25 rounded-full object-cover"
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
      <ComposeBox onPost={addPost} />
    </div>
  );
}
