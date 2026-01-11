import { createContext, useReducer, useEffect } from "react";

export const AppContext = createContext();

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  theme: localStorage.getItem("theme") || "dark",
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.id !== action.payload
        ),
      };

    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  useEffect(() => {
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className={state.theme}>{children}</div>
    </AppContext.Provider>
  );
}
