import React from 'react';
import { notifications } from '../data/notifications';
import { Bell, Heart, AtSign, MessageSquare } from 'lucide-react';

export default function Notifications() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 px-4">Notifications</h1>
      <div className="bg-white rounded-lg shadow">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 ${
              !notification.read ? 'bg-blue-50' : ''
            }`}
          >
            {notification.user ? (
              <img
                src={notification.user.avatar}
                alt={notification.user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Bell size={20} className="text-blue-500" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm">{notification.message}</p>
              <span className="text-xs text-gray-400">
                {notification.timestamp}
              </span>
            </div>
            {!notification.read && (
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
