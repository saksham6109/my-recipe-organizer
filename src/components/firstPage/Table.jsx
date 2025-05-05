import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favouriteSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import NutritionModal from "../NutritionalModal";
import FavouriteRecipeModal from "./FavouriteRecipeModal";
import Button from "../Button";

const Table = ({ meals = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleView = (meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const [selectedNutrition, setSelectedNutrition] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleFavorite = (meal) => dispatch(toggleFavorite(meal));

  const isFavorite = (id) => favorites?.some((fav) => fav.idMeal === id);


let mergedMeals = [...meals, ...favorites].filter(
  (meal, index, self) =>
    meal.idMeal &&
    self.findIndex((m) => m.idMeal === meal.idMeal) === index 
);


  const filteredMeals = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return mergedMeals.filter((meal) => {
      const mealName = meal?.strMeal?.toLowerCase() || "";
      const mealCategory = meal?.strCategory?.toLowerCase() || "";
      return mealName.includes(lowerSearch) || mealCategory.includes(lowerSearch);
    });
  }, [searchTerm, mergedMeals]);
  

  const sortedMeals = useMemo(() => {
    let mealsToSort = [...filteredMeals];
    if (sortConfig.key) {
      mealsToSort.sort((a, b) => {
        const aValue = a[sortConfig.key]?.toLowerCase() || "";
        const bValue = b[sortConfig.key]?.toLowerCase() || "";
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return mealsToSort;
  }, [filteredMeals, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold px-7 mb-4">All Recipes Table</h2>

      <div className="flex items-center justify-between px-6 mb-4">
        <input
          type="text"
          placeholder="Search by name or category..."
          className="border rounded px-3 py-2 w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div></div>
      </div>

      <div className="overflow-x-auto px-6 h-[500px] mb-10">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="bg-gray-200 sticky top-0 z-30 text-left">
            <tr>
              <th className="p-3 text-center">Favourites</th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("strMeal")}
              >
                Name{" "}
                {sortConfig.key === "strMeal" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-3  ">Ingridients</th>
              <th
                className="p-3  cursor-pointer"
                onClick={() => handleSort("strCategory")}
              >
                Category{" "}
                {sortConfig.key === "strCategory" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedMeals.map((meal) => (
              <tr
                key={meal.idMeal}
                className='border-t hover:bg-gray-50 text-left'
              >
                <td className="p-3 text-center">
                  <button onClick={() => handleFavorite(meal)}>
                    {isFavorite(meal.idMeal) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </td>

                <td className="p-3 ">{meal.strMeal}</td>
                <td className="relative px-4 py-2 max-w-[150px]">
                  <div className="group inline-block w-full">
                    <span className="block truncate w-full">
                      {Array.from({ length: 5 })
                        .map((_, i) => meal[`strIngredient${i + 1}`])
                        .filter(Boolean)
                        .join(", ")}
                    </span>

                    <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white border border-gray-300 p-2 rounded-md shadow-lg w-max max-w-[300px] text-sm z-10">
                      {Array.from({ length: 5 })
                        .map((_, i) => meal[`strIngredient${i + 1}`])
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  </div>
                </td>

                <td className="p-3 ">{meal.strCategory || "N/A"}</td>
                <td className="flex flex-wrap px-4 py-2 space-x-2">
                  <Button
                    onClick={() => handleView(meal)}
                    text="View"
                  />
                  <Button
                    onClick={() =>
                      setSelectedNutrition({
                        protein: Math.floor(Math.random() * 30),
                        carbs: Math.floor(Math.random() * 50),
                        fats: Math.floor(Math.random() * 20),
                      })
                    }
                     text = "Nutri Info"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FavouriteRecipeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        meal={selectedMeal}
      />

      {selectedNutrition && (
        <NutritionModal
          nutrition={selectedNutrition}
          onClose={() => setSelectedNutrition(null)}
        />
      )}
    </div>
  );
};

export default Table;
