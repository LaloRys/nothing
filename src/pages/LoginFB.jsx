import { supabase } from "../supabase/client"


export const LoginFB = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'facebook',
  })
}
