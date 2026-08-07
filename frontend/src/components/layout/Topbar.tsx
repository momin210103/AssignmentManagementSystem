import { Bell, Search } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-surface px-8 shadow-card">
      {/* Search */}
      <div className="relative w-80">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
        />
        

        <input
          type="text"
          placeholder="Search..."
          className="
            h-11
            w-full
            rounded-xl
            border
            border-input-border
            bg-background
            pl-11
            pr-4
            text-sm
            text-text-primary
            outline-none
            transition-all
            focus:border-primary
            focus:bg-surface
          "
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-border
            bg-surface
            transition
            hover:bg-background
          "
        >
          <Bell size={20} className="text-text-secondary" />

          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-danger" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-background">
          <div className="text-right">
            <h4 className="font-semibold text-text-primary">
              {user?.fullName}
            </h4>

            <p className="text-xs text-text-secondary">{user?.role}</p>
          </div>

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-primary
              font-bold
              text-text-white
              shadow-button
            "
          >
            {user?.fullName?.charAt(0).toUpperCase() ?? "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
