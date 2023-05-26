import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {Login} from "./pages/Login";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { supabase } from "./supabase/client";
import { TaskContextProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/Login");
        console.log("App Desconectado",session, event)
      } else {
        navigate("/");
        console.log("App Conectado",session, event)
      }
    })

    }, []);

    
  return (
    <div className="App">
      <TaskContextProvider>
        <Navbar/>

        <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
        </div>
      </TaskContextProvider>
    </div>
  );
}

export default App;
