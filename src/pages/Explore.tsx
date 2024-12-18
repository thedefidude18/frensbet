import React, { useState, useRef } from 'react';
import { Image, Send } from 'lucide-react';
import { useAccount } from 'wagmi';
import PouchDB from 'pouchdb';

// Initialize PouchDB
const db = new PouchDB('challenges');

// Define interface for challenge details
interface ChallengeDetails {
  challengedUser: string;
  event: string;
  wager: {
    amount: number;
    currency: string;
  };
}

// Notification component
function Notification({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white p-4 rounded-lg shadow-lg flex items-center gap-2`}>
      <span>{message}</span>
      <button onClick={onClose} className="text-white font-bold">
        &times;
      </button>
    </div>
  );
}

// ComposeBox component
function ComposeBox({ onPost, onSuggestUsers }: { onPost: (text: string, challengeDetails: ChallengeDetails, walletAddress: string) => void; onSuggestUsers: (text: string) => string[]; }) {
  const { address, isConnected } = useAccount(); // Get wallet connection status and address
  const [text, setText] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handlePost = async () => {
    if (text.trim()) {
      if (!isConnected || !address) {
        alert('Please connect your wallet to post a challenge.');
        return;
      }

      const walletAddress: string = address ?? '';
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

        try {
          // Add the challenge to PouchDB
          const response = await db.put({
            _id: new Date().toISOString(),
            text,
            challengeDetails,
            walletAddress,
            createdAt: new Date().toISOString(),
          });

          console.log('Challenge added to PouchDB:', response);

          // Send message to Telegram
          await sendTelegramMessage(challengeDetails, walletAddress);

          setText('');
          setNotification({ message: 'Challenge posted! Awaiting acceptance or decline.', type: 'success' });
        } catch (error) {
          console.error('Error adding challenge or sending Telegram message:', error);
          setNotification({ message: 'Failed to create challenge. Please try again.', type: 'error' });
        }
      } else {
        alert('Invalid challenge format. Please use: @frensbot challenge @opponent: Event: [description] Wager: [amount] [currency]');
      }
    }
  };

  // Function to send a message to the Telegram channel
  const sendTelegramMessage = async (challengeDetails: ChallengeDetails, walletAddress: string) => {
    const message = `New Challenge Created!\n` +
                    `Challenged User: ${challengeDetails.challengedUser}\n` +
                    `Event: ${challengeDetails.event}\n` +
                    `Wager: ${challengeDetails.wager.amount} ${challengeDetails.wager.currency}\n` +
                    `Wallet Address: ${walletAddress}`;

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN || '7782603906:AAFze6up2PrXU52eVVxQaJ3pBSMJhuDEimw'; // Replace as needed
    const chatId = process.env.TELEGRAM_CHAT_ID || '1002358557008'; // Replace as needed

    const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to send message to Telegram: ${errorMessage}`);
    }
  };

  return (
    <div className="bg-[#1a1b1f] text-white rounded-2xl p-4 w-full max-w-md shadow-lg mb-4 mx-auto">
      <div className="flex justify-between items-center mb-2">
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
      <div className="flex justify-between items-center">
        <button
          onClick={handlePost}
          className="bg-pink-500 text-white px-4 py-1 rounded-full hover:bg-purple-500 flex items-center"
        >
          <Send size={16} className="mr-2" />
          Challenge
        </button>
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

// Main Explore component
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
    // Implement challenge submission logic as needed
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
