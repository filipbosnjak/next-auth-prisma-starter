import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/messages"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Messages
      </Link>
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/ablyauth"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        AblyAuth
      </Link>
      <Link
        href="/pubsub"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        PubSub
      </Link>
      <Link
        href="/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
}
