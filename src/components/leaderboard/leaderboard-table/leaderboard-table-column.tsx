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

export const leaderboard_table_column: ColumnDef<Leaderboard>[] = [
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
  {
    id: "actions",
    header: "Actions",
    enableHiding: true,
    cell: ({ row }) => {
      const selectedUser = row.original;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      // const queryClient = useQueryClient();

      /* const handleChangeUserType = async (newType: USER_TYPE) => {
        const userId = selectedUser.id;
        toast.promise(
          async () => {
            const actionResult = await changeUserType({ userId, newType });
            const result = unwrapActionResult(actionResult);
            queryClient.invalidateQueries({
              queryKey: ["standard-users"],
            });
            return result;
          },
          {
            loading: (
              <>
                Changing to <UserTypeBadge user_type={newType} />
              </>
            ),
            success: (
              <>
                User is now <UserTypeBadge user_type={newType} />
              </>
            ),
            error: "Failed to change user type",
          }
        );
      }; */
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
  },
];
