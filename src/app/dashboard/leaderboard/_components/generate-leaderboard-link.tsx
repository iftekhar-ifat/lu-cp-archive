"use client";

import { Button } from "@/components/ui/button";
import { hasPermission } from "@/utils/permissions";
import { Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function GenerateLeaderboardLink() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const hasPermissionToGenerate = hasPermission(
    session.user.user_type,
    "generate-leaderboard"
  );

  if (!hasPermissionToGenerate) {
    return null;
  }

  return (
    <div className="flex space-x-2">
      <Button variant="outline" asChild>
        <Link href="/dashboard/leaderboard/generate-leaderboard">
          <Sparkles />
          Generate Leaderboard
        </Link>
      </Button>
    </div>
  );
}
