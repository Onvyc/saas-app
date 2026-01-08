import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

export default async function createSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      async accessToken() {
        return (await auth()).getToken();
      },
    }
  );
}

//console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
//console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY);
