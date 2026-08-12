import { AlertTriangle, X } from "lucide-react";

type ConfirmAlertProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmAlert({
  isOpen,
  title = "Are you sure?",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmAlertProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-surface
          shadow-card
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-danger/10
                text-danger
              "
            >
              <AlertTriangle size={20} />
            </div>

            <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          </div>

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="
              rounded-lg
              p-2
              text-text-secondary
              transition
              hover:bg-background
              hover:text-text-primary
              disabled:opacity-50
            "
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Message */}
        <div className="px-5 py-5">
          <p className="text-sm leading-6 text-text-secondary">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-border px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="
              h-10
              rounded-lg
              border
              border-border
              px-4
              text-sm
              font-medium
              text-text-secondary
              transition
              hover:bg-background
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="
              h-10
              rounded-lg
              bg-danger
              px-4
              text-sm
              font-medium
              text-white
              transition
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isLoading ? "Removing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
