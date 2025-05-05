import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
  recipeName: "",
  searchQuery: "",
  ingredientResults: [],
  selectedIngredients: [],
  instructions: "",
  createdRecipes: [],
  deleteRecipe: "",
  updateRecipe: "",
  category: "",
  proteins: "",
  carbs: "",
  fats: "",
  image: "",
  editingRecipe: null,
  isEditModalOpen: false,

};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const exists = state.favourites.find(
        (item) => item.idMeal === action.payload.idMeal
      );
      if (exists) {
        state.favourites = state.favourites.filter(
          (item) => item.idMeal !== action.payload.idMeal
        );
      } else {
        state.favourites.push(action.payload);
      }
    },
    setRecipeName: (state, action) => {
      state.recipeName = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setIngredientResults: (state, action) => {
      state.ingredientResults = action.payload;
    },
    addIngredient: (state, action) => {
      if (!state.selectedIngredients.find((item) => item === action.payload)) {
        state.selectedIngredients.push(action.payload);
      }
    },
    removeIngredient: (state, action) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (item) => item !== action.payload
      );
    },
    setInstructions: (state, action) => {
      state.instructions = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setProteins: (state, action) => {
      state.proteins = action.payload;
    },
    setCarbs: (state, action) => {
      state.carbs = action.payload;
    },
    setFats: (state, action) => {
      state.fats = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setEditModalOpen: (state, action) => {
      state.isEditModalOpen = action.payload;
    },
    

    saveRecipe: (state, action) => {
      const {
        isEdit = false,
      } = action.payload || {};
    
      const newRecipe = {
        id: isEdit && state.editingRecipe?.id ? state.editingRecipe.id : Date.now(),
        name: state.recipeName,
        ingredients: state.selectedIngredients,
        instructions: state.instructions,
        category: state.category,
        proteins: state.proteins,
        carbs: state.carbs,
        fats: state.fats,
        image: state.image,
      };
    
      if (isEdit) {
        const index = state.createdRecipes.findIndex(
          (r) => r.id === state.editingRecipe?.id
        );
        if (index !== -1) {
          state.createdRecipes[index] = newRecipe;
        }
      } else {
        state.createdRecipes.push(newRecipe);
      }
    },
    

    deleteRecipe: (state, action) => {
      state.createdRecipes = state.createdRecipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
    updateRecipe: (state, action) => {
      const index = state.createdRecipes.findIndex(
        (r) => r.id === action.payload
      );
      if (index !== -1) {
        state.createdRecipes[index] = {
          id: action.payload,
          name: state.recipeName,
          ingredients: state.selectedIngredients,
          instructions: state.instructions,
          category: state.category,
          proteins: state.proteins,
          carbs: state.carbs,
          fats: state.fats,
          image: state.image,
        };
      }
    },
    setEditingRecipe: (state, action) => {
      state.editingRecipe = action.payload; 
    },
    clearEditingRecipe: (state) => {
      state.editingRecipe = null;
    },
    clearRecipeForm: (state) => {
      state.recipeName = "";
      state.searchQuery = "";
      state.ingredientResults = [];
      state.selectedIngredients = [];
      state.instructions = "";
      state.category = "";
      state.proteins = "";
      state.carbs = "";
      state.fats = "";
      state.image = "";
      state.editingRecipe = null;
      state.isEditModalOpen = false;
    },
    
  },
});

export const {
  toggleFavourite,
  setRecipeName,
  setSearchQuery,
  setIngredientResults,
  addIngredient,
  removeIngredient,
  setInstructions,
  setCategory,
  setProteins,
  setCarbs,
  setFats,
  setImage,
  saveRecipe,
  deleteRecipe,
  updateRecipe,
  setEditingRecipe, 
  clearEditingRecipe,
  setEditModalOpen,
  clearRecipeForm,
} = recipeSlice.actions;

export default recipeSlice.reducer;
