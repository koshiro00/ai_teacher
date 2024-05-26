import React from 'react';
import { useProfileOption } from '@/app/(dashboard)/chat/_hooks/useProfileOption';
import { ConfirmModal } from '@/app/_components/layouts/ConfirmModal';
import { Button } from '@/app/_components/elements/Button';

export const ProfileBar: React.FC = () => {
  const {
    profile,
    isValidatingProfile,
    divRef,
    hovered,
    setHovered,
    showOption,
    setShowOption,
    deleteChat,
    setDeleteChatFn,
    handleDeleteChat,
    handleSignOut,
  } = useProfileOption();

  if (!isValidatingProfile)
    return (
      <div className="">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex items-center justify-between rounded-md from-white px-2 py-3 text-sm hover:bg-gray-700"
        >
          <p
            className={`${hovered && 'w-5/6'} z-10 max-w-full cursor-pointer overflow-hidden whitespace-nowrap`}
          >
            {profile?.mail}
          </p>
          {hovered && (
            <span className="z-20 cursor-pointer tracking-widest" onClick={() => setShowOption(true)}>
              •••
            </span>
          )}
        </div>
        {showOption && (
          <div
            className="absolute bottom-7 left-40 z-20 w-52 rounded-lg border border-black bg-white p-4 text-sm font-bold shadow-lg"
            ref={divRef}
          >
            <Button
              color="none"
              block={false}
              onClick={() => setDeleteChatFn('allDelete')}
              className="text-danger"
            >
              チャットルームを全て削除
            </Button>
            <Button color="none" block={false} onClick={handleSignOut} className="text-black_main">
              サインアウト
            </Button>
          </div>
        )}
        {deleteChat && (
          <ConfirmModal
            isOpen={Boolean(deleteChat)}
            callback={(confirm: boolean) => handleDeleteChat(confirm)}
            text={deleteChat.text}
            subText={deleteChat.subText}
          />
        )}
      </div>
    );
};
