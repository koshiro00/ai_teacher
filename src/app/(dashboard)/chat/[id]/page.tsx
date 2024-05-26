'use client';
import { useSocketChat } from '@/app/(dashboard)/chat/[id]/_hooks/useSocketChat';
import { SingleMessage } from '@/app/(dashboard)/chat/[id]/_components/SingleMessage';
import { Textarea } from '@/app/_components/elements/Textarea';
import { ScrollButton } from './_components/ScrollButton';

export default function Page() {
  const {
    chatDetail,
    messages,
    realtimeMessage,
    aiResponseState,
    textareaRef,
    messagesEndRef,
    setIsComposing,
    handleKeyDown,
    deleteMessage,
    setDeleteMessage,
    handleDeleteMessage,
    inView,
  } = useSocketChat();

  return (
    <div className="relative mx-auto w-[600px]">
      {chatDetail && messages && (
        <div className="w-[512px]">
          <ul className="mt-10">
            {messages?.map((record, index) => (
              <li key={index} className="mb-10">
                <SingleMessage
                  deleteMessage={deleteMessage}
                  setDeleteMessage={setDeleteMessage}
                  handleDeleteMessage={handleDeleteMessage}
                  role={record.role}
                  message={record.content}
                  messageId={record.id}
                />
              </li>
            ))}

            {aiResponseState === 'loading' && realtimeMessage.length > 0 && (
              <SingleMessage
                role="system"
                message={realtimeMessage.join('')}
                isLoadState={{
                  realtimeEmpty: realtimeMessage.length === 0,
                  responseStatus: aiResponseState,
                }}
              />
            )}
            {/* 最下部設定用の空要素 */}
            <div ref={messagesEndRef} className="pt-32" />
          </ul>
        </div>
      )}
      {!inView && chatDetail && (
        <ScrollButton
          onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="fixed bottom-[100px] flex w-[600px] justify-center text-black_main"
        />
      )}
      <Textarea
        ref={textareaRef}
        variant="primary"
        placeholder="AIにチャットを送る"
        position="bottomFixed"
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyDown={handleKeyDown}
        autoHeight
      />
    </div>
  );
}
