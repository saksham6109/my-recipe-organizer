import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./firstPage/Header";
import Favourite from "./firstPage/Favourite";
import Table from "./firstPage/Table";
import Popular from "./firstPage/Popular";
import Sidebar from "./firstPage/Sidebar";

const Dashboard = () => {
  const [meals, setMeals] = useState([]);
  const favourites = useSelector((state) => state.favorites); 

  const apiFavourites = favourites.filter((meal) => meal.idMeal);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Meals:", data.meals);
        setMeals(data.meals);
      });
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-white shadow-md sticky z-50">
        <Sidebar />
      </div>

      <div className="w-4/5 bg-blue-50 px-4 py-6 space-y-4 overflow-y-auto">
        <Header />
        <Popular />

        {apiFavourites.length > 0 && <Favourite />}

        <Table meals={meals} />
      </div>
    </div>
  );
};

export default Dashboard;
