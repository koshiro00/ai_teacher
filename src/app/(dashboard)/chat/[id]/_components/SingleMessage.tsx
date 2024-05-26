import React, { ComponentProps } from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import reactGfm from 'remark-gfm';
import { CodeBlock } from '@/app/(dashboard)/chat/[id]/_components/CodeBlock';
import classes from '@/app/(dashboard)/chat/[id]/_components/style/markdown.module.css';

import Flashing from '@/app/_components/layouts/loading/Flashing';
import { ConfirmModal } from '@/app/_components/layouts/ConfirmModal';
import { CopyButton } from '@/app/(dashboard)/chat/[id]/_components/CopyButton';
import { TrashButton } from '@/app/(dashboard)/chat/[id]/_components/TrashButton';

type SingleMessageProps = ComponentProps<'div'> & {
  role: string;
  message: string;
  messageId?: string;
  isLoadState?: {
    realtimeEmpty: boolean;
    responseStatus: 'loading' | 'none' | 'end';
  };
  deleteMessage?: {
    text: string;
    subText: string;
    recordId?: string;
  } | null;
  setDeleteMessage?: (deleteMessage: any) => void;
  handleDeleteMessage?: (confirm: boolean) => Promise<void>;
};

export const SingleMessage: React.FC<SingleMessageProps> = ({
  role,
  message,
  messageId,
  isLoadState,
  deleteMessage,
  setDeleteMessage = () => {},
  handleDeleteMessage = () => Promise.resolve(),
}) => {
  const isClient = role === 'user';
  return (
    <>
      <div className="flex items-center justify-start">
        <div className={`h-6 w-6 rounded-full ${isClient ? 'bg-input_main' : 'bg-[#40B18F]'}`}></div>
        <div className="ml-2 pb-[2px]">{isClient ? 'あなた' : 'AI'}</div>
      </div>
      <div className="ml-8 mt-2 w-[568px]">
        {isClient ? (
          <p className="whitespace-pre-wrap text-base">{message}</p>
        ) : isLoadState?.realtimeEmpty ? (
          <Flashing className="ml-1 mt-4" />
        ) : (
          <div className={`${classes.aiResponse}`}>
            <Markdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[reactGfm]}
              components={CodeBlock}
              className="m-auto mt-5 max-w-4xl text-base leading-7"
            >
              {message}
            </Markdown>
          </div>
        )}
        {isLoadState?.responseStatus !== 'loading' && (
          <div className={`${isClient ? 'mt-[18px]' : 'mt-3'} flex items-center`}>
            <CopyButton textToCopy={message} />
            <TrashButton
              onClick={() =>
                setDeleteMessage({
                  text: message,
                  subText: '下記のメッセージを削除しますか',
                  recordId: messageId,
                })
              }
              className="mb-[2px] ml-2"
            />
          </div>
        )}
        {deleteMessage && deleteMessage.recordId === messageId && (
          <ConfirmModal
            isOpen={Boolean(deleteMessage)}
            callback={handleDeleteMessage}
            text={deleteMessage.text}
            subText={deleteMessage.subText}
          />
        )}
      </div>
    </>
  );
};
