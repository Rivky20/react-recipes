import { Routes, Route } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Recipes from '../pages/Recipes';
import AddRecipe from '../pages/AddRecipe';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;