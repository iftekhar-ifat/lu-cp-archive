import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Leaderboard } from "@/utils/schema/leaderboard";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import AchievementAssignDropdown from "../achievement-assign-dropdown";

const baseColumns: ColumnDef<Leaderboard>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => {
      return <div className="font-mono font-medium">{row.original.rank}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original.user;
      return <div>{user.name}</div>;
    },
  },
  {
    accessorKey: "userId",
    header: "User Id",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <Link href={`/profile/@${user.user_name}`}>
          <Badge
            variant="secondary"
            className="w-fit max-w-full truncate px-2 text-xs hover:scale-[1.02]"
          >
            @{user.user_name}
          </Badge>
        </Link>
      );
    },
  },
  {
    id: "points",
    header: "Points",
    cell: ({ row }) => {
      return (
        <div className="font-mono font-medium">{row.original.total_points}</div>
      );
    },
  },
];

const actionsColumn: ColumnDef<Leaderboard> = {
  id: "actions",
  header: "Actions",
  cell: ({ row }) => {
    const selectedUser = row.original;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <AchievementAssignDropdown />
      </DropdownMenu>
    );
  },
};

export const leaderboard_table_column = (
  canAssignAchievements: boolean
): ColumnDef<Leaderboard>[] => [
  ...baseColumns,
  ...(canAssignAchievements ? [actionsColumn] : []),
];
