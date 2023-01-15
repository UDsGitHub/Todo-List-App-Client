import "./App.css";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <div className="App px-4">
      <Navbar />
      {/* Todo entry */}
      <AppProvider>
        <div className="mt-12">
          <TodoInput />
          <TodoList />
        </div>
      </AppProvider>
      <br />
      <br />
      <div className="text-center text-sm text-gray-400">
        <p>
          <small>Click to mark a todo as complete</small>
        </p>
        <p>
          <small>Double click to edit a todo</small>
        </p>
        <p>
          <small>Created by Udochukwu Amaefule</small>
        </p>
      </div>
    </div>
  );
}

export default App;
