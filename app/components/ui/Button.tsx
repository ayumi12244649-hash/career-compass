type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "danger" | "secondary";
};

export default function Button({
  children,
  onClick,
  disabled,
  type = "button",
  variant = "primary",
}: Props) {
  const color = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

    secondary:
      "bg-slate-200 hover:bg-slate-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-xl
        px-5
        py-3
        font-semibold
        transition
        disabled:opacity-50
        ${color[variant]}
      `}
    >
      {children}
    </button>
  );
}