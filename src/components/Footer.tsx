import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-park-blue-dark text-blue-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎢</span>
              <span
                className="text-xl font-black text-white"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Beto<span className="text-park-yellow">Avalia</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-blue-200">
              A plataforma de avaliações das atrações do Beto Carrero World. Compartilhe sua experiência e ajude outros visitantes!
            </p>
          </div>

          <div>
            <h3
              className="text-white font-bold mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Navegação
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Início' },
                { to: '/brinquedos', label: 'Brinquedos' },
                { to: '/ranking', label: 'Ranking' },
                { to: '/avaliacoes', label: 'Avaliações' },
                { to: '/sobre', label: 'Sobre' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-white font-bold mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Categorias
            </h3>
            <ul className="space-y-2 text-sm text-blue-200">
              {['Montanhas-russas', 'Família', 'Infantil', 'Radical', 'Shows'].map((cat) => (
                <li key={cat}>{cat}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-blue-300 leading-relaxed">
            Este é um projeto independente de avaliações e não possui vínculo oficial com o Beto Carrero World.
          </p>
          <p className="text-xs text-blue-400 mt-2">
            © {new Date().getFullYear()} BetoAvalia · Feito com ❤️ por fãs do parque
          </p>
        </div>
      </div>
    </footer>
  );
}
