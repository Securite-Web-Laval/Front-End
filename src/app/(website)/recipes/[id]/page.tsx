import RecipeCard from "@/components/recipe-card";

export default function RecipePage() {
  return (
    <main>
      <RecipeCard imageSrc="/placeholder.svg" recipeName="Recette de test" cookingTime="10 minutes" labels={["Recette de test", "Recette de test"]} recipeId="1" />
    </main>
  )
}