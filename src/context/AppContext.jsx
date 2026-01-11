import { createContext, useReducer,useEffect } from "react";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  theme: localStorage.getItem("theme") || "dark",
};


function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "dark" ? "light" : "dark" };
    default:
      return state;
  }
}

export const AppContext = createContext();

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
      {children}
    </AppContext.Provider>
  );
}
