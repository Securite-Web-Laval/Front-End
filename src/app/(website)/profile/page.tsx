'use client'
import ModifyProfileForm from "@/components/profile/modify-profile-form";
import { userGetOne } from "@/lib/services/user";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userGetOne(`users/${session?.user?._id}`);
      setUser(user);
    };
    fetchUser();
  }, [session]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1>Profile</h1>
      <p>{session?.user?.username}</p>
      <ModifyProfileForm user={user} session={session} />
    </div>
  );
}