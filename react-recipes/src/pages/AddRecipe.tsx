import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle,   TextField,  Stack} from '@mui/material';
import { useUserContext } from '../context/UserContext';
import { apiRecipes } from '../services/apiRecipes';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../components/redux/recipesSlice';

const recipeSchema = Yup.object().shape({
    title: Yup.string().required('Recipe title is required'),
    description: Yup.string().required('Description is required'),
    products: Yup.string(), 
    ingredients: Yup.string().required('Ingredients are required'),
    instructions: Yup.string().required('Cooking instructions are required')
});

interface RecipeFormData {
    title: string;
    description: string;
    products?: string; 
    ingredients: string;
    instructions: string;
}

const AddRecipe: React.FC = () => {
    const { state: { isAuthenticated, user } } = useUserContext();
    const [open, setOpen] = React.useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<RecipeFormData>({
        resolver: yupResolver(recipeSchema),
        defaultValues: {
            title: '',
            description: '',
            products: '',  
            ingredients: '',
            instructions: ''
        }
    });

    const dispatch = useDispatch();
    const onSubmit = async (data: RecipeFormData) => {
        if (!isAuthenticated) {
            alert("You must be logged in to add a recipe");
            return;
        }

        if (!user?.id) {
            alert("User ID is not available");
            return;
        }

        try {
            const newRecipe = {
                id: Date.now(), 
                title: data.title,
                description: data.description,
                products: data.products ?? '',
                ingredients: data.ingredients,
                instructions: data.instructions
            };

            await apiRecipes.addRecipe(newRecipe, user.id);

            dispatch(addRecipe(newRecipe)); 
            reset(); 
            setOpen(false);
        } catch (error) {
            console.error("Failed to add recipe", error);
            alert("Failed to add recipe");
        }
    };

    if (!isAuthenticated) return null;

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
            >
                Add New Recipe
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Add New Recipe</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2} sx={{ mt: 1 }}>
                            <Controller
                                name="title"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Recipe Title"
                                        fullWidth
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="description"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Description"
                                        fullWidth
                                        multiline
                                        rows={2}
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="products"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Products Needed"
                                        fullWidth
                                        multiline
                                        rows={2}
                                    />
                                )}
                            />
                            <Controller
                                name="ingredients"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Ingredients"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        error={!!errors.ingredients}
                                        helperText={errors.ingredients?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="instructions"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Cooking Instructions"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        error={!!errors.instructions}
                                        helperText={errors.instructions?.message}
                                    />
                                )}
                            />
                        </Stack>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Add Recipe
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddRecipe;