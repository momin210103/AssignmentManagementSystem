type ToastProps = {
  message: string;
  type?: "success" | "error";
};

export default function Toast({ message, type = "success" }: ToastProps) {
  return (
    <div
      className={`
        fixed
        right-4
        top-4
        z-50
        max-w-[calc(100vw-2rem)]
        rounded-xl
        px-4
        py-3
        text-sm
        font-medium
        text-white
        shadow-lg
        sm:right-5
        sm:top-5
        ${type === "success" ? "bg-success" : "bg-danger"}
      `}
    >
      {message}
    </div>
  );
}
