import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskForm() {
  const [taskName, setTaskName] = useState("");

  const {createTask, adding } = useTasks()

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTask(taskName)
    //para regresar su estado en blanco
    setTaskName("")
    
  };

  return (

      <form onSubmit={handleSubmit} className="card card-budy p-2 border-secondary border-3">
        <input
          type="text"
          name="taskName"
          placeholder="Write a task name"
          onChange={(e) => setTaskName(e.target.value)}
          // limpiar el input
          value={taskName}
          className="form-control mb-2"
        />
        {/* Operadores disable si es true, operador terneario en adding para validar adding ? (is true) "Adding..." : "Add" */}
        <div className="ms-auto">
          <button disabled={adding} className="btn btn-primary btn-sm">
            {adding ? "Adding..." : "Add" }</button>
        </div>
      </form>
    
  );
}

export default TaskForm;
