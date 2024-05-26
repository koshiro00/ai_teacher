import { useFetch } from '@/app/_hooks/useFetch';
import { useParams } from 'next/navigation';
import { ChatMessage, ChatRoom } from '@prisma/client';

type ChatroomWithMessage = ChatRoom & {
  chatMessage: ChatMessage[];
};

export const useChatDeatil = () => {
  const params = useParams<{ id: string }>();
  if (!params) throw Error;
  const chatRoomId = params.id;
  const { data, isValidating, mutate } = useFetch<{ chatRoom: ChatroomWithMessage }>(
    `/chat/room/${chatRoomId}`,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    chatDetail: data?.chatRoom,
    chatMessages: data?.chatRoom.chatMessage,
    isValidatingChatDetail: isValidating,
    mutateChatDetail: mutate,
  };
};
