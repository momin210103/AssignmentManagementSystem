import { Bell, Menu, Search, X } from "lucide-react";

type Props = {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
};

export default function Topbar({ isSidebarOpen, onMenuClick }: Props) {
  return (
    <header
      className="
        flex
        h-25
        items-center
        justify-between
        gap-3
        border-b
        border-border
        bg-surface
        px-4
        sm:px-6
      "
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {/* Sidebar toggle — visible only below lg */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={isSidebarOpen}
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-border
            bg-surface
            transition
            hover:bg-background
            lg:hidden
          "
        >
          {isSidebarOpen ? (
            <X size={20} className="text-text-secondary" />
          ) : (
            <Menu size={20} className="text-text-secondary" />
          )}
        </button>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-text-muted
            "
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
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-4">
        {/* Notification */}
        <button
          type="button"
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
          title="Notifications"
        >
          <Bell size={20} className="text-text-secondary" />

          <span
            className="
              absolute
              right-3
              top-3
              h-2
              w-2
              rounded-full
              bg-danger
            "
          />
        </button>
      </div>
    </header>
  );
}
