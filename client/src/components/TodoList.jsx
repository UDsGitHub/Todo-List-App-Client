import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todoList } = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div>
      {todoList.map((item, key) => (
        <TodoItem todo={item} index={key} key={key} />
      ))}
    </div>
  );
};

export default TodoList;
