import { supabase } from "../supabase/client"


export const LoginGithub = async () => {
  await supabase.auth.signInWithOAuth({
   provider: "github"
  })
}
