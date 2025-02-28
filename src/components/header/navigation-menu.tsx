import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UnderlinedLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname()
  const getUnderlineClass = (isActive: boolean) =>
    cn(
      "relative inline-block transition-all hover:text-orangeade",
      isActive &&
      "after:content-[''] after:absolute after:bottom-[-5px] after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:bg-green-500 after:rounded-full after:w-[85%]"
    )
  const isActive = pathname === href

  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink className={getUnderlineClass(isActive)}>
        {children}
      </NavigationMenuLink>
    </Link>
  )
}

export function TopBar() {
  return (
    <NavigationMenu className="[&_button]:px-4 [&_a]:px-4 [&_button]:text-md [&_a]:text-md">
      <NavigationMenuList className="flex flex-row justify-between text-md font-medium">
        <NavigationMenuItem>
          <UnderlinedLink href="/">EXPLOREZ</UnderlinedLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <UnderlinedLink href="/add-meal">CRÉER UNE RECETTE</UnderlinedLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <UnderlinedLink href="/recipes">MES RECETTES</UnderlinedLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}