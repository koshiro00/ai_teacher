// import { useState } from 'react';
// import { api } from '@/app/_utils/api';

// type HandleDelete = {
//   text: string;
//   subText: string;
//   recordId?: string;
// };

// export const useDeleteMessage = (chatRoomId: string) => {
//   const [deleteMessage, setDeleteMessage] = useState<HandleDelete | null>(null);

//   const handleDeleteMessage = async (confirm: boolean) => {
//     if (!confirm || !deleteMessage) return setDeleteMessage(null);
//     const result = await api.delete(`/chat/room/${chatRoomId}/messages/${deleteMessage.recordId}`);
//     setDeleteMessage(null);
//     if (result.data.status === 'OK') {
//     }
//   };

//   return {
//     deleteMessage,
//     setDeleteMessage,
//     handleDeleteMessage,
//   };
// };
