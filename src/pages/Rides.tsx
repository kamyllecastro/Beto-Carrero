import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RideCard from '../components/RideCard';
import { type Category, categoryLabels } from '../data/rides';

type SortOption = 'rating' | 'reviews' | 'name';

const categoryFilters: Array<{ value: 'all' | Category; label: string; emoji: string }> = [
  { value: 'all', label: 'Todos', emoji: '🎡' },
  { value: 'montanha-russa', label: 'Montanhas-russas', emoji: '🎢' },
  { value: 'familia', label: 'Família', emoji: '👨‍👩‍👧' },
  { value: 'infantil', label: 'Infantil', emoji: '🧒' },
  { value: 'radical', label: 'Radical', emoji: '⚡' },
  { value: 'shows', label: 'Shows', emoji: '🎭' },
];

export default function Rides() {
  const { rides } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = (searchParams.get('categoria') as Category) || 'all';
  const initialQ = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState<'all' | Category>(initialCategory as 'all' | Category);
  const [search, setSearch] = useState(initialQ);
  const [sort, setSort] = useState<SortOption>('rating');

  function setCategory(cat: 'all' | Category) {
    setActiveCategory(cat);
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') {
      params.delete('categoria');
    } else {
      params.set('categoria', cat);
    }
    setSearchParams(params);
  }

  const filtered = useMemo(() => {
    let result = [...rides];

    if (activeCategory !== 'all') {
      result = result.filter((r) => r.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    result.sort((a, b) => {
      if (sort === 'rating') return b.avgRating - a.avgRating;
      if (sort === 'reviews') return b.reviewCount - a.reviewCount;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [rides, activeCategory, search, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-black text-gray-900 mb-2"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          🎢 Brinquedos
        </h1>
        <p className="text-gray-500">
          Explore todas as {rides.length} atrações do Beto Carrero World
        </p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar atração..."
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-park-blue/30 focus:border-park-blue font-medium text-gray-800 placeholder-gray-400"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-park-blue/30 focus:border-park-blue font-semibold text-gray-700 min-w-48"
        >
          <option value="rating">⭐ Mais bem avaliados</option>
          <option value="reviews">💬 Mais avaliados</option>
          <option value="name">🔤 Nome (A-Z)</option>
        </select>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categoryFilters.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === cat.value
                ? 'bg-park-blue text-white shadow-md shadow-park-blue/20'
                : 'bg-white text-gray-600 hover:border-park-blue hover:text-park-blue border border-gray-200'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-6">
        {filtered.length} atração{filtered.length !== 1 ? 'ões' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3
            className="text-xl font-bold text-gray-700 mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Nenhuma atração encontrada
          </h3>
          <p className="text-gray-500">Tente outros termos ou remova os filtros aplicados.</p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('all');
            }}
            className="mt-4 text-park-blue font-semibold hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
