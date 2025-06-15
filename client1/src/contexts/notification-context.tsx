'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { FloatingNotification } from '@/components/floating-notification';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface NotificationContextType {
  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning', duration = 5000) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const notification: Notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            style={{
              transform: `translateY(${index * 80}px)`,
              transition: 'transform 0.3s ease-in-out'
            }}
          >
            <FloatingNotification
              message={notification.message}
              type={notification.type}
              duration={notification.duration}
              onClose={() => removeNotification(notification.id)}
            />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
