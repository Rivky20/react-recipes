import axios from 'axios';
import { Recipe } from '../pages/Recipes';

const BASE_URL = 'http://localhost:3000/api/recipes'; 

export const apiRecipes = {
    getAllRecipes: async () => {
        const response = await axios.get<Recipe[]>(`${BASE_URL}`);
        return response.data;
    },

    addRecipe: async (recipeData: {
        id:number,
        title: string,
        description: string,
        products: string,
        ingredients: string,
        instructions: string
    }, userId: number) => {
        const response = await axios.post(`${BASE_URL}`, recipeData, {
            headers: {
                'user-id': userId.toString() 
            }
        });
        return response.data;
    }
};
