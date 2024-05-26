import { supabase } from '@/app/_utils/supabase/supabase';
import { NextRequest } from 'next/server';

/* tokenが検証できればuser情報を返す */
export const getCurrentUser = async (request: NextRequest) => {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  return await supabase.auth.getUser(token);
};
