import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/_utils/api';
import { useGetChatRooms } from '@/app/(dashboard)/chat/_hooks/useGetChatRooms';

export const useNewChat = () => {
  const { mutateChatRooms } = useGetChatRooms();
  const router = useRouter();
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // テキストエリア自動フォーカス
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.focus();
  }, []);

  // 1つ目のメッセージのみ送信（AIからのレスポンスは遷移先）
  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (isComposing || !textareaRef.current) return;
      const trimedText = textareaRef.current.value.trim();
      textareaRef.current.value = ''; //入力欄リセット
      textareaRef.current.style.height = '52px'; //高さリセット
      if (!trimedText) return;
      const result = await userMessagePost(trimedText);
      if (result.data.status === 'OK') {
        mutateChatRooms();
        router.push(`/chat/${result?.data.firstMessage.chatRoomId}`);
      }
    }
  };

  const userMessagePost = async (message: string) => {
    return await api.post(`/chat/room`, {
      message: message,
    });
  };

  return {
    setIsComposing,
    textareaRef,
    handleKeyDown: handleKeyDown,
  };
};
