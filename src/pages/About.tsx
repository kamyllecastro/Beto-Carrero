import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1
          className="text-3xl md:text-4xl font-black text-gray-900 mb-2"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Sobre o BetoAvalia
        </h1>
        <p className="text-gray-500">Conheça a história e o propósito da plataforma</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2
            className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            🎢 O que é o BetoAvalia?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            O <strong>BetoAvalia</strong> é uma plataforma independente e colaborativa criada por fãs do Beto Carrero World para ajudar visitantes a descobrir as melhores atrações do parque. Aqui você encontra avaliações reais de pessoas que já visitaram o parque, informações detalhadas sobre cada brinquedo e um ranking atualizado das atrações mais amadas.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2
            className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            🎯 Nossa missão
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Nossa missão é ajudar você a aproveitar ao máximo sua visita ao Beto Carrero World. Com as avaliações e informações disponíveis aqui, você pode planejar melhor seu roteiro, saber quais atrações são adequadas para sua família e não perder nenhum brinquedo imperdível!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { icon: '⭐', title: 'Avaliações reais', text: 'Milhares de avaliações de visitantes reais do parque.' },
              { icon: '📊', title: 'Ranking atualizado', text: 'Veja quais atrações têm as melhores notas.' },
              { icon: '🗺️', title: 'Planeje melhor', text: 'Informações de altura, idade e intensidade para planejar sua visita.' },
            ].map((item) => (
              <div key={item.title} className="bg-park-blue-light rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-park-blue text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2
            className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            🛠️ Tecnologias utilizadas
          </h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'Vite'].map((tech) => (
              <span
                key={tech}
                className="bg-park-blue text-white text-sm font-semibold px-3 py-1.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-4 leading-relaxed">
            O projeto foi construído com uma arquitetura moderna e escalável, preparado para futura integração com banco de dados, sistema de autenticação, moderação de conteúdo e muito mais.
          </p>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 text-center">
          <div className="text-3xl mb-3">⚠️</div>
          <h3
            className="font-black text-amber-800 mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Aviso importante
          </h3>
          <p className="text-amber-700 text-sm leading-relaxed font-medium">
            Este é um projeto independente de avaliações e não possui vínculo oficial com o Beto Carrero World. As informações aqui apresentadas são baseadas em avaliações de usuários e podem não refletir a situação atual das atrações.
          </p>
        </div>

        <div className="text-center pt-4">
          <Link
            to="/brinquedos"
            className="inline-flex items-center gap-2 bg-park-blue hover:bg-park-blue-dark text-white font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg shadow-park-blue/20"
          >
            <span>🎢</span>
            <span>Explorar brinquedos</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
