import { createContext, useReducer, useEffect } from "react";

export const AppContext = createContext();

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  theme: localStorage.getItem("theme") || "dark",
  filter: "all",
  activeTaskId: null, // ⭐ NEW
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
    case "SET_FILTER":
        return {
          ...state,
           filter: action.payload,
        };


    case "TOGGLE_TASK":
  if (state.activeTaskId === action.payload) return state;
  return {
    ...state,
    tasks: state.tasks.map(task =>
      task.id === action.payload
        ? { ...task, completed: !task.completed }
        : task
    ),
  };

case "DELETE_TASK":
  return {
    ...state,
    tasks: state.tasks.filter(task => task.id !== action.payload),
    activeTaskId:
      state.activeTaskId === action.payload
        ? null
        : state.activeTaskId,
  };


    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };
      case "START_TASK":
  return {
    ...state,
    activeTaskId: action.payload,
  };

case "FINISH_TASK":
  return {
    ...state,
    tasks: state.tasks.map(task =>
      task.id === state.activeTaskId
        ? { ...task, completed: true }
        : task
    ),
    activeTaskId: null,
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
    document.body.className = state.theme;
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
