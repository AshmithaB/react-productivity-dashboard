import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const { state, dispatch } = useContext(AppContext);
  const [task, setTask] = useState("");

  function addTask() {
    dispatch({ type: "ADD_TASK", payload: task });
    setTask("");
  }

  return (
    <>
      <h1>Productivity Dashboard</h1>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTask}>Add Task</button>

      {state.tasks.map((t, i) => (
        <TaskCard key={i} task={t} />
      ))}
    </>
  );
}
