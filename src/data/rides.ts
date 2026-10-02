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

// NOTA: Estas são fotos de capa do Unsplash representando cada tipo de atração
// Para usar fotos reais do Beto Carrero World, salve na pasta public/images/ e altere os caminhos

export const rides: Ride[] = [
  {
    id: 'fire-whip',
    name: 'Fire Whip',
    category: 'montanha-russa',
    intensity: 'Radical',
    minHeight: 140,
    description:
      'A primeira montanha-russa invertida do Brasil, onde os trilhos ficam acima da cabeça e as pernas ficam soltas, atingindo até 100 km/h com cinco loopings.',
    image: '/images/fire-whip.jpg',
    avgRating: 4.7,
    reviewCount: 1156,
    tags: ['invertida', 'looping', 'adrenalina', '100km/h'],
  },
  {
    id: 'big-tower',
    name: 'Big Tower',
    category: 'radical',
    intensity: 'Radical',
    minHeight: 130,
    description:
      'Um elevador de queda livre com 100 metros de altura que despenca a uma velocidade de até 120 km/h.',
    image: '/images/big-tower.jpg',
    avgRating: 4.6,
    reviewCount: 987,
    tags: ['queda livre', 'altura', 'adrenalina', '120km/h'],
  },
  {
    id: 'rebulicao',
    name: 'Rebuliço',
    category: 'radical',
    intensity: 'Radical',
    minHeight: 120,
    description:
      'Um brinquedo estilo carrossel voador que gira intensamente de cabeça para baixo.',
    image: '/images/rebulicao.jpg',
    avgRating: 4.3,
    reviewCount: 743,
    tags: ['carrossel', 'gira', 'invertido', 'radical'],
  },
  {
    id: 'spin-blast',
    name: 'Spin Blast',
    category: 'radical',
    intensity: 'Radical',
    minHeight: 120,
    description:
      'Um enorme disco giratório que vai de um lado para o outro enquanto roda, garantindo muito frio na barriga.',
    image: '/images/spin-blast.jpg',
    avgRating: 4.4,
    reviewCount: 821,
    tags: ['disco', 'gira', 'frio na barriga', 'radical'],
  },
  {
    id: 'madagascar-river',
    name: 'Madagascar Crazy River Adventure!',
    category: 'familia',
    intensity: 'Moderada',
    minHeight: 100,
    description:
      'Uma corredeira em botes circulares que simula um rio cheio de giros e que molha os participantes.',
    image: '/images/madagascar-river.jpg',
    avgRating: 4.5,
    reviewCount: 1092,
    tags: ['água', 'bote', 'família', 'molhado'],
  },
  {
    id: 'ferrovia-dino',
    name: 'Ferrovia DinoMagic',
    category: 'familia',
    intensity: 'Moderada',
    minHeight: 90,
    minAge: 4,
    description:
      'Um passeio de trem de 5 km que percorre o parque e conta com uma surpresa interativa envolvendo dinossauros e ação.',
    image: '/images/ferrovia-dino.jpg',
    avgRating: 4.2,
    reviewCount: 876,
    tags: ['trem', 'dinossauro', 'família', 'interativo'],
  },
  {
    id: 'tigor-mountain',
    name: 'Tigor Mountain',
    category: 'montanha-russa',
    intensity: 'Moderada',
    minHeight: 110,
    description:
      'Uma montanha-russa com percurso divertido e velocidade moderada, ideal para a família e adolescentes.',
    image: '/images/tigor-mountain.jpg',
    avgRating: 4.4,
    reviewCount: 934,
    tags: ['montanha-russa', 'família', 'moderado', 'divertido'],
  },
  {
    id: 'tchibum',
    name: 'Tchibum',
    category: 'familia',
    intensity: 'Moderada',
    minHeight: 100,
    description:
      'Um splash aquático com uma queda refrescante que empolga os visitantes.',
    image: '/images/tchibum.jpg',
    avgRating: 4.6,
    reviewCount: 1123,
    tags: ['água', 'queda', 'família', 'refrescante'],
  },
  {
    id: 'raskapuska',
    name: 'Raskapuska',
    category: 'infantil',
    intensity: 'Leve',
    minHeight: 90,
    minAge: 3,
    description:
      'Um percurso tranquilo de barco dentro de uma montanha mágica com cenários lúdicos e música.',
    image: '/images/raskapuska.jpg',
    avgRating: 4.1,
    reviewCount: 567,
    tags: ['barco', 'infantil', 'mágica', 'tranquilo'],
  },
  {
    id: 'autopista',
    name: 'Autopista',
    category: 'infantil',
    intensity: 'Leve',
    minHeight: 100,
    minAge: 5,
    description:
      'O clássico carrinho bate-bate localizado na Vila Germânica.',
    image: '/images/autopista.jpg',
    avgRating: 4.3,
    reviewCount: 789,
    tags: ['bate-bate', 'infantil', 'clássico', 'diversão'],
  },
  {
    id: 'carrossel-veneziano',
    name: 'Carrossel Veneziano',
    category: 'infantil',
    intensity: 'Leve',
    minHeight: 90,
    minAge: 3,
    description:
      'Um carrossel clássico de dois andares localizado na área central.',
    image: '/images/carrossel-veneziano.jpg',
    avgRating: 4.5,
    reviewCount: 845,
    tags: ['carrossel', 'infantil', 'clássico', 'dois andares'],
  },
];
