import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import foodImg from '../assets/images/myRecipe.png'; 

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${foodImg})` }}
    >      
      <div className='flex flex-col justify-center items-center gap-9 md:text-4xl text-xl text-white font-bold md:p-15 p-9 z-10 '>
        <h1>My Recipe Organizer</h1>
        <button
          className='flex justify-center items-center gap-2 rounded-xl md:text-xl text-lg p-3 font-semibold text-white bg-green-600 hover:bg-green-900 hover:shadow-xl cursor-pointer'
          onClick={handleClick}
        >
          <button>Let's get started</button>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Home;
