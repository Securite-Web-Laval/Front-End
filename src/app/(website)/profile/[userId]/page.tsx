"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { dishGetByUser } from "@/lib/services/dish";
import { userGetOne, userPut } from "@/lib/services/user";
import { useParams, useRouter } from "next/navigation";

interface Ingredient {
    _id: string;
    nom: string;
    quantite: number;
    unite: string;
}

interface Like {
    users: { _id: string; username: string; email: string }[];
    total: number;
}

interface Comment {
    user: { _id: string; username: string; email: string };
    note: number;
    description: string;
    _id: string;
}

interface Dish {
    nom: string;
    ingredients: Ingredient[];
    like: Like;
    comments: Comment[];
}

const ProfilePage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const { userId } = useParams();
    const [userInfo, setUserInfo] = useState<{ username: string; email: string } | null>(null);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                const profile = await userGetOne(`users/${userId}`);
                setUserInfo({ username: profile.username, email: profile.email });
                setNewUsername(profile.username);
                setNewEmail(profile.email);

                const userDishes = await dishGetByUser(`dishes/user/${userId}`);
                console.log(userDishes)
                setDishes(userDishes);
            }
        };
        fetchData();
    }, [userId]);

    const handleUpdateProfile = async () => {
        if (userInfo) {
            const updatedUser = await userPut(`users/${session?.user?._id}`, session?.access_token || '', { username: newUsername, email: newEmail });
            setUserInfo(updatedUser);
            setIsEditing(false);
        }
    };

    const isCurrentUser = session?.user?._id === userId;

    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">Profil de {userInfo?.username}</h1>

            {isCurrentUser ? (
                <>
                    {isEditing ? (
                        <div className="mb-4">
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="border p-2 mr-2"
                                placeholder="Nom d'utilisateur"
                            />
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="border p-2 mr-2"
                                placeholder="Email"
                            />
                            <button onClick={handleUpdateProfile} className="bg-green-500 text-white p-2 rounded">
                                Mettre à jour
                            </button>
                            <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white p-2 rounded ml-2">
                                Annuler
                            </button>
                        </div>
                    ) : (
                        <div className="mb-4">
                            <p><strong>Nom d&apos;utilisateur:</strong> {userInfo?.username}</p>
                            <p><strong>Email:</strong> {userInfo?.email}</p>
                            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white p-2 rounded">
                                Modifier
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="mb-4">
                    <p><strong>Nom d&apos;utilisateur:</strong> {userInfo?.username}</p>
                    <p><strong>Email:</strong> {userInfo?.email}</p>
                </div>
            )}

            <h2 className="text-xl mb-2">Mes Plats Créés:</h2>
            <ul className="list-disc pl-5">
                {dishes.map((dish, index) => (
                    <li key={index} className="mb-2">
                        <strong>{dish.nom}</strong>
                        <p><strong>Likes:</strong> {dish.like.total}</p>
                        <ul className="list-inside">
                            {dish.ingredients.map((ingredient) => (
                                <li key={ingredient._id}>
                                    {ingredient.nom} - {ingredient.quantite} {ingredient.unite}
                                </li>
                            ))}
                        </ul>
                        <h3 className="text-lg">Commentaires:</h3>
                        <ul className="list-inside">
                            {dish.comments.map((comment) => (
                                <li key={comment._id}>
                                    <strong className="cursor-pointer" onClick={() => { router.push(`/profile/${comment.user._id}`) }}>{comment.user.username}:</strong> {comment.description} (Note: {comment.note}/5)
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfilePage;