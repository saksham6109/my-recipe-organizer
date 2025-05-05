import { createSlice } from '@reduxjs/toolkit';

const myOwnRecipeFavouriteSlice = createSlice({
  name: 'myOwnFavorites',
  initialState: [],
  reducers: {
    toggleMyOwnFavorite: (state, action) => {
      const exists = state.find(item => item.id === action.payload.id);
      if (exists) {
        return state.filter(item => item.id !== action.payload.id);
      } else {
        return [...state, action.payload];
      }
    },
  },
});

export const { toggleMyOwnFavorite } = myOwnRecipeFavouriteSlice.actions;
export default myOwnRecipeFavouriteSlice.reducer;
