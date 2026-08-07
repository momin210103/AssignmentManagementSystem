type AlertProps = {
  message: string;
};

export default function Alert({ message }: AlertProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
      {message}
    </div>
  );
}
