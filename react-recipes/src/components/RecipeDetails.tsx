import { useSelector } from 'react-redux';
import { Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

interface Recipe {
  id: number;
  title: string;
  description: string;
  products: string;
  ingredients: string;
  instructions: string;
}

interface RecipeDetailsProps {
  id: number;
}

interface RootState {
    recipes: {
      recipes: Recipe[];
    };
}
function RecipeDetails({ id }: RecipeDetailsProps) {
  const singleRecipe = useSelector((state: RootState) =>
    state.recipes.recipes.find((recipe) => recipe.id === id)
  );

  if (!singleRecipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: '80%' }}>
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          {singleRecipe.title}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {singleRecipe.description}
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Products" secondary={singleRecipe.products} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Ingredients" secondary={singleRecipe.ingredients} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Instructions" secondary={singleRecipe.instructions} />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}

export default RecipeDetails;
