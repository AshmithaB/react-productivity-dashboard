import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function TaskCard({ task }) {
  const { state, dispatch } = useContext(AppContext);

  const isActive = state.activeTaskId === task.id;
  const isAnotherTaskActive =
    state.activeTaskId && !isActive;

  return (
    <div
      className={`task-card 
        ${task.completed ? "completed" : ""} 
        ${isActive ? "active-task" : ""}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        disabled={isActive}
        onChange={() =>
          dispatch({ type: "TOGGLE_TASK", payload: task.id })
        }
      />

      <span>{task.text}</span>

      {!task.completed && (
        <button
          onClick={() =>
            dispatch({ type: "START_TASK", payload: task.id })
          }
          disabled={isAnotherTaskActive}
        >
          {isActive ? "In Focus" : "Start"}
        </button>
      )}

      <button
        className="delete-btn"
        disabled={isActive}
        onClick={() =>
          dispatch({ type: "DELETE_TASK", payload: task.id })
        }
      >
        ✕
      </button>
    </div>
  );
}
