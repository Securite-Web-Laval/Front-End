"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { register } from '@/lib/services/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

// Définition du schéma de validation
const registerSchema = z.object({
    username: z.string().min(1, `Le nom d\'utilisateur est requis`),
    email: z.string().email("Format d&apos;email invalide exemple : nom@exemple.com"),
    password: z.string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
        .regex(/[^a-zA-Z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial")
});

export default function RegisterPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ username?: string, email?: string, password?: string }>({});

    const handleRegister = async () => {
        try {
            const result = registerSchema.safeParse({ username, email, password });

            if (!result.success) {
                const formattedErrors = result.error.format();
                setErrors({
                    username: formattedErrors.username?._errors[0],
                    email: formattedErrors.email?._errors[0],
                    password: formattedErrors.password?._errors[0]
                });
                return;
            }

            setErrors({});

            await register('auth/register', { username, password, email });
            router.push('/login')
        } catch (error) {
            console.log(error);
            setErrors({ password: "Une erreur est survenue lors de l'inscription" });
        }
    };

    return (
        <div className="flex justify-center p-4">
            <Card className="flex flex-col items-center justify-center p-4 gap-4 w-1/3">
                <CardHeader >
                    <CardTitle>Inscription</CardTitle>
                    <CardDescription>Inscrivez vous pour enregistrer ou créer vos recettes</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                    </div>

                    <div className="space-y-1">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-1">
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <Button onClick={handleRegister}>S&apos;enregistrer</Button>
                    <p>Vous avez déjà un compte ? <Link href="/login" className="text-blue-500">Connectez-vous</Link></p>
                </CardContent>
            </Card>
        </div>
    )
}