import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";

export default function Stats() {
  const { state } = useContext(AppContext);

  const { total, completed, pending } = useMemo(() => {
    const total = state.tasks.length;
    const completed = state.tasks.filter(t => t.completed).length;
    const pending = total - completed;

    return { total, completed, pending };
  }, [state.tasks]);

  return (
    <div className="stats">
      <div className="stat-box">
        <h3>Total</h3>
        <p>{total}</p>
      </div>

      <div className="stat-box">
        <h3>Completed</h3>
        <p>{completed}</p>
      </div>

      <div className="stat-box">
        <h3>Pending</h3>
        <p>{pending}</p>
      </div>
    </div>
  );
}
