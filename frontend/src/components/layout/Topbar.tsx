import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
        flex
        h-20
        items-center
        justify-between
        border-b
        border-border
        bg-surface
        px-6
      "
    >
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

      {/* Right */}
      <div className="flex items-center gap-4">
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
