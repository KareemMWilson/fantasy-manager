import { useEffect, useState, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

interface Notification {
  message: string;
  type: 'success' | 'error';
  jobId?: string;
}

export const useNotifications = (userId: string | undefined, isNewUser: boolean) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if(isNewUser){

      let socketInstance: Socket | null = null;
  
      if (userId) {
        socketInstance = io('http://localhost:5000', {
          query: { userId },
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000
        });
  
        socketInstance.on('connect', () => {
          console.log('Socket connected');
          setIsConnected(true);
        });
  
        socketInstance.on('disconnect', () => {
          console.log('Socket disconnected');
          setIsConnected(false);
        });
  
        socketInstance.on('tc-notify', (data: Notification) => {
          setNotification(data);
        });
  
        setSocket(socketInstance);
      }
  
      return () => {
        if (socketInstance) {
          socketInstance.disconnect();
          setSocket(null);
          setIsConnected(false);
        }
      };
    }
  }, [userId]);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    notification,
    clearNotification,
    isConnected,
    socket
  };
};