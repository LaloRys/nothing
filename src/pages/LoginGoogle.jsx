import { supabase } from "../supabase/client"


export const LoginGoogle = async () => {
  await supabase.auth.signInWithOAuth({
   provider: "google"
  })
}
