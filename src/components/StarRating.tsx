interface StarRatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  onChange?: (value: number) => void;
}

const sizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
  xl: 'text-3xl',
};

export default function StarRating({
  value,
  max = 5,
  size = 'md',
  interactive = false,
  onChange,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(value);
        const partial = !filled && i < value;
        const starValue = i + 1;

        return (
          <button
            key={i}
            type={interactive ? 'button' : undefined}
            disabled={!interactive}
            onClick={interactive ? () => onChange?.(starValue) : undefined}
            className={`${sizes[size]} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} leading-none`}
            aria-label={interactive ? `${starValue} estrela${starValue !== 1 ? 's' : ''}` : undefined}
          >
            {filled ? (
              <span className="text-park-yellow">★</span>
            ) : partial ? (
              <span className="relative inline-block">
                <span className="text-gray-300">★</span>
                <span
                  className="absolute inset-0 overflow-hidden text-park-yellow"
                  style={{ width: `${(value % 1) * 100}%` }}
                >
                  ★
                </span>
              </span>
            ) : (
              <span className="text-gray-300">★</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
