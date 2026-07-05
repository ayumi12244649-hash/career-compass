type Props = {
  title: string;
  emoji?: string;
};

export default function SectionHeader({
  title,
  emoji,
}: Props) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="text-3xl">
        {emoji}
      </span>

      <h2 className="text-2xl font-bold">
        {title}
      </h2>
    </div>
  );
}