import React from 'react';
import { useFetch } from '@/app/_hooks/useFetch';
import { Profile } from '@prisma/client';

export const useProfile = () => {
  const { data, isValidating, mutate } = useFetch<{ profile: Profile }>(`/user/me`, {
    revalidateOnFocus: false,
  });

  return {
    profile: data?.profile,
    isValidatingProfile: isValidating,
    mutateProfile: mutate,
  };
};
