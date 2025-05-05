import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMyOwnFavorite } from "../../redux/myOwnRecipeFavouriteSlice";
import { setEditModalOpen } from "../../redux/recipeSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CreateRecipeModal from "./CreateRecipeModal";
import FavouriteRecipeModal from "./FavouriteRecipeModal";
import NutritionModal from "../NutritionalModal";
import Button from "../Button";

const MyOwnRecipeTable = () => {
  const createdRecipes = useSelector((state) => state.recipes?.createdRecipes || []);
  const favorites = useSelector((state) => state.myOwnFavorites || []);
  const isEditModalOpen = useSelector((state) => state.recipes?.isEditModalOpen);
  const dispatch = useDispatch();

  const [viewRecipe, setViewRecipe] = useState(null);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const isFavorite = (id) => favorites?.some((fav) => fav.id === id);
  const handleFavorite = (recipe) => dispatch(toggleMyOwnFavorite(recipe));

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredRecipes = useMemo(() => {
    return createdRecipes.filter(
      (r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, createdRecipes]);

  const sortedRecipes = useMemo(() => {
    const sorted = [...filteredRecipes];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const aVal = a[sortConfig.key]?.toLowerCase?.() || "";
        const bVal = b[sortConfig.key]?.toLowerCase?.() || "";
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }
    return sorted;
  }, [filteredRecipes, sortConfig]);

  return (
    <div className="mt-15 px-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">My Recipes</h2>
        <Button
          onClick={() => dispatch(setEditModalOpen(true))}
          text="Create Your Own Recipe"
        />
      </div>

      <input
        type="text"
        placeholder="Search by name or category..."
        className="border px-3 py-2 rounded mb-4 w-full max-w-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {createdRecipes.length === 0 ? (
        <div className="h-[200px] bg-white flex items-center justify-center">
          <p className="text-gray-600 text-center text-2xl">
            You haven't created any recipes yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg max-h-[500px] mb-10">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead className="bg-gray-200 sticky top-0 z-20">
              <tr>
                <th className="p-3 text-center">Favourites</th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th className="p-3 text-left">Ingredients</th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("category")}
                >
                  Category {sortConfig.key === "category" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {sortedRecipes.map((recipe, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 text-center">
                    <button onClick={() => handleFavorite(recipe)}>
                      {isFavorite(recipe.id) ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                  </td>
                  <td className="p-3 font-medium">{recipe.name}</td>

                  <td className="relative px-4 py-2 max-w-[150px]">
                    <div className="group inline-block w-full">
                      <span className="block truncate w-full">
                        {recipe.ingredients.join(", ")}
                      </span>
                      <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white border border-gray-300 p-2 rounded-md shadow-lg w-max max-w-[300px] text-sm z-50">
                        {recipe.ingredients.join(", ")}
                      </div>
                    </div>
                  </td>

                  <td className="p-3">{recipe.category || "N/A"}</td>

                  <td className="flex px-4 py-2 space-x-2 text-center">
                    <Button onClick={() => setViewRecipe(recipe)} text="View" />
                    <Button
                      onClick={() =>
                        setNutritionInfo({
                          protein: recipe.protein ?? Math.floor(Math.random() * 30),
                          carbs: recipe.carbs ?? Math.floor(Math.random() * 50),
                          fats: recipe.fats ?? Math.floor(Math.random() * 20),
                        })
                      }
                      text="Nutri Info"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isEditModalOpen && <CreateRecipeModal onClose={() => dispatch(setEditModalOpen(false))} />}

      {viewRecipe && (
        <FavouriteRecipeModal
          isOpen={true}
          onClose={() => setViewRecipe(null)}
          meal={viewRecipe}
        />
      )}

      {nutritionInfo && (
        <NutritionModal
          nutrition={nutritionInfo}
          onClose={() => setNutritionInfo(null)}
        />
      )}
    </div>
  );
};

export default MyOwnRecipeTable;
