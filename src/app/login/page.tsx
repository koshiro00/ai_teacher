'use client';
import { useAuthRedirect } from '@/app/_hooks/useAuthRedirect';
import { REDIRECT_PATHS } from '@/app/_constants/path';
import { useLoginForm } from '@/app/_hooks/useLoginForm';
import Image from 'next/image';
import { TextInput } from '@/app/_components/elements/TextInput';
import { Button } from '@/app/_components/elements/Button';

export default function Page() {
  const { isLoading, token } = useAuthRedirect({ isLogin: true, redirectPath: REDIRECT_PATHS.authenticated });
  const { register, handleSubmit, errors, isSubmitting } = useLoginForm();

  if (!isLoading && !token)
    return (
      <div className="flex h-screen w-screen justify-center">
        <div className="flex w-1/2 flex-col items-center justify-center bg-gray_bg">
          <p className="pb-4 text-xl font-bold tracking-[3px]">
            <span className="text-[22px] tracking-[5px]">AI</span>先生
          </p>
          <Image
            src="/images/bube_icon.png"
            priority={true}
            alt="AIのアイコン"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <form className="flex w-1/2 items-center justify-center" onSubmit={handleSubmit}>
          <div className="w-[427px]">
            <TextInput
              label="メールアドレス"
              type="email"
              id="email"
              {...register('email')}
              name="email"
              placeholder="example@example.com"
              variant="primary"
              autoComplete="email"
              className={`${!errors.email && 'mb-8'}`}
            />
            {errors.email && <p className="mb-8 text-sm text-danger">{errors.email.message}</p>}

            <TextInput
              label="パスワード"
              type="password"
              id="password"
              {...register('password')}
              name="password"
              placeholder="••••••••"
              variant="primary"
              autoComplete="current-password"
            />
            {errors.password && <p className="text-sm text-danger">{errors.password.message}</p>}

            <Button color="primary" block className="mt-12" type="submit" disabled={isSubmitting}>
              ログイン
            </Button>
          </div>
        </form>
      </div>
    );
}
