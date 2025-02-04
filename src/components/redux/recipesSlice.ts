import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Recipe {
  id: number;
  title: string;
  description: string;
  products: string;
  ingredients: string;
  instructions: string;
}

interface RecipesState {
  recipes: Recipe[];
}

const initialState: RecipesState = {
  recipes: [], 
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload; 
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload); 
    },
  },
});


export const { setRecipes, addRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
