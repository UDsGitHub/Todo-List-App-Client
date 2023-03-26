import axios from "axios";
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const TodoInput = () => {
  const { user } = useContext(AppContext);
  const [todo, setTodo] = useState({ id: null, value: "", completed: false });
  const { todoList, setTodoList } = useContext(AppContext);
  const [allTrue, setAllTrue] = useState(false);

  async function updateTodo(currTodo) {
    try {
      await axios.patch(`/user/${user._id}/${currTodo.id}/updateTodo`, {
        task: currTodo.value,
        completed: currTodo.completed
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (todo.value !== "") {
      try {
        const res = await axios.post(`/user/${user._id}/addTodo`, {
          task: todo.value,
        });
        setTodoList([...todoList, { ...todo, id: res.data._id }]);
      } catch (error) {
        console.log(error);
      }
      setTodo({ id: null, value: "", completed: false });
    }
    console.log("form submitted");
  }

  function handleSelectAll() {
    // update local todolist
    setTodoList(todoList.map((item) => ({ ...item, completed: !allTrue })));
    // update db todolist
    todoList.forEach(item => updateTodo({...item, completed: !allTrue}));

    todoList.length > 0 && setAllTrue((prev) => !prev);
  }

  return (
    <div className="input-container bg-white flex gap-4 items-center p-4 shadow-md">
      <button onClick={handleSelectAll}>
        <div className="select-all-icon cursor-pointer">
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
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
