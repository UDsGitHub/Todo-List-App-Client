import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const [todoList, setTodoList] = useState(todos ? todos : []);

  return (
    <AppContext.Provider value={{ todoList, setTodoList }}>
      {children}
    </AppContext.Provider>
  );
};
