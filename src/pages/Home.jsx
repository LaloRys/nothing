import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import { chatGpt } from "../assets/ChatGpt";
import { useTasks } from "../context/TaskContext";

import FaceIcon from "@mui/icons-material/Face";

export function Home() {
  const {} = useTasks();

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [showTaskDone, setShowTaskDone] = useState(false);

  useEffect(() => {
    const session = async () => {
      const { data: {user} } = await supabase.auth.getUser()
      setUser(user)
    };

    session();

    if (!session) {
      navigate("/Login");
      console.log("Home", session, event);
    }
    //   supabase.auth.onAuthStateChange((event, session) => {
    //     setUser(session?.user);
    //     if (!session) {
    //       navigate("/Login");
    //       console.log("Home", session, event);
    //     }
    //   });
  }, [navigate]);

  const getSession = async () => {
    // const { error, data } = await supabase.auth.getUser();
    console.log("dataUser: ", user, "Error: ", );
  };

  return (
    <div className="row pt-4">
      <div className="col-md-4 offset-md-4">
        <div className="text-center">
          <img
            src={user?.user_metadata.avatar_url} referrerPolicy="no-referrer"
            className="border border-3 border-info rounded-pill"
          />
          <p className="fw-bold font-monospace bg-dark text-light bg-opacity-80 my-2 rounded">
            Hello {user?.user_metadata.name}
          </p>
        </div>

        <TaskForm />

        <header className="d-flex justify-content-between my-3">
          <span className="h5">
            {showTaskDone ? "Task Done:" : "Task to do:"}
          </span>
          {/* !showTaskDone //Colocar lo contario*/}
          <button
            className="btn btn-dark btn-sm"
            onClick={() => setShowTaskDone(!showTaskDone)}
          >
            {showTaskDone ? "Show tasks to do" : "Show tasks done"}
          </button>
        </header>

        <TaskList done={showTaskDone} />

        <div className="text-center">
          <button className="btn btn-dark my-2" onClick={getSession}>
            
            <FaceIcon /> Obtener al usuario
          </button>
        </div>
      </div>
    </div>
  );
}
