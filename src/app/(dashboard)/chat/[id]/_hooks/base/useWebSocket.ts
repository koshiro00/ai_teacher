import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { api } from '@/app/_utils/api';

export const useWebSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    let isMounted = true; // マウント状態管理

    const initSocket = async () => {
      try {
        await api.post('/sockets'); // WebSocketのセッション開始リクエスト
        const newSocket = io({ autoConnect: false });
        newSocket.on('connect', () => {
          // console.log('WebSocketに接続しました。');
        });
        newSocket.on('disconnect', () => {
          // console.log('WebSocketから切断されました');
        });

        newSocket.connect();
        if (isMounted) setSocket(newSocket);
      } catch (error) {
        console.error('WebSocketの初期化中にエラー :', error);
      }
    };
    initSocket();

    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
        socket.close();
      }
      isMounted = false; // アンマウント後の状態更新を防ぐ
    };
  }, []);

  return socket;
};
