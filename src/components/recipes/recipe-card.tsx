import { Dish } from "@/types/recipe";


export default function RecipeCard({ recipe }: { recipe: Dish }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{recipe.nom}</h1>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Ingrédients</h2>
        <p>{recipe.ingredients.map((ingredient) => ingredient.nom).join(", ")}</p>
        <h2 className="text-lg font-bold">Instructions</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <p>Temps de préparation : {recipe.cookingTime} minutes</p>
      </div>
      {/* <p>{recipe.user}</p> */}
    </div>
  )
}