type Props = {
  points?: string[];
};

export function ReviewDetails({ points }: Props) {
  if (!points?.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Review</h3>
      <ul className="space-y-3 list-disc list-inside text-neutral-700 dark:text-neutral-300">
        {points.map((point, index) => (
          <li key={index} className="text-base leading-relaxed">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
