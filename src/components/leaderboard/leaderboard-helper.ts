import { type SearchParams } from "@/app/dashboard/leaderboard/page";
import {
  type LeaderboardDateType,
  type Leaderboard,
} from "@/utils/schema/leaderboard";

export function isolateTopThree(leaderboard: Leaderboard[]) {
  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);
  return { topThree, rest };
}

export function formattedLBDates(
  leaderboardDates: LeaderboardDateType[],
  searchParams: SearchParams
): {
  latestLBDate: { year: number; month: number } | null;
  otherLBDates: LeaderboardDateType[];
} {
  let latestLBDate: { year: number; month: number } | null = null;

  if (searchParams.latest) {
    latestLBDate = leaderboardDates[0] || null;
  } else {
    latestLBDate =
      leaderboardDates.find(
        (date) =>
          date.year === searchParams.year && date.month === searchParams.month
      ) || null;
  }

  const otherLBDates = leaderboardDates.filter(
    (date) =>
      !(
        latestLBDate &&
        date.year === latestLBDate.year &&
        date.month === latestLBDate.month
      )
  );

  return {
    latestLBDate,
    otherLBDates,
  };
}
