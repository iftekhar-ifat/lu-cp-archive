"use client";

import AchievementDialog, {
  type Badge,
} from "@/components/profile/achievements/achievement-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Medal } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { unwrapActionResult } from "@/utils/error-helper";
import { type AchievementType } from "@/types/types";
import { format } from "date-fns";
import Loading from "@/components/shared/loading";
import { getUserAchievements } from "../profile-actions";
import { type User } from "next-auth";

const ACHIEVEMENT_IMAGE_MAP: Record<AchievementType, string> = {
  CHAMPION: "/assets/champion.svg",
  FIRST_RUNNER_UP: "/assets/first-runner-up.svg",
  SECOND_RUNNER_UP: "/assets/second-runner-up.svg",
  BEST_FEMALE_PROGRAMMER: "/assets/best-female-programmer.svg",
};

const ACHIEVEMENT_COLOR_MAP: Record<AchievementType, string> = {
  CHAMPION: "#f43f5e",
  FIRST_RUNNER_UP: "#06b6d4",
  SECOND_RUNNER_UP: "#84cc16",
  BEST_FEMALE_PROGRAMMER: "#ec4899",
};

const ACHIEVEMENT_LABEL_MAP: Record<AchievementType, string> = {
  CHAMPION: "Champion",
  FIRST_RUNNER_UP: "1st Runner-up",
  SECOND_RUNNER_UP: "2nd Runner-up",
  BEST_FEMALE_PROGRAMMER: "Best Female Programmer",
};

export default function Achievements({ user }: { user: User }) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: badges, isLoading } = useQuery({
    queryKey: ["user-achievements", user.id],
    queryFn: async () => {
      const result = await getUserAchievements(user.id);
      const unwrapped = unwrapActionResult(result);
      if (!unwrapped) return [];

      return unwrapped.reduce((acc: Badge[], a, index) => {
        const title = a.title as AchievementType;
        const period = `${format(new Date(a.start_date), "MMM yyyy")} – ${format(new Date(a.end_date), "MMM yyyy")}`;

        if (title === "BEST_FEMALE_PROGRAMMER") {
          // Check if there's already a ranked badge for the same period
          const existing = acc.find((b) => b.period === period);
          if (existing) {
            existing.extraBadge = {
              title: ACHIEVEMENT_LABEL_MAP[title],
              image: ACHIEVEMENT_IMAGE_MAP[title],
              color: ACHIEVEMENT_COLOR_MAP[title],
            };
            return acc;
          }
        }

        acc.push({
          id: index,
          title: ACHIEVEMENT_LABEL_MAP[title],
          period,
          image: ACHIEVEMENT_IMAGE_MAP[title],
          color: ACHIEVEMENT_COLOR_MAP[title],
        });

        return acc;
      }, []);
    },
    staleTime: Infinity,
  });

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
    setDialogOpen(true);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded bg-accent p-2">
              <Medal className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl font-semibold">
              Achievements
            </CardTitle>
          </div>
          <CardDescription className="text-sm">
            Badges and milestones you&apos;ve earned
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!badges || badges.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No achievements yet.
            </p>
          ) : (
            <div
              className={cn(
                "grid gap-4",
                badges.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              )}
            >
              {badges.map((badge) => (
                <button
                  key={badge.id}
                  onClick={() => handleBadgeClick(badge)}
                  className="group flex cursor-pointer flex-col items-center rounded-xl border bg-muted/30 p-4 text-center transition-all duration-300 hover:scale-[1.02] hover:bg-muted/60 hover:shadow-md"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={badge.image}
                    alt={badge.title}
                    className="mb-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  <p className="text-base font-semibold">{badge.title}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground/70">
                    {badge.period}
                  </p>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AchievementDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        badge={selectedBadge}
        user={user}
      />
    </>
  );
}
