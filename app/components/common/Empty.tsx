type Props = {
  message: string;
};

export default function Empty({
  message,
}: Props) {
  return (
    <div className="text-center py-10 text-gray-500">
      {message}
    </div>
  );
}