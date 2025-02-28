'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { userPut } from "@/lib/services/user";
import { User } from "@/types/user";
import { Session } from "next-auth";
import { useState } from "react";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(1, `Le nom d\'utilisateur est requis`),
  email: z.string().email("Format d&apos;email invalide exemple : nom@exemple.com"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(/[^a-zA-Z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial")
});


export default function ModifyProfileForm(props: { user: User, session: Session }) {
  const [username, setUsername] = useState(props.user?.username || '');
  const [email, setEmail] = useState(props.user?.email || '');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string, email?: string, password?: string }>({});

  const handleSubmit = async () => {
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
      await userPut(`users/${props.session?.user?._id}`, props.session?.access_token || '', { username, email, password });
      // eslint-disable-next-line
    } catch (error) {
      setErrors({ password: "Une erreur est survenue lors de la modification du profil" });
    }
  }

  return (
    <Card className="flex flex-col items-center justify-center w-1/3 max-w-md">
      <CardHeader>
        <CardTitle>Modifier mon profil</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 w-full">
        <Input type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} />
        {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        <Button onClick={handleSubmit}>Modifier</Button>
      </CardContent>
    </Card>
  );
}
