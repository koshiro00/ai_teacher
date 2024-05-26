import { SignInArgs } from '@/app/_types/signInArgs';
import { AuthError, Session } from '@supabase/supabase-js';
import { supabase } from '@/app/_utils/supabase/supabase';

type SignInResult = {
  session?: Session | null;
  error?: AuthError | null;
};

export const signIn = async ({ email, password }: SignInArgs): Promise<SignInResult> => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { session, error };
  } catch (error) {
    console.error('予期しないエラー：', error);
    // 予期しないエラーの場合はnullを返す
    return { error: null };
  }
};
