import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./recipesSlice"; 

export const myStore = configureStore({
  reducer: {
    recipes: recipesReducer, 
  },
});
