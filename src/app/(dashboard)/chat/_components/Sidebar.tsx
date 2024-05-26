import React from 'react';
import { ChatRoomList } from './ChatRoomList';
import { ProfileBar } from './ProfileBar';
import Link from 'next/link';

export const Sidebar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 top-0 w-[240px] bg-black_main text-white">
      <div className="mx-2 mt-4">
        <Link href="/chat/new" className="flex items-center justify-between rounded-md p-2 hover:bg-gray-700">
          <p className="font-bold">新規チャット</p>
          <span className="block">＋</span>
        </Link>
        <ChatRoomList />
        <div className="fixed bottom-10 w-[220px]">
          <ProfileBar />
        </div>
      </div>
    </div>
  );
};
