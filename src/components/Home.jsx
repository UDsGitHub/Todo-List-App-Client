import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const Home = () => {
  const {user, ready} = useContext(AppContext)
  const navigate = useNavigate()

  if (!ready) return <p>Loading...</p>;

  // if user isnt logged in... send them to login page from Home
  if ((!ready && !user) || (ready && !user)) {
    console.log("user not logged in");
    navigate("/login")
  }

  return (
    <>
      <TodoInput />
      <TodoList />
      <br />
      <br />
      <div className="text-center text-sm text-gray-400">
        <p className='text-sm'>
          Click to mark a todo as complete
        </p>
        <p className='text-sm'>
          Double click to edit a todo
        </p>
        <p className='text-sm mt-4'>
          Created by Udochukwu Amaefule
        </p>
      </div>
    </>
  );
}

export default Home