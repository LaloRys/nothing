import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

function TaskList({done = false}) {
  

  const { tasks, getTasks, loading } = useTasks();
  // console.log(tasks);

  useEffect(() => {
    getTasks(done);

  }, [done]); // [done, getTasks] se dispara si estados depencias cambian

  function renderTasks() {
   if (loading) {
      return <p>Loading...</p>;
    } else if (tasks.length === 0) {
      return <p>No task Found</p>;
    } else {
      return (
        <div>
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id}/>
          ))}
        </div>
      );
    }
  }

  return <div>
   {renderTasks()}
  </div>
}

export default TaskList;
