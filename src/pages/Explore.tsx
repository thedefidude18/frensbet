import React, { useState } from 'react';
import { Image, Smile } from 'lucide-react';

// ComposeBox component definition
function ComposeBox({ onPost }) {
  const [text, setText] = useState('');

  const handlePost = () => {
    if (text.trim()) {
      onPost(text);
      setText('');
    }
  };

  return (
    <div className="bg-[#1a1b1f] text-white rounded-xl p-4 w-full max-w-md shadow-lg mb-4 mx-auto">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4"></div>
        <button className="text-gray-400 hover:text-white">&times;</button>
      </div>
      <div className="flex items-center gap-4 mb-2">
        <img
          src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=random"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder=" @frensbot challenge @userB."
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
          className="bg-purple-600 text-white px-4 py-1 rounded-full hover:bg-purple-500"
        >
          Challenge
        </button>
      </div>
    </div>
  );
}

export default function Explore() {
  const addPost = (text) => {
    console.log('New post:', text);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo and Tagline */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXJ1YnBmbzN1OXN0cTdqZGRpOXJtMXl5dXowbHFtZzR1YmNlbnN1ZiZlcD12YW5kZV9yYW5kb20mcD1naWZfYnlfaWQmY3Q9Zw/blSTtZUAjFMNW/giphy.gif"
            alt="Cute Pet"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <h1
          className="text-4xl md:text-6xl font-bold mb-4"
          style={{ fontFamily: 'SF Pro, sans-serif', fontWeight: 700 }}
        >
          <span className="text-blue-500">frens.</span>
          <span className="text-gray-900">bet</span>
        </h1>
        <p
          className="text-gray-600 text-md md:text-xl"
          style={{ fontFamily: 'SF Pro, sans-serif' }}
        >
          Challenge your frens, Top the leaderboard!🏆
        </p>
        <link
          href="https://fonts.googleapis.com/css2?family=SF+Pro:wght@700&display=swap"
          rel="stylesheet"
        />
      </div>
      {/* Compose Box */}
      <ComposeBox onPost={addPost} />
    </div>
  );
}
