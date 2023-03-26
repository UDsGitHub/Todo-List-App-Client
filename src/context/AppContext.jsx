import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // const todos = JSON.parse(localStorage.getItem("todos"));
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    if (!user) {
      axios
        .get("/user")
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        })
        .catch((err) => {
          console.log(err);
          setReady(true);
        });
    }
    if (user) {
      axios
        .get(`/user/${user._id}/getTodos`)
        .then(({ data }) =>
          setTodoList(
            data.map((item) => ({
              id: item._id,
              value: item.task,
              completed: item.completed,
            }))
          )
        )
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser, ready, todoList, setTodoList }}>
      {children}
    </AppContext.Provider>
  );
};
