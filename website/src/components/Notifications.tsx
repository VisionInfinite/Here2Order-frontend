// Notification.tsx
import React from 'react';
import { Bell as BellIcon, X as ClearIcon } from 'lucide-react';

interface Notification {
    id: number;
    message: string;
    timestamp: string;
}

interface NotificationProps {
    notifications: Notification[];
    clearNotifications: () => void;
    removeNotification: (id: number) => void;
    showNotifications: boolean;
    toggleNotifications: () => void;
}

const Notification: React.FC<NotificationProps> = ({
    notifications,
    clearNotifications,
    removeNotification,
    showNotifications,
    toggleNotifications,
}) => {
    return (
        <div className="relative">
            <button
                onClick={toggleNotifications}
                className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition duration-200"
            >
                <BellIcon className="w-5 h-5 text-gray-700" />
                {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                )}
            </button>

            {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 p-4 bg-gradient-to-br from-indigo-400 via-indigo-100 to-purple-400 rounded-lg shadow-lg text-white transition duration-300 transform origin-top-right scale-95">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Notifications</h2>
                        <button
                            onClick={clearNotifications}
                            className="p-1 bg-indigo-500 hover:bg-indigo-600 rounded-full transition duration-200"
                            aria-label="Clear all notifications"
                        >
                            <ClearIcon className="w-4 h-4 text-white" />
                        </button>
                    </div>
                    {notifications.length > 0 ? (
                        <ul className="space-y-2">
                            {notifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    className="flex justify-between items-center p-2 bg-indigo-400 rounded-md hover:bg-indigo-800 transition duration-200"
                                >
                                    <div className="flex flex-col">
                                        <span>{notification.message}</span>
                                        <span className="text-sm text-gray-300">{notification.timestamp}</span>
                                    </div>
                                    <button
                                        onClick={() => removeNotification(notification.id)}
                                        className="ml-2 text-sm text-red-400 hover:text-red-600 transition duration-200"
                                    >
                                        Dismiss
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-300 text-center">No new notifications</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notification;
