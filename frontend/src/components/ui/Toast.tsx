type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  return (
    <div
      className="
        fixed
        right-5
        top-5
        z-50
        rounded-xl
        bg-success
        px-4
        py-3
        text-sm
        font-medium
        text-white
        shadow-lg
      "
    >
      {message}
    </div>
  );
}
