import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChatRoom } from '@prisma/client';
import { api } from '@/app/_utils/api';
import { useGetChatRooms } from '../useGetChatRooms';

type DeleteAction = 'singleDelete' | 'allDelete';

type HandleDeleteActions = {
  action: DeleteAction;
  text: string;
  subText: string;
  recordId?: string;
};

export const useDelete = () => {
  const router = useRouter();
  const { mutateChatRooms } = useGetChatRooms();
  const [deleteChat, setDeleteChat] = useState<HandleDeleteActions | null>(null);

  const setDeleteChatFn = (action: DeleteAction, record?: ChatRoom) => {
    const text = action === 'singleDelete' && record ? record.title : '全てのチャットルーム';
    setDeleteChat({
      action,
      text,
      subText: '下記を削除しますか?',
      recordId: action === 'singleDelete' ? record?.id : undefined,
    });
  };

  // 確認ダイアログの結果により削除実行
  const handleDeleteChat = async (confirm: boolean) => {
    if (!confirm || !deleteChat) return setDeleteChat(null);
    if (deleteChat.action === 'singleDelete' && !deleteChat.recordId) return;
    const { action, recordId } = deleteChat;
    let endpoint = `/chat/room`;
    if (action === 'singleDelete' && recordId) endpoint += `/${recordId}`;
    const result = await api.delete(endpoint);
    if (result && result.data.status === 'OK') {
      mutateChatRooms();
      router.push('/chat/new');
    }
    setDeleteChat(null);
  };

  return {
    deleteChat,
    setDeleteChatFn,
    handleDeleteChat,
  };
};
