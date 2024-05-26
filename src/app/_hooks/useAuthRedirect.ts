'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

type UseAuthRedirectArgs = {
  isLogin: boolean;
  redirectPath: string;
};
/*
isLogin: true  → ログイン中ならリダイレクト
isLogin: false → ログイン中でなければリダイレクト
*/
export const useAuthRedirect = ({ isLogin, redirectPath }: UseAuthRedirectArgs) => {
  const router = useRouter();
  const { token, isLoading } = useSupabaseSession();

  useEffect(() => {
    if (isLoading) return;
    if (isLogin && token) return router.replace(redirectPath);
    if (!isLogin && !token) return router.replace(redirectPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return { isLoading, token };
};
