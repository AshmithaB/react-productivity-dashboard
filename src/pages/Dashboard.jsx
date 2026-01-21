import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import TaskCard from "../components/TaskCard";
import Stats from "../components/Stats";
import Timer from "../components/Timer";


export default function Dashboard() {
  const { state, dispatch } = useContext(AppContext);
  const [task, setTask] = useState("");

  function addTask() {
    if (task.trim() === "") return;
    dispatch({ type: "ADD_TASK", payload: task });
    setTask("");
  }
   const filteredTasks = state.tasks.filter((task) => {
  if (state.filter === "active") return !task.completed;
  if (state.filter === "completed") return task.completed;
  return true; // all
});

  return (
    <div className="dashboard">
      <h1 className="title">Productivity Dashboard</h1>

      <button
        onClick={() => dispatch({ type: "TOGGLE_THEME" })}
        style={{ marginBottom: "20px" }}
      >
        Toggle Theme
      </button>
        <Timer />

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
    

      <Stats />
      <div className="filters">
  {["all", "active", "completed"].map((type) => (
    <button
      key={type}
      className={`filter-btn ${
        state.filter === type ? "active-filter" : ""
      }`}
      onClick={() =>
        dispatch({ type: "SET_FILTER", payload: type })
      }
    >
      {type.toUpperCase()}
    </button>
  ))}
</div>

<div className="task-list">
  {state.tasks.length === 0 && <p>No tasks added yet</p>}

  {state.tasks.map((task) => (
    <TaskCard key={task.id} task={task} />
  ))}
</div>

      </div>
  );
}
