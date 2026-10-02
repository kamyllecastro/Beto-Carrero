import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const navItems = [
  { to: '/', label: 'Início', exact: true },
  { to: '/brinquedos', label: 'Brinquedos' },
  { to: '/ranking', label: 'Ranking' },
  { to: '/avaliacoes', label: 'Avaliações' },
  { to: '/sobre', label: 'Sobre' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-park-blue shadow-lg shadow-park-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-2xl">🎢</span>
            <span
              className="text-xl font-black text-white tracking-tight"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Beto
              <span className="text-park-yellow">Avalia</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-park-blue'
                      : 'text-blue-100 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-white text-sm font-semibold">
                  Olá, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg transition-all"
                >
                  Sair
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-white text-sm font-semibold hover:bg-white/10 rounded-lg transition-all"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="px-4 py-2 bg-park-yellow hover:bg-yellow-400 text-park-blue-dark text-sm font-bold rounded-lg transition-all"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-white rounded transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
              />
              <span
                className={`block h-0.5 bg-white rounded transition-all ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 bg-white rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-80' : 'max-h-0'}`}
      >
        <nav className="px-4 pb-4 flex flex-col gap-1 bg-park-blue-dark">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-park-blue'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="border-t border-white/10 my-2" />
          {user ? (
            <>
              <div className="px-4 py-2 text-white text-sm font-semibold">
                Olá, {user.name}
              </div>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="px-4 py-3 text-left text-white text-sm font-semibold hover:bg-white/10 rounded-lg transition-all"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-white text-sm font-semibold hover:bg-white/10 rounded-lg transition-all"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 bg-park-yellow hover:bg-yellow-400 text-park-blue-dark text-sm font-bold rounded-lg transition-all text-center"
              >
                Cadastrar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
