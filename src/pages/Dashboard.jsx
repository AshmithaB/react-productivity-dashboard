import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const { dispatch } = useContext(AppContext);
  const [task, setTask] = useState("");

  function addTask() {
    if (task.trim() === "") return;

    dispatch({ type: "ADD_TASK", payload: task });


    setTask("");
  }

  return (
    <div className="dashboard">
      <h1 className="title">Productivity Dashboard</h1>

      <button
        onClick={() => dispatch({ type: "TOGGLE_THEME" })}
        style={{ marginBottom: "20px" }}
      >
        Toggle Theme
      </button>

      <div className="task-input">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTask} disabled={!task.trim()}>
          Add Task
        </button>
      </div>

      {/* ✅ Render TaskCard ONCE */}
      <TaskCard />
    </div>
  );
}
