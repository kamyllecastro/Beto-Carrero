import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ReviewCard from '../components/ReviewCard';
import StarRating from '../components/StarRating';
import { categoryLabels, type Category } from '../data/rides';

const categories: Array<{ value: 'all' | Category; label: string; emoji: string }> = [
  { value: 'all', label: 'Todos', emoji: '🎡' },
  { value: 'montanha-russa', label: 'Montanhas-russas', emoji: '🎢' },
  { value: 'familia', label: 'Família', emoji: '👨‍👩‍👧' },
  { value: 'infantil', label: 'Infantil', emoji: '🧒' },
  { value: 'radical', label: 'Radical', emoji: '⚡' },
  { value: 'shows', label: 'Shows', emoji: '🎭' },
];

export default function Home() {
  const { rides, reviews } = useApp();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | Category>('all');
  const navigate = useNavigate();

  const latestReviews = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const rankingTop5 = [...rides]
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 5);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/brinquedos?q=${encodeURIComponent(search.trim())}`);
    }
  }

  function handleCategoryFilter(cat: 'all' | Category) {
    if (cat === 'all') {
      navigate('/brinquedos');
    } else {
      navigate(`/brinquedos?categoria=${cat}`);
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-park-blue-dark via-park-blue to-blue-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {['🎢', '⭐', '🎡', '🎭', '🎠', '🎪'].map((emoji, i) => (
            <span
              key={i}
              className="absolute text-4xl select-none animate-pulse"
              style={{
                top: `${15 + i * 14}%`,
                left: `${5 + i * 16}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-park-yellow text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <span>⭐</span>
            <span>+{rides.reduce((s, r) => s + r.reviewCount, 0).toLocaleString('pt-BR')} avaliações</span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Qual é o melhor brinquedo do{' '}
            <span className="text-park-yellow">Beto Carrero?</span>
          </h1>

          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Leia avaliações reais, descubra as atrações mais amadas e compartilhe sua experiência no maior parque temático da América Latina!
          </p>

          <form onSubmit={handleSearch} className="flex max-w-xl mx-auto gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquise por um brinquedo..."
              className="flex-1 px-5 py-3.5 rounded-xl text-gray-800 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-park-yellow shadow-lg"
            />
            <button
              type="submit"
              className="bg-park-yellow hover:bg-yellow-400 text-park-blue-dark font-bold px-6 py-3.5 rounded-xl transition-colors shadow-lg"
            >
              🔍
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryFilter(cat.value)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all backdrop-blur-sm"
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Latest Reviews */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                💬 Últimas avaliações
              </h2>
              <Link
                to="/avaliacoes"
                className="text-park-blue font-semibold text-sm hover:underline"
              >
                Ver todas →
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {latestReviews.map((review) => (
                <ReviewCard key={review.id} review={review} showRide />
              ))}
            </div>
          </section>

          {/* Ranking Sidebar */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                📊 Ranking geral
              </h2>
              <Link
                to="/ranking"
                className="text-park-blue font-semibold text-sm hover:underline"
              >
                Completo →
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {rankingTop5.map((ride, idx) => (
                <Link
                  key={ride.id}
                  to={`/brinquedos/${ride.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-park-blue-light transition-colors border-b border-gray-50 last:border-0 group"
                >
                  <span
                    className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center font-black text-sm ${
                      idx === 0
                        ? 'bg-park-yellow text-park-blue-dark'
                        : idx === 1
                          ? 'bg-gray-200 text-gray-700'
                          : idx === 2
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-50 text-park-blue'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {idx + 1}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-900 truncate group-hover:text-park-blue transition-colors">
                      {ride.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-park-yellow h-1.5 rounded-full"
                          style={{ width: `${(ride.avgRating / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-park-yellow flex-shrink-0">
                        {ride.avgRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Stats Banner */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-park-blue to-blue-500 rounded-3xl p-8 text-white grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: rides.length, label: 'Atrações', emoji: '🎢' },
              {
                value: rides.reduce((s, r) => s + r.reviewCount, 0).toLocaleString('pt-BR'),
                label: 'Avaliações',
                emoji: '⭐',
              },
              {
                value: (
                  rides.reduce((s, r) => s + r.avgRating, 0) / rides.length
                ).toFixed(1),
                label: 'Nota média',
                emoji: '📊',
              },
              {
                value: `${Math.round((rides.filter((r) => r.avgRating >= 4.5).length / rides.length) * 100)}%`,
                label: 'Altamente avaliadas',
                emoji: '🏆',
              },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl mb-1">{stat.emoji}</div>
                <div
                  className="text-3xl font-black"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {stat.value}
                </div>
                <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
