"use client";

type ToastProps = {
  message: string;
  type?: "success" | "error";
};

export default function Toast({
  message,
  type = "success",
}: ToastProps) {
  return (
    <div
      className={`
        fixed
        top-6
        right-6
        z-50
        rounded-xl
        px-5
        py-3
        text-white
        shadow-lg
        transition-all
        ${
          type === "success"
            ? "bg-green-600"
            : "bg-red-600"
        }
      `}
    >
      {message}
    </div>
  );
}