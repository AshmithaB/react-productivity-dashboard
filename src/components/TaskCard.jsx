import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function TaskCard({ task }) {
  const { dispatch } = useContext(AppContext);

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
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
  );
}
