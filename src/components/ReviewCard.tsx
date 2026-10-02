import StarRating from './StarRating';
import { type Review } from '../data/reviews';
import { useApp } from '../context/AppContext';

interface ReviewCardProps {
  review: Review;
  showRide?: boolean;
}

export default function ReviewCard({ review, showRide = false }: ReviewCardProps) {
  const { getRideById } = useApp();
  const ride = showRide ? getRideById(review.rideId) : null;

  const formattedDate = new Date(review.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const initials = review.userName
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const avatarColors = [
    'bg-park-blue text-white',
    'bg-park-red text-white',
    'bg-park-yellow text-white',
    'bg-purple-500 text-white',
    'bg-green-600 text-white',
  ];
  const colorIdx = review.userName.charCodeAt(0) % avatarColors.length;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${avatarColors[colorIdx]}`}
        >
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <span className="font-bold text-gray-900 text-sm">{review.userName}</span>
            <span className="text-xs text-gray-400">{formattedDate}</span>
          </div>

          {showRide && ride && (
            <p className="text-xs text-park-blue font-semibold mb-2">{ride.name}</p>
          )}

          <div className="flex items-center gap-2 mb-3">
            <StarRating value={review.rating} size="sm" />
            <span className="text-xs font-bold text-park-yellow">{review.rating}.0</span>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>

          <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-gray-100">
            {review.ageGroup && (
              <span className="text-xs text-gray-500">
                👤 {review.ageGroup} anos
              </span>
            )}
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                review.wouldReturn
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {review.wouldReturn ? '✓ Voltaria' : '✗ Não voltaria'}
            </span>
            {review.helpful > 0 && (
              <span className="text-xs text-gray-400 ml-auto">
                👍 {review.helpful} acharam útil
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
