'use client'
import RecipeCard from "@/components/recipes/recipe-card";
import { dishGetOne } from "@/lib/services/dish";
import { Dish } from "@/types/recipe";
import { use, useEffect, useState } from "react";


export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [recipe, setRecipe] = useState<Dish>();

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await dishGetOne(`dishes/${unwrappedParams.id}`);
      setRecipe(recipe);
    }
    fetchRecipe();
  }, [unwrappedParams.id]);


  return (
    <div className="flex items-center justify-center p-8">
      {recipe && <RecipeCard recipe={recipe} />}
    </div>
  )
}