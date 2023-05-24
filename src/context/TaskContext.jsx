import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  //Validacion para saber si el contexto existe
  if (!context)
    throw new Error("useTasks must be used within a TaskContextProvider");
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  //adding para controlar el tiempo en actualizar los datos
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  //Consultas y peticiones async
  const getTasks = async (done = false) => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    //Obtencion de la lista Task filtrada por ID de usuarios, orden de la tabla id descendiente
    //compara Donde cuando se recibe por getTasks
    const { error, data } = await supabase
      .from("tasks")
      .select()
      .eq("userid", user.id)
      .eq("done", done)
      .order("id", { ascending: false })


    if (error) throw error;

    setTasks(data);
    setLoading(false);
  };

  const createTask = async (taskName) => {
    setAdding(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error, data } = await supabase
        .from("tasks")
        .insert({
          name: taskName,
          userid: user.id,
        })
        .select();

      if (error) throw error;

      setTasks([...tasks, ...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false);
    }
  };

  const deletTask = async (id) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error, data } = await supabase
      .from("tasks")
      .delete()
      .eq("userid", user.id)
      .eq("id", id)
      .select();

    if (error) throw error;

    setTasks(tasks.filter((task) => task.id !== id));

    console.log(data);
  };

  const updateTask = async (id, updateFields) => {
    const {data:{user}} = await supabase.auth.getUser()

    const {error, data} = await supabase
      .from("tasks").update(updateFields)
      .eq("userid", user.id)
      .eq("id", id)
      .select()
    
      if (error) throw error

    setTasks(tasks.filter(task => task.id !== id))
      
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        adding,
        loading,
        deletTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
