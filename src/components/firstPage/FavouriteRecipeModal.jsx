import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../../redux/recipeSlice";
import ConfirmPopUp from "./ConfirmPopUp";
import { useState } from "react";
import { toast } from "react-toastify"; 
import { setEditingRecipe, setEditModalOpen } from "../../redux/recipeSlice"; 



const FavouriteRecipeModal = ({ isOpen, onClose, meal }) => {
  const [showConfirm, setShowConfirm] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();
  const createdRecipes = useSelector((state) => state.recipes.createdRecipes);

  const isCustom = createdRecipes.some((r) => r.id === meal?.id);
  const customMeal = isCustom
    ? createdRecipes.find((r) => r.id === meal.id)
    : null;

  const data = isCustom ? customMeal : meal;

  if (!isOpen || !data) return null;

  const ingredients = isCustom
    ? data.ingredients
    : Array.from({ length: 20 }, (_, i) => data[`strIngredient${i + 1}`])
        .filter((ing) => ing && ing.trim() !== "")
        .map((ing) => ing.trim());

  const handleDelete = (id) => {
    setRecipeToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(deleteRecipe(recipeToDelete));
    toast.success("Recipe deleted!");
    setShowConfirm(false);
    setRecipeToDelete(null);
    onClose(); 
  };

  const cancelDelete = () => {
    toast.info("Deletion cancelled");
    setShowConfirm(false);
    setRecipeToDelete(null);
  };

  const handleEdit = (recipeId) => {
    const recipe = createdRecipes.find((r) => r.id === recipeId);
    if (recipe) {
      dispatch(setEditingRecipe(recipe)); 
      dispatch(setEditModalOpen(true)); 
    }
  };
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    onClose(); 
  };
  


  return (
    <div className="fixed inset-0 bg-black/60  flex items-center justify-center z-50 overflow-hidden px-4 py-10 ">
  <div className="bg-white rounded-lg md:w-full w-70 max-w-xl relative my-10 max-h-[calc(100vh-5rem)] overflow-hidden">

        <div className="sticky top-0 z-10">
          <img
            src={isCustom ? data.image : data.strMealThumb}
            alt={isCustom ? data.name : data.strMeal}
            className="w-full h-70 object-fill rounded-t-lg p-7 pt-9"
          />
          <button
            onClick={onClose}
            className="absolute top-0 right-4 text-xl font-bold text-gray-700 bg-opacity-40 px-2 py-1 rounded-full hover:text-red-400"
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-2">
            {isCustom ? data.name : data.strMeal}
          </h2>

          <div className="mb-4">
            <strong>Ingredients:</strong>
            <div className="flex flex-wrap gap-1 mt-2">
              {ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="bg-green-400 text-white px-3 py-1 rounded text-sm"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <strong>Recipe:</strong>
            <p className="text-base text-gray-800 whitespace-pre-wrap mt-1 mb-10 ">
              {isCustom ? data.instructions : data.strInstructions}
            </p>
          </div>

          {isCustom && (
            <div className="mt-5 flex justify-between">
              <button
                onClick={() => handleEdit(data.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Edit Recipe
              </button>
              <button
                onClick={() => handleDelete(data.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete Recipe
              </button>
            </div>
          )}
        </div>
      </div>
      {showConfirm && (
        <ConfirmPopUp
          message="Are you sure you want to delete this recipe?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
       {isEditModalOpen && <CreateRecipeModal onClose={handleEditModalClose} />}

    </div>
  );
};

export default FavouriteRecipeModal;
