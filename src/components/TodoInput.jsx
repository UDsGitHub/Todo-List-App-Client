import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const TodoInput = () => {
  const [todo, setTodo] = useState({ value: "", completed: false });
  const { todoList, setTodoList } = useContext(AppContext);
  const [allTrue, setAllTrue] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.value !== "") {
      setTodoList([...todoList, todo]);
      setTodo({ value: "", completed: false });
    }
    console.log("form submitted");
  }

  function handleSelectAll() {
    setTodoList(
      todoList.map((item) =>
        !allTrue ? { ...item, completed: true } : { ...item, completed: false }
      )
    );
    todoList.length > 0 && setAllTrue((prev) => !prev);
  }

  return (
    <div className="input-container bg-white flex gap-4 items-center p-4 shadow-md">
      <button onClick={handleSelectAll}>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="select-all-icon cursor-pointer"
          color="#78909c"
        />
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What needs to be done?"
          className="outline-none text-xl w-full"
          value={todo.value}
          onChange={(e) => setTodo({ value: e.target.value, completed: false })}
        />
      </form>
    </div>
  );
};

export default TodoInput;
