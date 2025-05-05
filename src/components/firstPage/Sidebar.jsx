import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { GiCookingPot, GiNotebook } from 'react-icons/gi';
import logoImg from '../../assets/images/images.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-full flex flex-col p-4 bg-white  space-y-4">
      
      <div className='flex items-center gap-2 cursor-pointer text-green-600' onClick={() => navigate("/")}>
  <img src={logoImg} alt="Logo" className="w-70 h text-left rounded-full object-contain" />
  
</div>


      <button
        onClick={() => navigate('/dashboard')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md mt-5 ${
          isActive('/dashboard') ? 'bg-green-600 text-white' : 'hover:bg-gray-100'
        }`}
      >
        <GiCookingPot className="text-xl" />
        Recipes
      </button>

      <button
        onClick={() => navigate('/myrecipes')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md ${
          isActive('/myrecipes') ? 'bg-green-600 text-white' : 'hover:bg-gray-100'
        }`}
      >
        <GiNotebook className="text-xl" />
        My Recipes
      </button>
    </div>
  );
};

export default Sidebar;
