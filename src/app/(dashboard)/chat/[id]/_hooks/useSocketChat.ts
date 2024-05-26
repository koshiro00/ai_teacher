import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useWebSocket } from './base/useWebSocket';
import { useMessages } from './base/useMessages';
import { api } from '@/app/_utils/api';
import { toast } from 'react-toastify';
import { useInView } from './base/useInView';

export const useSocketChat = () => {
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inView = useInView(messagesEndRef);
  const [deleteMessage, setDeleteMessage] = useState<{
    text: string;
    subText: string;
    recordId?: string;
  } | null>(null);

  const socket = useWebSocket();
  const {
    chatMessages,
    chatDetail,
    mutateChatDetail,
    messages,
    messagePost,
    aiResponseState,
    setMessages,
    setAiResponseState,
    realtimeMessage,
  } = useMessages(socket);

  // テキストエリア自動フォーカス
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.focus();
  }, [textareaRef]);

  // メッセージ表示の自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, realtimeMessage]);

  // webSocketサーバーにメッセージを送信
  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const trimedText = processTextarea();
      if (!trimedText) return;
      setAiResponseState('loading');
      // 文脈読み取りのため過去5ラリー分のチャットを含め送信
      const messageData = messages.slice(-10).map(({ id, ...rest }) => rest); // `id`を除外
      socket?.emit('message', [...messageData, { role: 'user', content: trimedText }]);
      const uuid = crypto.randomUUID();
      setMessages([...messages, { role: 'user', content: trimedText, id: uuid }]);
      messagePost('user', trimedText, uuid);
    }
  };

  // textareaの スタイル & 入力値 を調整
  const processTextarea = (): string | null => {
    if (isComposing || !textareaRef.current) return null;
    if (aiResponseState === 'loading') {
      const currentValue = textareaRef.current.value;
      textareaRef.current.value = currentValue + '\n';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      return null;
    }
    const trimedText = textareaRef.current.value.trim();
    textareaRef.current.value = ''; //入力欄リセット
    textareaRef.current.style.height = '52px'; //高さリセット
    return trimedText;
  };

  const handleDeleteMessage = async (confirm: boolean) => {
    if (!confirm || !deleteMessage) return setDeleteMessage(null);
    const result = await api.delete(`/chat/room/${chatDetail?.id}/messages/${deleteMessage.recordId}`);
    setDeleteMessage(null);
    if (result.data.status === 'OK') {
      mutateChatDetail();
      toast.success('削除が完了いたしました');
    }
  };

  return {
    chatDetail,
    chatMessages,
    messages,
    setMessages,
    setIsComposing,
    realtimeMessage,
    aiResponseState,
    textareaRef,
    messagesEndRef,
    handleKeyDown: handleKeyDown,
    deleteMessage,
    setDeleteMessage,
    handleDeleteMessage,
    inView,
  };
};
