"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserContext } from "./UserProvider";
import { useContext } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const userContext = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("token");

    userContext?.setToken(null);
    userContext?.setUserData(null);

    router.push("/login");
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
