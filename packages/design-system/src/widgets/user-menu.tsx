/** Original design and implementation by Gustavo Fior (@gustavo-fior), with co-founder Abdul Haidar at Foglamp Labs.
 * Extracted AS-IS from .reference/foglamp/apps/web/src/components/user-menu.tsx; derived under Apache-2.0.
 */
"use client";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import { FoglampLink } from "../lib/link-context";
import { IconUserCircle } from "@tabler/icons-react";

export type UserMenuSession = { user: { email: string } };

/**
 * Account menu presentation with host-provided session state and sign-out
 * behavior. The default mock renders the signed-out state.
 */
export function UserMenuView({
  session = null,
  isPending = false,
  onSignOut = () => undefined,
  signInHref = "/login",
}: {
  session?: UserMenuSession | null;
  isPending?: boolean;
  onSignOut?: () => void;
  signInHref?: string;
}) {
  if (isPending) {
    return <Skeleton className="h-9 w-24" />;
  }

  if (!session) {
    return (
      <FoglampLink href={signInHref}>
        <Button variant="outline">Sign In</Button>
      </FoglampLink>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon-sm" />}>
        <IconUserCircle />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-card w-fit"
        align="end"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{session.user.email}</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={onSignOut}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const UserMenu = UserMenuView;
export default UserMenuView;
