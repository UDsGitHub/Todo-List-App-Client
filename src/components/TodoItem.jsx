import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const TodoItem = ({ todo, index }) => {
  const { user } = useContext(AppContext);
  const ESCAPE_KEY = 27;
  const ENTER_KEY = 13;
  const { todoList, setTodoList } = useContext(AppContext);
  const [editValue, setEditValue] = useState("");
  const editObj = useRef();

  async function updateTodo(currTodo) {
    try {
      await axios.patch(`/user/${user._id}/updateTodo/${currTodo.id}`, {
        task: currTodo.value,
        completed: currTodo.completed,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTodo(currTodo) {
    try {
      await axios.delete(`/user/${user._id}/deleteTodo/${currTodo.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete(todoIndex) {
    setTodoList(
      todoList.filter((item, currIndex) => {
        if (currIndex !== todoIndex) {
          return item;
        } else {
          deleteTodo(item);
          return;
        }
      })
    );
  }

  function handleComplete(todoIndex) {
    setTodoList(
      todoList.map((item, currIndex) => {
        if (currIndex === todoIndex) {
          updateTodo({ ...item, completed: !item.completed });
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
        todoList.map((item, currIndex) => {
          if (currIndex === todoIndex) {
            updateTodo({ ...item, value: editValue });
            return { ...item, value: editValue };
          } else {
            return item;
          }
        })
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
          onChange={() => handleComplete(index)}
          className="hidden"
        />
        <div
          className="check-icon mr-4 flex items-center justify-center cursor-pointer"
          onClick={() => handleComplete(index)}
        >
          {todo.completed ? (
            <div className="text-xl text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
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
