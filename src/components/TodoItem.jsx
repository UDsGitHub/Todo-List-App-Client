import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const TodoItem = ({ todo, index }) => {
  const ESCAPE_KEY = 27;
  const ENTER_KEY = 13;
  const { todoList, setTodoList } = useContext(AppContext);
  const [editValue, setEditValue] = useState("");
  const editObj = useRef();

  function handleDelete(todoIndex) {
    setTodoList(
      todoList.filter((item, currIndex) => currIndex !== todoIndex && item)
    );
  }

  function handleComplete(todoIndex) {
    setTodoList(
      todoList.map((item, currIndex) => {
        if (currIndex === todoIndex) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      })
    );
  }

  function handleEdit() {
    editObj.current.style.display = "block";
    editObj.current.focus();
  }

  function handleChange(e) {
    setEditValue(e.target.value);
  }

  function handleSubmit(todoIndex) {
    editObj.current.style.display = "none";
    if (editValue !== "") {
      setTodoList(
        todoList.map((item, currIndex) =>
          currIndex === todoIndex ? { ...item, value: editValue } : item
        )
      );
      setEditValue("");
    }
  }

  function handleCancel() {
    setEditValue("");
    editObj.current.style.display = "none";
  }

  function handleKeyDown(e, todoIndex) {
    console.log(e);
    console.log("key pressed down");
    if (e.key === "Enter") {
      console.log("enter key pressed down");
      handleSubmit(todoIndex);
    } else if (e.key === "Escape") {
      console.log("escape key pressed down");
      handleCancel();
    }
  }

  return (
    <div className="todo-item bg-white flex items-center p-2 px-4 border-solid border-b border-slate-300 shadow-md">
      <div className="relative">
        <input
          type="checkbox"
          id={`todo-${index}`}
          checked={todo.completed}
          onClick={() => handleComplete(index)}
          className="hidden"
        />
        <div
          className="check-icon mr-4 flex items-center justify-center cursor-pointer"
          onClick={() => handleComplete(index)}
        >
          {todo.completed ? (
            <FontAwesomeIcon
              icon={faCheck}
              className="text-xl text-green-400"
            />
          ) : null}
        </div>
      </div>
      <label
        htmlFor={`todo-${index}`}
        onDoubleClick={handleEdit}
        style={
          todo.completed
            ? { textDecoration: "line-through", opacity: "0.5" }
            : null
        }
      >
        {todo.value}
      </label>
      <button
        className="block ml-auto delete-btn"
        onClick={() => handleDelete(index)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <input
        type="text"
        ref={editObj}
        onBlur={() => handleSubmit(index)}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, index)}
        value={editValue}
        className="todo-edit"
      />
    </div>
  );
};

export default TodoItem;
