"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const loginSchema = z.object({
    username: z.string().min(1, "Le nom d'utilisateur est requis"),
    password: z.string().min(1, "Le mot de passe est requis")
});

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string, password?: string }>({});

    const handleLogin = async () => {
        try {
            const result = loginSchema.safeParse({ username, password });

            if (!result.success) {
                const formattedErrors = result.error.format();
                setErrors({
                    username: formattedErrors.username?._errors[0],
                    password: formattedErrors.password?._errors[0]
                });
                return;
            }

            setErrors({});

            const loginResult = await signIn("credentials", {
                redirect: false,
                username,
                password,
            });

            if (loginResult && loginResult.ok) {
                router.refresh()
                router.push('/')
            } else {
                setErrors({ password: "Identifiants incorrects" });
            }
            // eslint-disable-next-line
        } catch (error) {
            setErrors({ password: "Une erreur est survenue" });
        }
    };

    return (
        <div className="flex justify-center p-12">
            <Card className=" flex flex-col items-center justify-center p-4 gap-4 w-1/3">
                <CardHeader>
                    <CardTitle>Connexion</CardTitle>
                    <CardDescription>Vous devez vous connecter pour accéder à nos fonctionnalités supplémentaires</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <Input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                    </div>

                    <div className="space-y-1">
                        <Input
                            type="password"
                            placeholder="Mot de passe"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <div className="flex flex-row gap-2 justify-between">
                        <Button onClick={handleLogin}>Se connecter</Button>
                        <Button onClick={() => router.push('/register')}>S&apos;enregistrer</Button>
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}