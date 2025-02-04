import { Grid2, Card, CardContent, Typography, Box, Button, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiRecipes } from "../services/apiRecipes";
import { setRecipes } from "../components/redux/recipesSlice";
import RecipeDetails from "../components/RecipeDetails";

export interface Recipe {
  id: number;
  title: string;
  description: string;
  products: string;
  ingredients: string;
  instructions: string;
}

interface RootState {
  recipes: {
    recipes: Recipe[];
  };
}

const Recipes = () => {
  const dispatch = useDispatch();
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);

  const arrayRecipes = useSelector((state: RootState) => state.recipes.recipes);

  useEffect(() => {
    apiRecipes.getAllRecipes().then((recipes: Recipe[]) => dispatch(setRecipes(recipes)));
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 4 }} component="div">
          <Box sx={{ maxHeight: "80vh", overflowY: "auto", pr: 2 }}>
          <List>
  {arrayRecipes.slice().reverse().map((recipe) => ( 
    <ListItem key={recipe.id}>
      <Button onClick={() => setSelectedRecipe(recipe.id)} fullWidth>
        <Card sx={{ width: "100%", textAlign: "left" }}>
          <CardContent>
            <Typography variant="h6">{recipe.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {recipe.description}
            </Typography>
          </CardContent>
        </Card>
      </Button>
    </ListItem>
  ))}
</List>

          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 8 }} component="div">
          {selectedRecipe ? (
            <RecipeDetails id={selectedRecipe} />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "80vh",
                textAlign: "center",
                backgroundImage: `url('https://source.unsplash.com/800x600/?food,delicious')`, // Unsplash image
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.7, // Transparency
                borderRadius: 2,
                boxShadow: 3,
                p: 4,
              }}
            >
              <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>
                What will you eat today?
              </Typography>
            </Box>
          )}
        </Grid2>
      </Grid2>
    </Box>


  );
};

export default Recipes;
