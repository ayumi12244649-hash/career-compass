import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  title,
  children,
  className = "",
}: Props) {
  return (
    <section className={className}>
      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>

      {children}
    </section>
  );
}