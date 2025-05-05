import React, { useState, useEffect } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setRecipeName,
  setSearchQuery,
  setIngredientResults,
  addIngredient,
  removeIngredient,
  setInstructions,
  saveRecipe,
  setCategory,
  setProteins,
  setCarbs,
  setFats,
  setImage,
  setEditModalOpen,
  clearEditingRecipe,
  clearRecipeForm,
} from "../../redux/recipeSlice";

const CreateRecipeModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const {
    recipeName,
    searchQuery,
    ingredientResults,
    selectedIngredients,
    instructions,
    category,
    proteins,
    carbs,
    fats,
    image,
    isEditModalOpen,
    editingRecipe,
  } = useSelector((state) => state.recipes);

  const [allIngredients, setAllIngredients] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllIngredients = async () => {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
      const data = await res.json();
      if (data.meals) {
        setAllIngredients(data.meals.map((i) => i.strIngredient));
      }
    };

    const fetchCategories = async () => {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
      const data = await res.json();
      if (data.meals) {
        setCategories(data.meals.map((c) => c.strCategory));
      }
    };

    fetchAllIngredients();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editingRecipe) {
      dispatch(setRecipeName(editingRecipe.name));
      dispatch(setInstructions(editingRecipe.instructions));
      dispatch(setImage(editingRecipe.image));
      dispatch(setCategory(editingRecipe.category));
      dispatch(setProteins(editingRecipe.proteins));
      dispatch(setCarbs(editingRecipe.carbs));
      dispatch(setFats(editingRecipe.fats));

      editingRecipe.ingredients.forEach((ingredient) => {
        dispatch(addIngredient(ingredient));
      });
    }
  }, [dispatch, editingRecipe]);

  useEffect(() => {
    const filtered = allIngredients.filter((ingredient) =>
      ingredient.toLowerCase().includes(searchQuery.toLowerCase())
    );
    dispatch(setIngredientResults(filtered));
  }, [searchQuery, allIngredients, dispatch]);

  const handleClose = () => {
    dispatch(setEditModalOpen(false));
    dispatch(clearEditingRecipe());
    dispatch(clearRecipeForm());
        if (onClose) onClose();
  };
  

  const handleSave = () => {
    if (recipeName && selectedIngredients.length && instructions && category) {
      if (editingRecipe) {
        dispatch(saveRecipe({ isEdit: true }));
        toast.success("Recipe updated!");
      } else {
        dispatch(saveRecipe());
        toast.success("Recipe saved!");
      }
      dispatch(clearRecipeForm());
      handleClose(); 
    } else {
      toast.error("Please fill all fields!");
    }
  };

  const handleDrop = (e) => {
    const ingredient = e.dataTransfer.getData("text/plain");
    dispatch(addIngredient(ingredient));
  };

  const handleDragStart = (e, ingredient) => {
    e.dataTransfer.setData("text/plain", ingredient);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setImage(URL.createObjectURL(file)));
    }
  };

  if (!isEditModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white w-[600px] max-w-full rounded-lg shadow-lg p-6 pt-0 relative max-h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-20 flex justify-between items-center mt-5 mb-4 border-b pb-2">
          <h2 className="text-2xl font-bold">Create Your Own Recipe</h2>
          <button
            onClick={handleClose}
            className="text-2xl text-gray-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

        <input
          type="text"
          placeholder="Recipe Name"
          value={recipeName}
          onChange={(e) => dispatch(setRecipeName(e.target.value))}
          className="w-full mb-4 p-2 border rounded"
        />

        <select
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="w-full mb-4 p-2 border rounded text-gray-500"
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search Ingredients..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full mb-2 p-2 border rounded"
        />

        <div className="border p-2 mb-4 h-24 overflow-y-auto bg-white rounded flex flex-wrap gap-2">
          {ingredientResults.map((ingredient, idx) => (
            <div
              key={idx}
              draggable
              onDragStart={(e) => handleDragStart(e, ingredient)}
              className="cursor-move px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            >
              {ingredient}
            </div>
          ))}
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="h-[150px] overflow-y-auto border-dashed border-2 border-green-400 rounded p-2 mb-4"
        >
          <p className="mb-2 text-gray-600">Drag ingredients here</p>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((ing, idx) => (
              <div
                key={idx}
                className="bg-green-100 text-green-800 px-3 py-1 rounded flex items-center gap-2 text-sm"
              >
                {ing}
                <button
                  onClick={() => dispatch(removeIngredient(ing))}
                  className="text-gray-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <textarea
          rows={4}
          placeholder="Write cooking steps..."
          value={instructions}
          onChange={(e) => dispatch(setInstructions(e.target.value))}
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="number"
            placeholder="Proteins (g)"
            value={proteins}
            onChange={(e) => dispatch(setProteins(e.target.value))}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Carbs (g)"
            value={carbs}
            onChange={(e) => dispatch(setCarbs(e.target.value))}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Fats (g)"
            value={fats}
            onChange={(e) => dispatch(setFats(e.target.value))}
            className="p-2 border rounded"
          />
        </div>

        <label className="mb-4 border border-dashed border-gray-400 p-4 rounded cursor-pointer block text-center hover:border-blue-500 transition">
          <p className="text-sm text-gray-500">Click to upload image</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {image && (
          <img
            src={image}
            alt="Recipe"
            className="w-full h-40 object-cover rounded mb-4"
          />
        )}

        <div className="flex justify-end gap-4">
          
          <Button
            onClick={handleSave}
            text="save Recipe"
          
          />
        </div>
      </div>
    </div>
  );
};

export default CreateRecipeModal;



