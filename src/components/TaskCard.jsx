import { useTasks } from "../context/TaskContext";

function TaskCard({ task }) {
  const { deletTask, updateTask } = useTasks();

  const handleDelete = () => {
      deletTask(task.id);
  };

  const handleToggleDone = () => {
    updateTask(task.id, {done: !task.done}) // !task.done si la tarea esta en true coloca lo contrario
  };

  return (
    <div className="card card-body text-center my-2 border-info border-2">
      <h1 className="h5">
        {/* {task.id}.{task.name} */}
        {`${task.id}. ${task.name}`}
      </h1>
      <p>
        {/* {JSON.stringify(task.done)} */}
        {task.done ? "Done ✅":"Not Done ❗"}
      </p>

      <div className="ms-auto">
        <button className="btn btn-danger btn-sm me-1" onClick={() => handleDelete()}>Delete</button>
        <button className="btn btn-secondary btn-sm" onClick={() => handleToggleDone()}> Done</button>
      </div>
    </div>
  );
}

export default TaskCard;
