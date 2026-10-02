import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ReviewCard from '../components/ReviewCard';
import StarRating from '../components/StarRating';

type SortOption = 'recent' | 'rating-high' | 'rating-low' | 'helpful';
type ViewOption = 'rides' | 'stories';

export default function Reviews() {
  const { reviews, rides } = useApp();
  const [view, setView] = useState<ViewOption>('rides');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [rideFilter, setRideFilter] = useState<string>('all');
  const [sort, setSort] = useState<SortOption>('recent');

  const filtered = useMemo(() => {
    let result = [...reviews];

    if (ratingFilter !== 'all') {
      result = result.filter((r) => r.rating === ratingFilter);
    }
    if (rideFilter !== 'all') {
      result = result.filter((r) => r.rideId === rideFilter);
    }

    result.sort((a, b) => {
      if (sort === 'recent') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sort === 'rating-high') return b.rating - a.rating;
      if (sort === 'rating-low') return a.rating - b.rating;
      return b.helpful - a.helpful;
    });

    return result;
  }, [reviews, ratingFilter, rideFilter, sort]);

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const pct5 = Math.round((reviews.filter((r) => r.rating === 5).length / reviews.length) * 100);
  const rankedRides = [...rides].sort((a, b) => b.avgRating - a.avgRating);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-7">
        <span className="inline-flex rounded-full bg-park-blue-light px-3 py-1 text-sm font-bold text-park-blue mb-3">
          Opiniões da comunidade
        </span>
        <h1
          className="text-3xl md:text-4xl font-black text-gray-900 mb-2"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Avaliações do parque
        </h1>
        <p className="text-gray-500">
          Compare as notas dos brinquedos ou leia os relatos completos de quem já visitou.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-2xl font-black text-park-blue">{avgRating.toFixed(1)}</p>
          <p className="text-sm text-gray-500">média da comunidade</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-2xl font-black text-park-blue">{reviews.length}</p>
          <p className="text-sm text-gray-500">relatos publicados</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-2xl font-black text-park-blue">{pct5}%</p>
          <p className="text-sm text-gray-500">deram nota máxima</p>
        </div>
      </div>

      <div
        className="bg-white rounded-2xl p-1.5 shadow-sm mb-8 grid grid-cols-2"
        role="tablist"
        aria-label="Tipos de avaliação"
      >
        <button
          type="button"
          role="tab"
          aria-selected={view === 'rides'}
          onClick={() => setView('rides')}
          className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
            view === 'rides'
              ? 'bg-park-blue text-white shadow-sm'
              : 'text-gray-500 hover:text-park-blue'
          }`}
        >
          Notas dos brinquedos
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === 'stories'}
          onClick={() => setView('stories')}
          className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
            view === 'stories'
              ? 'bg-park-blue text-white shadow-sm'
              : 'text-gray-500 hover:text-park-blue'
          }`}
        >
          Avaliações em texto
        </button>
      </div>

      {view === 'rides' ? (
        <section aria-labelledby="ride-ratings-title">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <h2
                id="ride-ratings-title"
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Encontre o brinquedo que você quer avaliar
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Veja a nota atual e entre na página da atração para deixar sua avaliação.
              </p>
            </div>
            <Link to="/brinquedos" className="text-sm font-bold text-park-blue hover:underline">
              Explorar todas as atrações
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rankedRides.map((ride, index) => (
              <article
                key={ride.id}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
              >
                <img
                  src={ride.image}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-park-blue">#{index + 1}</span>
                    <h3 className="font-bold text-gray-900 truncate">{ride.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating value={ride.avgRating} size="sm" />
                    <span className="text-sm font-black text-park-yellow">
                      {ride.avgRating.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {ride.reviewCount.toLocaleString('pt-BR')} notas
                    </span>
                  </div>
                  <Link
                    to={`/brinquedos/${ride.id}`}
                    className="inline-flex mt-2 text-sm font-bold text-park-blue hover:underline"
                  >
                    Avaliar este brinquedo
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section aria-labelledby="written-reviews-title">
          <div className="mb-6">
            <h2
              id="written-reviews-title"
              className="text-2xl font-black text-gray-900"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Relatos dos visitantes
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Experiências detalhadas para ajudar você a planejar o seu dia no parque.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 flex flex-col lg:flex-row gap-3">
            <select
              value={rideFilter}
              onChange={(e) => setRideFilter(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-park-blue/30 focus:border-park-blue text-sm font-medium"
              aria-label="Filtrar por atração"
            >
              <option value="all">Todas as atrações</option>
              {rides.map((ride) => (
                <option key={ride.id} value={ride.id}>
                  {ride.name}
                </option>
              ))}
            </select>

            <div className="flex gap-2 overflow-x-auto" aria-label="Filtrar por nota">
              {['all', 5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRatingFilter(star as number | 'all')}
                  className={`px-3 py-2.5 rounded-xl text-sm font-bold transition-all flex-shrink-0 ${
                    ratingFilter === star
                      ? 'bg-park-yellow text-park-blue-dark shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {star === 'all' ? 'Todas' : `${star}★`}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-park-blue/30 focus:border-park-blue text-sm font-medium"
              aria-label="Ordenar avaliações"
            >
              <option value="recent">Mais recentes</option>
              <option value="rating-high">Maior nota</option>
              <option value="rating-low">Menor nota</option>
              <option value="helpful">Mais úteis</option>
            </select>
          </div>

          <p className="text-sm text-gray-500 mb-5">
            {filtered.length} avaliação{filtered.length !== 1 ? 'ões' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
          </p>

          {filtered.length > 0 ? (
            <div className="flex flex-col gap-4 max-w-4xl">
              {filtered.map((review) => (
                <ReviewCard key={review.id} review={review} showRide />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl">
              <h3
                className="text-xl font-bold text-gray-700 mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Nenhuma avaliação encontrada
              </h3>
              <p className="text-gray-400 text-sm">Tente remover os filtros aplicados.</p>
              <button
                type="button"
                onClick={() => { setRatingFilter('all'); setRideFilter('all'); }}
                className="mt-4 text-park-blue font-semibold hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
