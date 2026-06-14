import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserInfo } from "@/types/user.types"
import { Key, LogOut, User } from "lucide-react"
import Link from "next/link"

interface UserDropdownProps{
    userInfo : UserInfo
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-foreground shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 hover:bg-muted disabled:pointer-events-none disabled:opacity-50">
        <span>{userInfo.name.charAt(0).toUpperCase()}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={"end"} className="w-56">
            <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                        {userInfo.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {userInfo.email}
                    </p>

                    <p className="text-xs text-primary capitalize">
                        {userInfo.role.toLowerCase().replace("_", " ")}
                    </p>
                </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator/>

            <DropdownMenuItem className="cursor-pointer">
                <Link href={"/my-profile"} className="flex w-full items-center gap-2">
                  <User className="h-4 w-4" />
                  My Profile
                </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer">
                <Link href={"/change-password"} className="flex w-full items-center gap-2">
                  <Key className="h-4 w-4" />
                  Change Password
                </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator/>


            <DropdownMenuItem onClick={() => {}} className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4"/>
                Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown