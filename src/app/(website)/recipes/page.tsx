'use client'

import RecipePreviewCard from "@/components/recipes/recipe-preview-card";
import { Toggle } from "@/components/ui/toggle";
import { dishGetLiked, dishGetUser } from "@/lib/services/dish";
import { Dish } from "@/types/recipe";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function RecipePage() {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState<Dish[]>([]);
  const [viewLiked, setViewLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecipes = async () => {
    if (!session?.user?._id) return;

    setIsLoading(true);
    try {
      if (viewLiked) {
        const likedRecipes = await dishGetLiked(`dishes/liked`, session.access_token || '');
        console.log("likedRecipes", likedRecipes);
        setRecipes(likedRecipes);
      } else {
        const userRecipes = await dishGetUser(`dishes/user/${session.user._id}`);
        console.log("userRecipes", userRecipes);
        setRecipes(userRecipes);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchRecipes();
    }
  },);

  const handleToggleChange = () => {
    setViewLiked(!viewLiked);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {viewLiked ? "Recettes Favorites" : "Mes Recettes"}
        </h1>
        <div className="flex items-center gap-2">
          <Toggle
            pressed={viewLiked}
            onPressedChange={handleToggleChange}
            aria-label="Toggle view"
          >
            <span className={!viewLiked ? "font-bold" : ""}>Mes Recettes</span>
            <span className={viewLiked ? "font-bold" : ""}>Favoris</span>
          </Toggle>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Chargement...</p>
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipePreviewCard
              key={recipe._id}
              recipeName={recipe.nom}
              cookingTime="10 minutes"
              recipeId={recipe._id || ''}
              onLikeUpdate={fetchRecipes}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p>Aucune recette trouvée</p>
        </div>
      )}
    </div>
  );
}