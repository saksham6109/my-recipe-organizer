import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-[10%] w-full z-50 bg-white  py-4 flex justify-center items-center">
      <h1 className="text-3xl font-extrabold text-center">My Recipe Organizer</h1>
    </div>
  );
};

export default Header;
