import React, { useState, useEffect } from 'react';
import { getSocket } from '../services/socket';

const NotificationToast = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = getSocket();

        if (!socket) return;

        // Listen for hire notifications
        socket.on('hire-notification', (notification) => {
            console.log('🔔 Received notification:', notification);

            const newNotification = {
                ...notification,
                id: Date.now(),
            };

            setNotifications((prev) => [...prev, newNotification]);

            // Auto-remove after 8 seconds
            setTimeout(() => {
                setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
            }, 8000);
        });

        return () => {
            if (socket) {
                socket.off('hire-notification');
            }
        };
    }, []);

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className="glass p-4 rounded-2xl shadow-2xl border-2 border-green-500 dark:border-green-400 animate-slide-up"
                >
                    {/* Close button */}
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Content */}
                    <div className="flex items-start space-x-3 pr-6">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-green-500 dark:bg-green-400 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="flex-1">
                            <h4 className="font-bold text-green-700 dark:text-green-400 mb-1">
                                {notification.message}
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                Gig: <span className="font-semibold">{notification.gig?.title}</span>
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                                <span>Your bid: ${notification.bidAmount?.toLocaleString()}</span>
                                <span>{new Date(notification.timestamp).toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 dark:bg-green-400 animate-shrink-width"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationToast;
