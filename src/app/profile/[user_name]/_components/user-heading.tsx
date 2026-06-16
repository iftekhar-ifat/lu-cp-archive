"use client";

import UserTypeBadge from "@/components/shared/user-type-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { type users } from "@prisma/client";
import { User } from "lucide-react";

export default function UserHeading({ userData }: { userData: users }) {
  return (
    <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={userData.image ?? undefined} />
          <AvatarFallback>
            <User className="h-10 w-10" />
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 space-y-2">
          <h1 className="font-mono text-2xl font-bold tracking-wide [overflow-wrap:anywhere]">
            {userData.name}
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">@{userData.user_name}</Badge>
            <UserTypeBadge user_type={userData.user_type} />
          </div>
        </div>
      </div>
    </div>
  );
}
