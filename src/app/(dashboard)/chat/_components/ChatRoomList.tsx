import React from 'react';
import { useGetChatRooms } from '@/app/(dashboard)/chat/_hooks/useGetChatRooms';
import { ChatRoomTitle } from '@/app/(dashboard)/chat/_components/ChatRoomTitle';
import { Rotate } from '@/app/_components/layouts/loading/Rotate';

export const ChatRoomList: React.FC = () => {
  const { chatRooms, isValidatingChatRooms } = useGetChatRooms();

  if (isValidatingChatRooms) return <Rotate className="flex h-screen items-center justify-center" />;

  return (
    <div className="mt-6 w-full">
      {chatRooms?.map((record) => <ChatRoomTitle record={record} key={record.id} />)}
    </div>
  );
};
