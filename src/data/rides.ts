export type Category = 'montanha-russa' | 'familia' | 'infantil' | 'radical' | 'shows';
export type Intensity = 'Leve' | 'Moderada' | 'Radical';

export interface Ride {
  id: string;
  name: string;
  category: Category;
  intensity: Intensity;
  minHeight?: number;
  maxHeight?: number;
  minAge?: number;
  description: string;
  image: string;
  avgRating: number;
  reviewCount: number;
  tags: string[];
}

export const categoryLabels: Record<Category, string> = {
  'montanha-russa': 'Montanha-russa',
  familia: 'Família',
  infantil: 'Infantil',
  radical: 'Radical',
  shows: 'Shows',
};

export const intensityColors: Record<Intensity, string> = {
  Leve: 'bg-green-100 text-green-700',
  Moderada: 'bg-yellow-100 text-yellow-700',
  Radical: 'bg-red-100 text-red-700',
};

export const rides: Ride[] = [
  {
    id: 'barco-viking',
    name: 'Barco Viking',
    category: 'radical',
    intensity: 'Radical',
    minHeight: 120,
    description:
      'Embarque em um enorme navio viking e prepare-se para balançar cada vez mais alto. A atração combina frio na barriga, velocidade e uma vista privilegiada do parque em uma aventura para os mais corajosos.',
    image: '/images/barco-viking.jpg',
    avgRating: 4.8,
    reviewCount: 1247,
    tags: ['navio', 'balanço', 'adrenalina'],
  },
  {
    id: 'western-water-fall',
    name: 'Western Water Fall',
    category: 'familia',
    intensity: 'Moderada',
    minHeight: 110,
    description:
      'Uma aventura aquática no Velho Oeste! Desça cachoeiras emocionantes em botes redondos e prepare-se para se molhar nessa atração familiar que diverte pessoas de todas as idades. Perfeita para dias quentes de verão.',
    image:
      'https://images.unsplash.com/photo-1766693603284-75b8435b1eee?auto=format&fit=crop&w=1200&q=80',
    avgRating: 4.5,
    reviewCount: 987,
    tags: ['água', 'família', 'bote'],
  },
  {
    id: 'monster',
    name: 'Monster',
    category: 'radical',
    intensity: 'Radical',
    minHeight: 130,
    description:
      'Um passeio nas trevas repleto de surpresas e sustos! O Monster te leva por um percurso sombrio cheio de animatrônicos assustadores e efeitos especiais. Para quem tem coragem e busca uma dose extra de emoção.',
    image:
      'https://images.unsplash.com/photo-1766790459864-71ff38c774af?auto=format&fit=crop&w=1200&q=80',
    avgRating: 4.3,
    reviewCount: 756,
    tags: ['terror', 'dark ride', 'animatrônico'],
  },
  {
    id: 'big-tower',
    name: 'Big Tower',
    category: 'radical',
    intensity: 'Radical',
    minHeight: 140,
    description:
      'Suba até 100 metros de altura e prepare-se para uma queda livre emocionante! O Big Tower oferece uma vista panorâmica espetacular do parque antes de lançar você em queda livre em alta velocidade.',
    image:
      'https://images.unsplash.com/photo-1751896077567-c5529b9173f9?auto=format&fit=crop&w=1200&q=80',
    avgRating: 4.6,
    reviewCount: 892,
    tags: ['queda livre', 'altura', 'adrenalina'],
  },
  {
    id: 'tour-da-india',
    name: 'Tour da Índia',
    category: 'familia',
    intensity: 'Moderada',
    minHeight: 100,
    description:
      'Uma viagem mágica pelas terras da Índia! Com cenários deslumbrantes e efeitos especiais incríveis, o Tour da Índia é uma aventura para toda a família com música, dança e elementos da cultura indiana.',
    image:
      'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?auto=format&fit=crop&w=1200&q=80',
    avgRating: 4.1,
    reviewCount: 634,
    tags: ['família', 'cultura', 'cenário'],
  },
  {
    id: 'star-race',
    name: 'Star Race',
    category: 'familia',
    intensity: 'Moderada',
    minHeight: 120,
    description:
      'Uma corrida estelar em carrinhos futuristas! Acelere pelos trilhos em velocidade moderada nessa montanha-russa perfeita para toda a família. Divertida, empolgante e acessível para a maioria dos visitantes.',
    image:
      'https://images.unsplash.com/photo-1621445944472-f252571005b6?auto=format&fit=crop&w=1200&q=80',
    avgRating: 4.4,
    reviewCount: 823,
    tags: ['família', 'velocidade', 'futurista'],
  },
  {
    id: 'jungle',
    name: 'Jungle Adventure',
    category: 'familia',
    intensity: 'Leve',
    minHeight: 90,
    minAge: 4,
    description:
      'Uma expedição pela selva selvagem! Navegue por rios com animais animatrônicos e cenários tropicais exuberantes nessa aventura tranquila e encantadora, ideal para crianças maiores e famílias.',
    image:
      'https://images.unsplash.com/photo-1744364348267-bcf7b3f3ddd0?auto=format&fit=crop&w=1200&q=80',
    avgRating: 3.9,
    reviewCount: 542,
    tags: ['família', 'animais', 'natureza'],
  },
  {
    id: 'beto-rock',
    name: 'Beto Rock Show',
    category: 'shows',
    intensity: 'Leve',
    description:
      'O show de rock mais animado do parque! Com músicas ao vivo, dançarinos profissionais e um cenário espetacular, o Beto Rock é uma experiência musical inesquecível para toda a família. Apresentações múltiplas ao dia.',
    image:
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80',
    avgRating: 4.7,
    reviewCount: 1089,
    tags: ['show', 'música', 'família'],
  },
  {
    id: 'baloes-da-happy',
    name: 'Balões da Happy',
    category: 'infantil',
    intensity: 'Leve',
    minAge: 2,
    maxHeight: 130,
    description:
      'Uma diversão leve e colorida para os pequenos! Os Balões da Happy giram suavemente no ar enquanto as crianças se divertem em total segurança. A atração favorita das crianças de 2 a 8 anos.',
    image:
      'https://images.unsplash.com/photo-1762440933462-f7be9baed7b0?auto=format&fit=crop&w=1200&q=80',
    avgRating: 4.2,
    reviewCount: 489,
    tags: ['infantil', 'colorido', 'suave'],
  },
  {
    id: 'naja',
    name: 'Naja',
    category: 'montanha-russa',
    intensity: 'Radical',
    minHeight: 135,
    description:
      'Enfrente a serpente mais perigosa do parque! A Naja é uma montanha-russa com curvas fechadas e aclives que desafiam sua coragem. Suas inversões de 360° deixam qualquer visitante de cabelo em pé.',
    image:
      'https://images.unsplash.com/photo-1759179125042-98534a3d47bf?auto=format&fit=crop&w=1200&q=80',
    avgRating: 4.5,
    reviewCount: 678,
    tags: ['looping', 'adrenalina', 'serpente'],
  },
  {
    id: 'roda-gigante',
    name: 'Roda Gigante',
    category: 'familia',
    intensity: 'Leve',
    minAge: 4,
    description:
      'Uma vista privilegiada de todo o parque! A Roda Gigante oferece uma perspectiva única do Beto Carrero World com cabines confortáveis para toda a família desfrutar da paisagem com tranquilidade.',
    image:
      'https://images.unsplash.com/photo-1692301311188-bda319576dd1?auto=format&fit=crop&w=1200&q=80',
    avgRating: 4.3,
    reviewCount: 567,
    tags: ['família', 'vista', 'tranquilo'],
  },
  {
    id: 'bate-bate',
    name: 'Carros Bate-Bate',
    category: 'familia',
    intensity: 'Leve',
    minAge: 5,
    description:
      'O clássico bate-bate que nunca sai de moda! Uma diversão atemporal onde você pode dirigir e bater nos amigos em total segurança. Ótimo para famílias com crianças e aqueles que buscam diversão nostálgica.',
    image:
      'https://images.unsplash.com/photo-1572164625211-6723762c0e3a?auto=format&fit=crop&w=1200&q=80',
    avgRating: 4.0,
    reviewCount: 421,
    tags: ['família', 'clássico', 'diversão'],
  },
];
