import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { SignInArgs } from '@/app/_types/signInArgs';
import { signIn } from '@/app/_utils/supabase/signIn';
import { api } from '@/app/_utils/api';

const schema = z.object({
  email: z.string().min(1, { message: 'メールアドレスは必須です' }).email({ message: '無効なメールアドレスです' }),
  password: z.string().min(1, { message: 'パスワードは必須です' }),
});

export const useLoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInArgs>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: SignInArgs): Promise<void> => {
    const result = await signIn(data);
    if (!result || result.error) return window.alert('ログインに失敗しました');

    //Profile未登録なら登録
    const response = await api.post('/user/me', '', {
      headers: {
        Authorization: `Bearer ${result.session?.access_token}`,
      },
    });
    ///既に登録済み or 登録完了 → リダイレクト
    if (response.data.status === 400 || response.data.status === 'OK') {
      return router.push('/chat/new');
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};
