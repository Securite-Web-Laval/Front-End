"use client";

import { useState } from "react";
import { dishPost } from "@/lib/services/dish";
import { useSession } from "next-auth/react";

interface Ingredient {
    nom: string;
    quantite: number;
    unite: string;
}

const CreateDishPage = () => {
    const [dishName, setDishName] = useState<string>("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [ingredientName, setIngredientName] = useState<string>("");
    const [ingredientQuantity, setIngredientQuantity] = useState<number>(0);
    const [ingredientUnit, setIngredientUnit] = useState<string>("");
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const { data: session } = useSession();

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
        e.preventDefault();
        const dish = {
            nom: dishName,
            ingredients: ingredients,
            user: session?.user?._id || '',
        };
        console.log("Plat créé:", dish);
        const result = await dishPost('dishes', session?.access_token || '', dish);
        console.log(result);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">Créer un Plat</h1>
            <div onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Nom du Plat:</label>
                    <input
                        type="text"
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                        className="border p-2 w-full text-black"
                        required
                    />
                </div>

                <h2 className="text-xl mb-2">Ingrédients</h2>
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Nom de l'ingrédient"
                        value={ingredientName}
                        onChange={(e) => setIngredientName(e.target.value)}
                        className="border p-2 mr-2 text-black"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Quantité"
                        value={ingredientQuantity}
                        onChange={(e) => setIngredientQuantity(Number(e.target.value))}
                        className="border p-2 mr-2 text-black"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Unité"
                        value={ingredientUnit}
                        onChange={(e) => setIngredientUnit(e.target.value)}
                        className="border p-2 mr-2 text-black"
                        required
                    />
                    <button type="button" onClick={handleAddOrUpdateIngredient} className="bg-blue-500 text-white p-2 rounded">
                        {editingIndex !== null ? "Modifier Ingrédient" : "Ajouter Ingrédient"}
                    </button>
                </div>

                <h3 className="text-lg mb-2">Liste des Ingrédients:</h3>
                <ul className="list-disc pl-5 mb-4">
                    {ingredients.map((ingredient, index) => (
                        <li key={index} className="flex justify-between">
                            {ingredient.nom} - {ingredient.quantite} {ingredient.unite}
                            <button type="button" onClick={() => handleEditIngredient(index)} className="text-blue-500 ml-2">
                                Modifier
                            </button>
                        </li>
                    ))}
                </ul>

                <button type="button" className="bg-green-500 text-white p-2 rounded" onClick={handleSubmit}>
                    Créer le Plat
                </button>
            </div>
        </div>
    );
};

export default CreateDishPage;