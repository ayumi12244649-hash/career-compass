import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        bg-white
        rounded-xl
        shadow
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}