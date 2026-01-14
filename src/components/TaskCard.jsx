import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function TaskCard() {
  const { state, dispatch } = useContext(AppContext);

  // Apply filter logic
  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === "active") return !task.completed;
    if (state.filter === "completed") return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return <p>No tasks to display</p>;
  }

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className={`task-card ${task.completed ? "completed" : ""}`}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() =>
              dispatch({ type: "TOGGLE_TASK", payload: task.id })
            }
          />

          <span>{task.text}</span>

          <button
            className="delete-btn"
            onClick={() =>
              dispatch({ type: "DELETE_TASK", payload: task.id })
            }
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
