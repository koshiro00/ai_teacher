import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/app/_hooks/useProfile';
import { signOut } from '@/app/_utils/supabase/signOut';
import { useDelete } from './base/useDelete';
import { useOutsideClick } from './base/useOutSideClick';

export const useProfileOption = () => {
  const router = useRouter();
  const { profile, isValidatingProfile } = useProfile();
  const [hovered, setHovered] = useState<boolean>(false);
  const [showOption, setShowOption] = useState<boolean>(false);
  const { divRef, isClickedOutside } = useOutsideClick();
  const { deleteChat, setDeleteChatFn, handleDeleteChat } = useDelete();

  const handleSignOut = async () => {
    const result = await signOut();
    if (!result) router.replace('/login');
  };

  useEffect(() => {
    if (isClickedOutside) {
      setHovered(false);
      setShowOption(false);
    }
  }, [isClickedOutside]);

  return {
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
  };
};
