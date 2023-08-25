import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetchById from '../../hooks/useFetchById';
import RecipeInfos from './components/RecipeInfos';
import useFetchGeneric from '../../hooks/useFetchGeneric';
import Carousel from './components/Carousel';

function Recipe() {
  const [entriesRecipe, setEntriesRecipe] = useState<[string, string][]>([]);
  const { data, loading } = useFetchById();
  const { pathname } = useLocation();
  const location = pathname.split('/')[1];
  const { drinksRecipes, mealsRecipes } = useFetchGeneric();

  useEffect(() => {
    if (data[0]) {
      setEntriesRecipe(Object.entries(data[0]));
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <RecipeInfos location={ location } data={ data } entriesRecipe={ entriesRecipe } />
      <div>
        {drinksRecipes.length > 1 ? (
          <Carousel drinks={ drinksRecipes.slice(0, 6) } />
        ) : (
          <Carousel meals={ mealsRecipes.slice(0, 6) } />
        )}
      </div>
    </>
  );
}

export default Recipe;
