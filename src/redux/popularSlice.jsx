import { createSlice } from '@reduxjs/toolkit';


const initialState = [
    {
      idMeal: "1",
      strMeal: "Spaghetti Carbonara",
      strMealThumb: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
      strCategory: "Pasta",
      strInstructions: "Cook spaghetti. Mix eggs, cheese, and pancetta. Combine.",
      strArea: "Italian"
    },
    {
      idMeal: "2",
      strMeal: "Chicken Biryani",
      strMealThumb: "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg",
      strCategory: "Rice",
      strInstructions: "Layer cooked rice and marinated chicken. Cook on low heat.",
      strArea: "Indian"
    },
    {
      idMeal: "3",
      strMeal: "Beef Tacos",
      strMealThumb: "https://www.themealdb.com/images/media/meals/qtuwxu1468233098.jpg",
      strCategory: "Mexican",
      strInstructions: "Cook beef with spices. Serve in taco shells with toppings.",
      strArea: "Mexican"
    },
    {
      idMeal: "4",
      strMeal: "Sushi Rolls",
      strMealThumb: "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg",
      strCategory: "Japanese",
      strInstructions: "Roll sushi rice and fillings in seaweed. Slice and serve.",
      strArea: "Japanese"
    }
  ];
  

const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {
    togglepopular: (state, action) => {
      const exists = state.find(item => item.idMeal === action.payload.idMeal);
      if (exists) {
        return state.filter(item => item.idMeal !== action.payload.idMeal);
      } else {
        return [...state, action.payload];
      }
    },
  },
});

export const { togglepopular } = popularSlice.actions;
export default popularSlice.reducer;
