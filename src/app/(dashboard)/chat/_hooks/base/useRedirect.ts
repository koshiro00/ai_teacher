import { useParams, useRouter } from 'next/navigation';

export const useChatRedirect = () => {
  const params = useParams();
  const router = useRouter();

  const handleRedirect = (redirectRoomId: string) => {
    const roomIdInUrl = params?.id;
    if (roomIdInUrl === redirectRoomId) return;
    router.push(`/chat/${redirectRoomId}`);
  };

  return {
    handleRedirect,
  };
};
