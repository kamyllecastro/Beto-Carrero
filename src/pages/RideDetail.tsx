import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import { categoryLabels, intensityColors } from '../data/rides';

const ageGroups = ['Menos de 18', '18-24', '25-34', '35-44', '45-54', '55+'];

export default function RideDetail() {
  const { id } = useParams<{ id: string }>();
  const { getRideById, getRideReviews, addReview, user } = useApp();

  const ride = getRideById(id!);
  const rideReviews = getRideReviews(id!);

  const [formRating, setFormRating] = useState(0);
  const [comment, setComment] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [wouldReturn, setWouldReturn] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  if (!ride) return <Navigate to="/brinquedos" replace />;

  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: rideReviews.filter((r) => r.rating === star).length,
    pct: rideReviews.length
      ? Math.round((rideReviews.filter((r) => r.rating === star).length / rideReviews.length) * 100)
      : 0,
  }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      setFormError('Faça login para avaliar.');
      return;
    }
    if (formRating === 0) { setFormError('Selecione uma nota de 1 a 5 estrelas.'); return; }
    if (!comment.trim()) { setFormError('Escreva um comentário.'); return; }
    if (wouldReturn === null) { setFormError('Informe se voltaria a andar.'); return; }

    addReview({
      rideId: ride!.id,
      userName: user.name,
      rating: formRating,
      comment: comment.trim(),
      ageGroup: ageGroup || undefined,
      wouldReturn,
    });

    setSubmitted(true);
    setFormRating(0);
    setComment('');
    setAgeGroup('');
    setWouldReturn(null);
    setFormError('');
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-park-blue transition-colors">Início</Link>
        <span>/</span>
        <Link to="/brinquedos" className="hover:text-park-blue transition-colors">Brinquedos</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{ride.name}</span>
      </nav>

      {/* Ride Header */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm mb-8">
        <div className="relative h-64 md:h-96 bg-blue-100">
          <img
            src={ride.image}
            alt={ride.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
          <div className="absolute bottom-6 left-6 flex gap-2">
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${intensityColors[ride.intensity]}`}>
              {ride.intensity}
            </span>
            <span className="text-sm font-bold px-3 py-1 rounded-full bg-park-blue text-white">
              {categoryLabels[ride.category]}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <h1
                className="text-3xl md:text-4xl font-black text-gray-900 mb-3"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {ride.name}
              </h1>
              <p className="text-gray-600 leading-relaxed mb-4">{ride.description}</p>

              <div className="flex flex-wrap gap-2">
                {ride.minHeight && (
                  <span className="bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-full">
                    📏 Altura mínima: {ride.minHeight}cm
                  </span>
                )}
                {ride.minAge && (
                  <span className="bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-full">
                    👶 Idade mínima: {ride.minAge} anos
                  </span>
                )}
                {ride.maxHeight && (
                  <span className="bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-full">
                    📏 Altura máxima: {ride.maxHeight}cm
                  </span>
                )}
              </div>
            </div>

            {/* Rating Summary */}
            <div className="md:w-64 flex-shrink-0">
              <div className="bg-park-surface rounded-2xl p-5">
                <div className="text-center mb-4">
                  <div
                    className="text-6xl font-black text-park-blue mb-1"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {ride.avgRating.toFixed(1)}
                  </div>
                  <StarRating value={ride.avgRating} size="lg" />
                  <p className="text-sm text-gray-500 mt-2">
                    {rideReviews.length.toLocaleString('pt-BR')} avaliações
                  </p>
                </div>

                <div className="space-y-2">
                  {ratingDist.map(({ star, count, pct }) => (
                    <div key={star} className="flex items-center gap-2 text-sm">
                      <span className="w-3 text-gray-600 font-semibold text-right">{star}</span>
                      <span className="text-park-yellow text-xs">★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-park-yellow h-1.5 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-6 text-gray-500 text-xs">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Reviews List */}
        <section className="lg:col-span-3">
          <h2
            className="text-2xl font-black text-gray-900 mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            💬 Avaliações ({rideReviews.length})
          </h2>

          {rideReviews.length > 0 ? (
            <div className="flex flex-col gap-4">
              {rideReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl">
              <div className="text-5xl mb-3">💭</div>
              <p className="text-gray-600 font-semibold">Nenhuma avaliação ainda.</p>
              <p className="text-gray-400 text-sm mt-1">Seja o primeiro a avaliar esta atração!</p>
            </div>
          )}
        </section>

        {/* Review Form */}
        <section className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
            <h2
              className="text-xl font-black text-gray-900 mb-5"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              ✍️ Avaliar esta atração
            </h2>

            {!user ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🔐</div>
                <p className="text-gray-600 font-semibold mb-4">
                  Faça login para avaliar esta atração
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-park-blue hover:bg-park-blue-dark text-white font-bold px-6 py-3 rounded-xl transition-colors"
                >
                  Fazer login
                </Link>
              </div>
            ) : (
              <>
                {submitted && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5 text-green-700 text-sm font-semibold flex items-center gap-2">
                    <span>✅</span>
                    <span>Avaliação enviada com sucesso! Obrigado!</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Sua nota *
                </label>
                <StarRating
                  value={formRating}
                  size="xl"
                  interactive
                  onChange={setFormRating}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Seu comentário *
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Conte sua experiência com esta atração..."
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-park-blue/30 focus:border-park-blue text-sm font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Faixa etária (opcional)
                </label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-park-blue/30 focus:border-park-blue text-sm font-medium"
                >
                  <option value="">Selecione...</option>
                  {ageGroups.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Voltaria a andar? *
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setWouldReturn(true)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                      wouldReturn === true
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-200 text-gray-600 hover:border-green-300'
                    }`}
                  >
                    ✓ Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setWouldReturn(false)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                      wouldReturn === false
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'border-gray-200 text-gray-600 hover:border-red-300'
                    }`}
                  >
                    ✗ Não
                  </button>
                </div>
              </div>

              {formError && (
                <p className="text-red-600 text-sm font-semibold">{formError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-park-blue hover:bg-park-blue-dark text-white font-bold py-3 rounded-xl transition-colors shadow-md shadow-park-blue/20"
              >
                Enviar avaliação ⭐
              </button>
            </form>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
