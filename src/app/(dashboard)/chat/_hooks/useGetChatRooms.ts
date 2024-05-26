import { useFetch } from '@/app/_hooks/useFetch';
import { useParams } from 'next/navigation';
import { ChatRoom } from '@prisma/client';

export const useGetChatRooms = () => {
  const params = useParams<{ id: string }>();
  if (!params) throw Error;
  const { data, isValidating, mutate } = useFetch<{ chatRooms: ChatRoom[] }>(`/chat/room/`, {
    revalidateOnFocus: false,
  });

  return {
    chatRooms: data?.chatRooms,
    isValidatingChatRooms: isValidating,
    mutateChatRooms: mutate,
  };
};
