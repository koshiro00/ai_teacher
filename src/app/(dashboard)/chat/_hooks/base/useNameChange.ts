import React, { useState } from 'react';
import { api } from '@/app/_utils/api';
import { useGetChatRooms } from '@/app/(dashboard)/chat/_hooks/useGetChatRooms';
import { ChatRoom } from '@prisma/client';

export const useNameChange = () => {
  const { mutateChatRooms } = useGetChatRooms();
  const [showInput, setShowInput] = useState<boolean>(false);
  const [isComposing, setIsComposing] = useState(false);

  const handleNameChange = async (event: React.KeyboardEvent<HTMLInputElement>, record: ChatRoom) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      try {
        if (isComposing) return;
        const trimmedText = event.currentTarget.value.trim();
        if (!trimmedText || trimmedText === record.title) return setShowInput(false); // 入力モード終了
        await api.patch(`/chat/room/${record.id}`, { newTitle: event.currentTarget.value });
        mutateChatRooms();
        setShowInput(false);
      } catch (error) {
        console.error('チャットルーム名の更新に失敗しました:', error);
      }
    }
  };

  return { showInput, setShowInput, setIsComposing, handleNameChange };
};
