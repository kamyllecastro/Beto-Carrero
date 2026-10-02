import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { type Ride, categoryLabels, intensityColors } from '../data/rides';

interface RideCardProps {
  ride: Ride;
}

export default function RideCard({ ride }: RideCardProps) {
  return (
    <Link
      to={`/brinquedos/${ride.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-park-blue/10 transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className="relative h-48 bg-blue-100 overflow-hidden">
        <img
          src={ride.image}
          alt={ride.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${intensityColors[ride.intensity]}`}
          >
            {ride.intensity}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-park-blue text-white">
            {categoryLabels[ride.category]}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-bold text-gray-900 text-base mb-1 group-hover:text-park-blue transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {ride.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <StarRating value={ride.avgRating} size="sm" />
          <span className="text-sm font-bold text-park-yellow">{ride.avgRating.toFixed(1)}</span>
          <span className="text-xs text-gray-400">({ride.reviewCount.toLocaleString('pt-BR')})</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {ride.minHeight && (
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              📏 Min. {ride.minHeight}cm
            </span>
          )}
          {ride.minAge && (
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              👶 +{ride.minAge} anos
            </span>
          )}
        </div>

        <div className="mt-auto">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-park-blue group-hover:gap-2 transition-all">
            Ver avaliações
            <span>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
