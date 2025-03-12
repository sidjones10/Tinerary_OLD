import Link from "next/link"
import { Bell, Bookmark, Calendar, Compass, Home, Settings, User, Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function MobileNav() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">Jessica Chen</p>
          <p className="text-xs text-muted-foreground">@jesschen</p>
        </div>
      </div>

      <ScrollArea className="flex-1 border-t">
        <div className="p-2">
          <nav className="grid grid-flow-row auto-rows-max text-sm">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/explore"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Compass className="h-4 w-4" />
              <span>Explore</span>
            </Link>
            <Link
              href="/saved"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Bookmark className="h-4 w-4" />
              <span>Saved</span>
            </Link>
            <Link
              href="/calendar"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </Link>
            <Link
              href="/notifications"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
            <Link
              href="/promote"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Star className="h-4 w-4" />
              <span>Promote</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <Link href="/create">
          <Button className="w-full btn-sunset">Create New</Button>
        </Link>
      </div>
    </div>
  )
}

