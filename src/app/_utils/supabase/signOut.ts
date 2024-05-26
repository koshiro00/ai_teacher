import { supabase } from '@/app/_utils/supabase/supabase';

export const signOut = async (): Promise<string | null> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : '予期しないエラーです';
  }
};
