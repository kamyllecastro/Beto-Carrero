import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    setLoading(false);

    if (success) {
      navigate('/');
    } else {
      setError('E-mail ou senha incorretos.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-park-surface py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-5xl">🎢</span>
          <h1
            className="text-3xl font-black text-gray-900 mt-4 mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Bem-vindo de volta!
          </h1>
          <p className="text-gray-500">Entre para continuar avaliando as atrações</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-park-blue/30 focus:border-park-blue font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-park-blue/30 focus:border-park-blue font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-park-blue hover:bg-park-blue-dark text-white font-bold py-3 rounded-xl transition-colors shadow-md shadow-park-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Não tem uma conta?{' '}
              <Link to="/cadastro" className="text-park-blue font-semibold hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-park-blue transition-colors"
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
