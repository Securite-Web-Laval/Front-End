import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function ProfileButton({ username, email, userId }: { username: string | undefined; email: string | undefined; userId: string | undefined }) {


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
        <Link href={`/profile/${userId}`}>
          <DropdownMenuItem>
            Mon profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <Link href="/settings">
            Paramètres
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/logout">
            Se déconnecter
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}