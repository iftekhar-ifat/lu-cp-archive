import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

export default function AchievementAssignDropdown() {
  function handleChangeUserType(type: string) {
    console.log(type);
  }
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => handleChangeUserType("ADMIN")}>
        Champion
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => handleChangeUserType("POWER")}>
        Runner-up
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleChangeUserType("STANDARD")}>
        Second Runner-Up
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleChangeUserType("STANDARD")}>
        Best Female Programmer
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
