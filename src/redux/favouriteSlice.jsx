import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    idMeal: "9",
    strMeal: "Butter Chicken",
    strMealThumb: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
    strCategory: "Indian",
    strInstructions: "Cook chicken in a creamy tomato sauce with spices.",
    strArea: "Indian"
  },
  {
    idMeal: "10",
    strMeal: "Pad Thai",
    strMealThumb: "https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg",
    strCategory: "Noodles",
    strInstructions: "Stir-fry noodles with tamarind sauce, shrimp, and peanuts.",
    strArea: "Thai"
  },
  {
    idMeal: "11",
    strMeal: "Falafel",
    strMealThumb: "https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg",
    strCategory: "Vegetarian",
    strInstructions: "Blend chickpeas with herbs and spices, then fry.",
    strArea: "Middle Eastern"
  },
  {
    idMeal: "12",
    strMeal: "Pho",
    strMealThumb: "https://www.themealdb.com/images/media/meals/yrstur1511816601.jpg",
    strCategory: "Soup",
    strInstructions: "Simmer beef bones with spices, serve with noodles.",
    strArea: "Vietnamese"
  },
  {
    idMeal: "13",
    strMeal: "Paella",
    strMealThumb: "https://www.themealdb.com/images/media/meals/xvrrux1511783685.jpg",
    strCategory: "Rice",
    strInstructions: "Cook saffron rice with seafood, chicken, and vegetables.",
    strArea: "Spanish"
  }
];

const favouriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const exists = state.find(item => item.idMeal === action.payload.idMeal);
      if (exists) {
        return state.filter(item => item.idMeal !== action.payload.idMeal);
      } else {
        return [...state, action.payload];
      }
    },
  },
});

export const { toggleFavorite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
