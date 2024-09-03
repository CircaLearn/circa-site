"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const handleClick = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Failed to logout" + error);
    }
    console.log("clicked!");
  };
  return (
    <button onClick={handleClick} className="text-white font-semibold">
      Log Out
    </button>
  );
}
