import React from 'react';
import { ChatRoom } from '@prisma/client';
import { useChatRoomControl } from '@/app/(dashboard)/chat/_hooks/useChatRoomOption';
import { ConfirmModal } from '@/app/_components/layouts/ConfirmModal';
import { Button } from '@/app/_components/elements/Button';
import { TextInput } from '@/app/_components/elements/TextInput';

type ChatRoomTitleProps = {
  record: ChatRoom;
};

export const ChatRoomTitle: React.FC<ChatRoomTitleProps> = ({ record }) => {
  const {
    nowRoom,
    divRef,
    inputRef,
    hoveredId,
    setHoveredId,
    showOptionsId,
    setShowOptionsId,
    handleRedirect,
    showInput,
    setShowInput,
    setIsComposing,
    handleNameChange,
    deleteChat,
    setDeleteChatFn,
    handleDeleteChat,
  } = useChatRoomControl(record.id);

  return (
    <div>
      <li
        onMouseEnter={() => setHoveredId(record.id)}
        onMouseLeave={() => setHoveredId(null)}
        className="relative mt-1"
      >
        <div className="flex items-center">
          {showInput ? (
            <TextInput
              className="bg-inherit text-sm"
              type="text"
              ref={inputRef}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              defaultValue={record.title}
              onKeyDown={(e) => handleNameChange(e, record)}
              onBlur={() => setShowInput(false)}
              label=""
              variant="primary"
            />
          ) : (
            <div
              className={`flex w-full items-center justify-between rounded-md from-white px-2 py-2 text-sm hover:bg-gray-700 ${nowRoom && 'bg-gray-700'}`}
            >
              <p
                className={`${hoveredId === record.id && 'w-5/6'} z-10 cursor-pointer overflow-hidden whitespace-nowrap`}
                onClick={() => handleRedirect(record.id)}
              >
                {record.title}
              </p>
              {hoveredId === record.id && (
                <span
                  className="z-20 cursor-pointer tracking-widest"
                  onClick={() => (showOptionsId ? setShowOptionsId(null) : setShowOptionsId(record.id))}
                >
                  •••
                </span>
              )}
              {showOptionsId === record.id && (
                <div
                  ref={divRef}
                  className="absolute left-40 top-7 z-20 w-48 rounded-lg border border-black bg-white p-4 text-sm font-bold shadow-lg"
                >
                  <Button
                    color="secondary"
                    className="text-black_main"
                    block={false}
                    onClick={() => setShowInput(true)}
                  >
                    チャットの名前を変更
                  </Button>
                  <Button
                    onClick={() => setDeleteChatFn('singleDelete', record)}
                    color="secondary"
                    className="text-danger"
                    block={false}
                  >
                    チャットを削除
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </li>
      {deleteChat && (
        <ConfirmModal
          isOpen={Boolean(deleteChat)}
          text={deleteChat?.text}
          subText={deleteChat?.subText}
          callback={(confirm) => handleDeleteChat(confirm)}
        />
      )}
    </div>
  );
};
