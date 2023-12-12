"use client";

import { UserNav } from "@/(components)/navbar/components/user-nav";
import TeamSwitcher from "@/(components)/navbar/components/team-switcher";
import { MainNav } from "@/(components)/navbar/components/main-nav";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [status, setStatus] = useState("unauthenticated");
  const session = useSession();
  useEffect(() => {
    console.log(session.status);
    if (session.status === "authenticated") {
      setStatus("authenticated");
      console.log(session);
    }
  }, [session]);
  return <>{status === "authenticated" ? <NAV /> : <></>}</>;
}

const NAV = () => {
  return (
    <div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
