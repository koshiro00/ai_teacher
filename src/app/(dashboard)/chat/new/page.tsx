'use client';
import React from 'react';
import { Textarea } from '@/app/_components/elements/Textarea';
import { useNewChat } from '@/app/(dashboard)/chat/new/_hooks/useNewChat';

export default function Page() {
  const { textareaRef, setIsComposing, handleKeyDown } = useNewChat();

  return (
    <div className="mx-auto w-[600px]">
      <div>
        <Textarea
          ref={textareaRef}
          variant={'primary'}
          placeholder="AIにチャットを送る"
          position="bottomFixed"
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={handleKeyDown}
          autoHeight
        />
      </div>
    </div>
  );
}
