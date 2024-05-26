import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { ChatMessage } from '@prisma/client';
import { useChatDeatil } from '@/app/(dashboard)/chat/[id]/_hooks/base/useChatDetail';
import { api } from '@/app/_utils/api';

type Messages = {
  id?: string;
  role: 'system' | 'user';
  content: string;
}[];

export const useMessages = (socket: Socket | null) => {
  const [messages, setMessages] = useState<Messages>([]);
  const { chatDetail, chatMessages, mutateChatDetail } = useChatDeatil();
  const [aiResponseState, setAiResponseState] = useState<'none' | 'loading' | 'end'>('none');
  const [realtimeMessage, setRealtimeMessage] = useState<string[]>([]);

  // socket操作
  useEffect(() => {
    if (!socket) return;
    // AIからのレスポンス受信時
    socket.on('message', (responseMessage: string) => {
      responseMessage === 'end'
        ? setAiResponseState('end')
        : setRealtimeMessage((prev) => [...prev, responseMessage]);
    });
    return () => {
      mutateChatDetail(); // アンマウント時にキャッシュ更新
      socket.off('message');
    };
  }, [socket]);

  // メッセージの初期設定
  useEffect(() => {
    if (!chatMessages || chatMessages.length < 1) return;
    // 既存メッセージをuseStateで管理
    const initialMessages = chatMessages.map((record) => ({
      role: record.role as 'system' | 'user',
      content: record.message,
      id: record.id,
    }));
    setMessages(initialMessages);
    // newからの遷移（メッセージが一つだけ）ならチャット送信
    if (chatMessages.length >= 2) return;
    handleFirstUserMessage(chatMessages[0]);
  }, [chatMessages]);

  // AIからのレスポンス終了時
  useEffect(() => {
    if (aiResponseState !== 'end') return;
    const uuid = crypto.randomUUID();
    setMessages((prev) => [...prev, { role: 'system', content: realtimeMessage.join(''), id: uuid }]);
    messagePost('system', realtimeMessage.join(''), uuid);
    setRealtimeMessage([]);
    setAiResponseState('none');
  }, [aiResponseState]);

  const messagePost = async (role: 'system' | 'user', message: string, id: string) => {
    await api.post(`/chat/room/${chatDetail?.id}/messages`, {
      id,
      role,
      message,
    });
  };

  const handleFirstUserMessage = (chatMessage: ChatMessage) => {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 30000);
    const messageCreatedAt = new Date(chatMessage.createdAt);
    // ユーザーからのメッセージである & 30秒以内に送信されている場合
    if (chatMessage.role === 'user' && messageCreatedAt >= oneMinuteAgo) {
      setAiResponseState('loading');
      socket?.emit('message', [{ role: 'user', content: chatMessage.message }]);
    }
  };

  return {
    chatMessages,
    chatDetail,
    mutateChatDetail,
    messages,
    messagePost,
    aiResponseState,
    setMessages,
    setAiResponseState,
    realtimeMessage,
    setRealtimeMessage,
  };
};
