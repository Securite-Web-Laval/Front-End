'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dishPost } from "@/lib/services/dish";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface Ingredient {
    nom: string;
    quantite: number;
    unite: string;
}

export default function CreateDishPage() {
    const [dishName, setDishName] = useState<string>("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [ingredientName, setIngredientName] = useState<string>("");
    const [ingredientQuantity, setIngredientQuantity] = useState<number>(0);
    const [ingredientUnit, setIngredientUnit] = useState<string>("");
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const { data: session } = useSession();
    const [cookingTime, setCookingTime] = useState<number>(0);

    const handleAddOrUpdateIngredient = () => {

        if (ingredientName && ingredientQuantity > 0 && ingredientUnit) {
            const newIngredient = { nom: ingredientName, quantite: ingredientQuantity, unite: ingredientUnit };

            if (editingIndex !== null) {
                const updatedIngredients = [...ingredients];
                updatedIngredients[editingIndex] = newIngredient;
                setIngredients(updatedIngredients);
                setEditingIndex(null);
            } else {
                setIngredients([...ingredients, newIngredient]);
            }

            setIngredientName("");
            setIngredientQuantity(0);
            setIngredientUnit("");
        }
    };

    const handleEditIngredient = (index: number) => {
        const ingredientToEdit = ingredients[index];
        setIngredientName(ingredientToEdit.nom);
        setIngredientQuantity(ingredientToEdit.quantite);
        setIngredientUnit(ingredientToEdit.unite);
        setEditingIndex(index);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        setCookingTime(Number(cookingTime));
        e.preventDefault();
        const dish = {
            nom: dishName,
            ingredients: ingredients,
            user: session?.user?._id || '',
            cookingTime: cookingTime || 0,
        };
        console.log("Plat créé:", dish);
        const result = await dishPost('dishes', session?.access_token || '', dish);
        console.log(result);
    };

    return (
        <div className="p-8 flex flex-col gap-4 max-w-4xl mx-auto">
            <h1 className="text-2xl mb-4">Créer un Plat</h1>
            <div onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Label className="block mb-2">Nom du Plat:</Label>
                    <Input
                        type="text"
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                        className="border p-2 w-full text-black"
                        required
                    />
                </div>

                <h2 className="text-xl mb-2">Ingrédients</h2>
                <div className="flex mb-4">
                    <Input
                        type="text"
                        placeholder="Nom de l'ingrédient"
                        value={ingredientName}
                        onChange={(e) => setIngredientName(e.target.value)}
                        className="border p-2 mr-2 text-black"
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Quantité"
                        value={ingredientQuantity}
                        onChange={(e) => setIngredientQuantity(Number(e.target.value))}
                        className="border p-2 mr-2 text-black"
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Unité"
                        value={ingredientUnit}
                        onChange={(e) => setIngredientUnit(e.target.value)}
                        className="border p-2 mr-2 text-black"
                        required
                    />
                    <Button type="button" onClick={handleAddOrUpdateIngredient} className="bg-blue-500 text-white p-2 rounded">
                        {editingIndex !== null ? "Modifier Ingrédient" : "Ajouter Ingrédient"}
                    </Button>
                </div>

                <h3 className="text-lg mb-2">Temps de cuisson:</h3>
                <div className="mb-4 flex flex-row gap-2">
                    <Input
                        type="text"
                        placeholder="Temps de cuisson"
                        value={cookingTime}
                        onChange={(e) => setCookingTime(Number(e.target.value))}
                        className="w-1/4"
                        required
                    />
                </div>

                <h3 className="text-lg mb-2">Liste des Ingrédients:</h3>
                <ul className="list-disc pl-5 mb-4">
                    {ingredients.map((ingredient, index) => (
                        <li key={index} className="flex justify-between">
                            {ingredient.nom} - {ingredient.quantite} {ingredient.unite}
                            <Button onClick={() => handleEditIngredient(index)} variant="outline">
                                Modifier
                            </Button>
                        </li>
                    ))}
                </ul>

                <Button type="button" className="bg-green-500 text-white p-2 rounded" onClick={handleSubmit}>
                    Créer le Plat
                </Button>
            </div>
        </div>
    );
};
