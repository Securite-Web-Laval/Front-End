'use client'
import RecipeCard from "@/components/recipe-card";
import { Dish, dishGet } from "@/lib/services/dish";
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

  console.log(recipes);

  return (
    <main>
      <div className="flex flex-grid-cols-3 gap-4 items-center justify-center h-screen">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} imageSrc="/placeholder.svg" recipeName={recipe.nom} cookingTime="10 minutes" recipeId={recipe._id} />
        ))}
      </div>
    </main>
  );
}
