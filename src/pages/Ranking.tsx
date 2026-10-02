import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StarRating from '../components/StarRating';
import { type Category, categoryLabels, intensityColors } from '../data/rides';

type FilterOption = 'all' | Category;

const filters: Array<{ value: FilterOption; label: string; emoji: string }> = [
  { value: 'all', label: 'Geral', emoji: '🏆' },
  { value: 'montanha-russa', label: 'Montanhas-russas', emoji: '🎢' },
  { value: 'familia', label: 'Família', emoji: '👨‍👩‍👧' },
  { value: 'infantil', label: 'Infantil', emoji: '🧒' },
  { value: 'radical', label: 'Radical', emoji: '⚡' },
  { value: 'shows', label: 'Shows', emoji: '🎭' },
];

const medalColors = [
  'bg-park-yellow text-park-blue-dark',
  'bg-gray-300 text-gray-700',
  'bg-amber-200 text-amber-800',
];

export default function Ranking() {
  const { rides } = useApp();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const ranked = [...rides]
    .filter((r) => activeFilter === 'all' || r.category === activeFilter)
    .sort((a, b) => b.avgRating - a.avgRating || b.reviewCount - a.reviewCount);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-black text-gray-900 mb-2"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          🏆 Ranking de Atrações
        </h1>
        <p className="text-gray-500">As atrações mais bem avaliadas pelos visitantes</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeFilter === f.value
                ? 'bg-park-blue text-white shadow-md shadow-park-blue/20'
                : 'bg-white text-gray-600 hover:text-park-blue border border-gray-200'
            }`}
          >
            <span>{f.emoji}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Podium Top 3 */}
      {ranked.length >= 3 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[ranked[1], ranked[0], ranked[2]].map((ride, podiumIdx) => {
            const actualRank = podiumIdx === 0 ? 2 : podiumIdx === 1 ? 1 : 3;
            const heights = ['h-28', 'h-36', 'h-24'];
            return (
              <Link
                key={ride.id}
                to={`/brinquedos/${ride.id}`}
                className="flex flex-col items-center group"
              >
                <div className={`w-16 h-16 rounded-full overflow-hidden border-4 mb-2 ${actualRank === 1 ? 'border-park-yellow' : actualRank === 2 ? 'border-gray-300' : 'border-amber-300'}`}>
                  <img src={ride.image} alt={ride.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-bold text-center text-gray-700 mb-1 group-hover:text-park-blue transition-colors line-clamp-1">
                  {ride.name}
                </p>
                <div className={`${heights[podiumIdx]} w-full rounded-t-xl flex flex-col items-center justify-start pt-2 ${
                  actualRank === 1 ? 'bg-park-yellow' : actualRank === 2 ? 'bg-gray-200' : 'bg-amber-100'
                }`}>
                  <span className="text-2xl font-black" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {actualRank === 1 ? '🥇' : actualRank === 2 ? '🥈' : '🥉'}
                  </span>
                  <span className="text-sm font-black text-gray-800">{ride.avgRating.toFixed(1)}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Full Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Atração</div>
          <div className="col-span-2 text-center">Nota</div>
          <div className="col-span-2 hidden sm:block text-center">Avaliações</div>
          <div className="col-span-2 hidden sm:block">Categoria</div>
        </div>

        {ranked.map((ride, idx) => (
          <Link
            key={ride.id}
            to={`/brinquedos/${ride.id}`}
            className="grid grid-cols-12 px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-park-blue-light transition-colors items-center group"
          >
            <div className="col-span-1">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${
                  idx < 3 ? medalColors[idx] : 'bg-gray-100 text-gray-600'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {idx + 1}
              </span>
            </div>

            <div className="col-span-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={ride.image} alt={ride.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm group-hover:text-park-blue transition-colors">
                  {ride.name}
                </p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${intensityColors[ride.intensity]}`}>
                  {ride.intensity}
                </span>
              </div>
            </div>

            <div className="col-span-2 flex flex-col items-center gap-1">
              <span className="font-black text-park-yellow text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {ride.avgRating.toFixed(1)}
              </span>
              <div className="w-full max-w-20 bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-park-yellow h-1.5 rounded-full"
                  style={{ width: `${(ride.avgRating / 5) * 100}%` }}
                />
              </div>
            </div>

            <div className="col-span-2 hidden sm:flex flex-col items-center">
              <span className="font-bold text-gray-700 text-sm">
                {ride.reviewCount.toLocaleString('pt-BR')}
              </span>
              <span className="text-xs text-gray-400">avaliações</span>
            </div>

            <div className="col-span-2 hidden sm:block">
              <span className="text-xs font-semibold bg-park-blue-light text-park-blue px-2.5 py-1 rounded-full">
                {categoryLabels[ride.category]}
              </span>
            </div>
          </Link>
        ))}

        {ranked.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-gray-500 font-semibold">Nenhuma atração nesta categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
