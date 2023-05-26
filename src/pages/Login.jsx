import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { LoginGoogle } from "./LoginGoogle";
import { LoginFB } from "./LoginFB";
import { LoginGithub } from "./LoginGitHub";

import FaceIcon from '@mui/icons-material/Face';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';


export function Login() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      supabase.auth.signInWithOtp({
        email,
      });
      console.log("Enviado");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user);
      if (user) {
        navigate("/");
        console.log("Login usuario conectado");
      }
    });
  }, [navigate]);

  const getuser = async () => {
    // const {data:{session}} = await supabase.auth.getSession()
    console.log("user data :", { user });
  };

  return (
    <div className="row pt-4">
      <div className="col-md-4 offset-md-4">
      <form onSubmit={handleSubmit} className="card card-body">
        <input
          type="email"
          name="email"
          placeholder="youremail@site.com"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
        />
        <button className="btn btn-primary">Send</button>
      </form>
      </div>

      <div>
        <button onClick={LoginGoogle} className="col-md-4 offset-md-4 mt-4 btn btn-danger">
        <GoogleIcon/> Login with Google</button>

        <button onClick={LoginFB} className="col-md-4 offset-md-4 mt-4 btn btn-primary">
        <FacebookIcon/> Login with FaceBook</button>

        <button onClick={LoginGithub} className="col-md-4 offset-md-4 mt-4 btn btn-dark">
        <GitHubIcon/> Login with GitHub</button>
      </div>

      
      <div>
        <button onClick={getuser} className="col-md-4 offset-md-4 mt-4 btn btn-dark">
        <FaceIcon/> Obtener usuario</button> 
          
      </div>
    </div>
  );
}
