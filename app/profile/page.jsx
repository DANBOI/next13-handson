"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MyProfile() {
  const session = { user: { id: "646b5f8820006f4aaeebab3a" } };
  const userId = session?.user.id;
  const router = useRouter();

  useEffect(() => {
    router.push(`/profile/${userId}`);
  }, []);
}
