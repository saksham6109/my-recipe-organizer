import React from "react";
import Sidebar from "./firstPage/Sidebar";
import MyOwnRecipeTable from "./firstPage/MyOwnRecipeTable";
import MyFavouriteRecipes from "./firstPage/MyFavouriteRecipes"; 
import { useSelector } from "react-redux";
import Header from "./firstPage/Header";
import CreateRecipeModal from "./firstPage/CreateRecipeModal";

const MyRecipes = () => {
  const createdRecipes = useSelector((state) => state.recipes?.createdRecipes || []);
  const favorites = useSelector((state) => state.myOwnFavorites || []);
  const isEditModalOpen = useSelector((state) => state.recipes.isEditModalOpen);

  const hasCustomFavorites = createdRecipes.some((recipe) =>
    favorites.find((fav) => fav.id === recipe.id)
  );

  return (
    <div>
      <div className="flex h-screen">
        <div className="w-1/5 bg-white shadow-md sticky z-50">
          <Sidebar />
        </div>

        <div className="w-4/5 bg-blue-50 px-4 py-6 space-y-4 overflow-y-auto">
          <Header />
          {hasCustomFavorites && <MyFavouriteRecipes />}
          <MyOwnRecipeTable />
        </div>
      </div>

      {isEditModalOpen && <CreateRecipeModal />}
    </div>
  );
};

export default MyRecipes;
