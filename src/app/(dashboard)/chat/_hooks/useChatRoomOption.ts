import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useChatRedirect } from './base/useRedirect';
import { useOutsideClick } from './base/useOutSideClick';
import { useNameChange } from './base/useNameChange';
import { useDelete } from './base/useDelete';

export const useChatRoomControl = (chatRoomId: string) => {
  const params = useParams<{ id: string }>();
  const nowRoom = chatRoomId === params?.id; //表示中チャットルーム

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showOptionsId, setShowOptionsId] = useState<string | null>(null);

  const { handleRedirect } = useChatRedirect();
  const { divRef, inputRef, isClickedOutside } = useOutsideClick();
  const { showInput, setShowInput, setIsComposing, handleNameChange } = useNameChange();
  const { deleteChat, setDeleteChatFn, handleDeleteChat } = useDelete();

  useEffect(() => {
    if (isClickedOutside || showInput) {
      setHoveredId(null);
      setShowOptionsId(null);
    }
  }, [isClickedOutside, showInput]);

  useEffect(() => {
    if (showInput && inputRef.current) inputRef.current.focus();
  }, [showInput]);

  return {
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
  };
};
