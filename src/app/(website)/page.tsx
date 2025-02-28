'use client'
import RecipePreviewCard from "@/components/recipes/recipe-preview-card";
import { dishGet } from "@/lib/services/dish";
import { Dish } from "@/types/recipe";
import { useEffect, useState } from "react";

export default function Home() {

  const [recipes, setRecipes] = useState<Dish[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await dishGet("dishes");
      setRecipes(recipes);
    };
    fetchRecipes();
  }, []);

  return (
    <main>
      <div className="flex flex-wrap gap-4 items-center justify-center p-12">
        {recipes.map((recipe, index) => (
          <RecipePreviewCard key={index} recipeName={recipe.nom} cookingTime={recipe.cookingTime ? recipe.cookingTime.toString() : '--:--'} recipeId={recipe._id || ''} />
        ))}
      </div>
    </main>
  );
}
