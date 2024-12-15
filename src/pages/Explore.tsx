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

function ChallengePreviewModal({
  isOpen,
  onClose,
  challengeDetails,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  challengeDetails: ChallengeDetails | null;
  onConfirm: () => void;
}) {
  if (!isOpen || !challengeDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#1a1b1f] text-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl mb-4">Confirm Challenge</h2>
        <div className="mb-4">
          <p>
            <strong>Challenged User:</strong> {challengeDetails.challengedUser}
          </p>
          <p>
            <strong>Event:</strong> {challengeDetails.event}
          </p>
          <p>
            <strong>Wager:</strong> {challengeDetails.wager.amount} {challengeDetails.wager.currency}
          </p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function ComposeBox({ onPost, onSuggestUsers }: ComposeBoxProps) {
  const { address, isConnected } = useAccount(); // Get wallet connection status and address
  const [text, setText] = useState<string>('');
  const [mentionedUsers, setMentionedUsers] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState<string[]>([]); // State for suggested users
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [challengeDetails, setChallengeDetails] = useState<ChallengeDetails | null>(null); // State for challenge details
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
      // Ensure wallet address is available
      if (!isConnected || !address) {
        alert('Please connect your wallet to post a challenge.');
        return;
      }
  
      // Ensure `address` is a string by providing a fallback
      const walletAddress: string = address ?? '';
  
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
  
        // Pass `walletAddress` safely
        onPost(text, challengeDetails, walletAddress);
  
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
  

  const handleModalConfirm = () => {
    if (challengeDetails) {
      // Ensure `address` is a string by providing a fallback
      const walletAddress: string = address ?? ''; // Fallback to empty string if undefined
      onPost(text, challengeDetails, walletAddress);
    }
    setShowModal(false); // Close modal after confirmation
    setShowNotification(true); // Show notification
    setTimeout(() => setShowNotification(false), 3000); // Auto-hide after 3 seconds
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
          <button className="text-gray-400 hover:text-white">🔮</button>
        </div>
        <button
          onClick={handlePost}
          className="bg-pink-500 text-white px-4 py-1 rounded-full hover:bg-purple-500 flex items-center"
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

      {/* Challenge Preview Modal */}
      <ChallengePreviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        challengeDetails={challengeDetails}
        onConfirm={handleModalConfirm}
      />
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
  className="text-4xl md:text-6xl font-bold mb-4 text-pink-500"
  style={{ fontFamily: 'UI Rounded, sans-serif' }}
>
  frens.bet
</h1>
        <p className="text-gray-400 text-lg mb-4">
          challenges your frens.
        </p>
      </div>

      {/* Compose Box */}
      <ComposeBox onPost={addPost} onSuggestUsers={suggestUsers} />
    </div>
  );
}