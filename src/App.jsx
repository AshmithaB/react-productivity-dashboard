import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";

function App() {
  const { state } = useContext(AppContext);

  return (
    <div className={state.theme}>
      <Dashboard />
    </div>
  );
}

export default App;
