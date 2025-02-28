import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ProfileButton({ username, email }: { username: string | undefined; email: string | undefined; userId: string | undefined }) {
  const router = useRouter()

  if (!username) {
    return (
      <Link href="/login">
        <Button variant="outline" className="relative h-12 w-48 rounded-full border-slate-900">
          Connectez-vous
        </Button>
      </Link>
    );
  }

  const handleLogout = () => {
    signOut()
    router.push('/login')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative h-12 w-48 rounded-full border-slate-900">
          {username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-xs leading-none text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/profile`}>
          <DropdownMenuItem>
            Mon profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <Link href="/login" onClick={() => handleLogout()}>
            Déconnexion
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}