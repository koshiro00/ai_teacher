import axios from 'axios';
import { supabase } from '@/app/_utils/supabase/supabase';
const baseURL = process.env.NEXT_PUBLIC_APP_BASE_URL + '/api';

export const api = axios.create({ baseURL });

// tokenが取得できる状態の場合はAuthrizationに追加
supabase.auth.onAuthStateChange((_event, session) => {
  const token = session?.access_token;
  token
    ? (api.defaults.headers.common['Authorization'] = `Bearer ${token}`)
    : delete api.defaults.headers.common['Authorization'];
});
