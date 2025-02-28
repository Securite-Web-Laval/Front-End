"use client";
import Logo from "@/components/header/logo";
import { useSession } from "next-auth/react";
import { TopBar } from "./navigation-menu";
import { ProfileButton } from "./profile-button";
import { ModeToggle } from "./theme-toggle";


export default function Header({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full h-20 top-0 border-b border-dashed flex flex-row justify-start items-center fixed  p-4">
        <div className="flex items-center gap-4 h-28 w-28">
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <TopBar />
        </div>
        <div className="flex items-center gap-4 ml-auto p-4">
          <ModeToggle />
          <ProfileButton username={session?.user?.username} email={session?.user?.email} userId={session?.user?._id} />
        </div>
      </div>
      <div className="w-full mt-20 min-h-[calc(100vh-5rem)] overflow-hidden">
        {children}
      </div>
    </div>
  );
}