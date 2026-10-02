export interface Review {
  id: string;
  rideId: string;
  userName: string;
  rating: number;
  comment: string;
  ageGroup?: string;
  wouldReturn: boolean;
  date: string;
  helpful: number;
}

export const reviews: Review[] = [
  {
    id: 'r1',
    rideId: 'barco-viking',
    userName: 'Rodrigo Almeida',
    rating: 5,
    comment:
      'Simplesmente incrível! Quando o barco chega no ponto mais alto dá um frio na barriga enorme. A fila estava grande, mas cada minuto de espera valeu a pena!',
    ageGroup: '25-34',
    wouldReturn: true,
    date: '2024-12-15',
    helpful: 42,
  },
  {
    id: 'r2',
    rideId: 'barco-viking',
    userName: 'Fernanda Costa',
    rating: 5,
    comment:
      'Uma das melhores atrações do parque! Fui duas vezes no mesmo dia. O balanço fica cada vez mais alto e a adrenalina é ótima. Recomendo para quem gosta de emoção.',
    ageGroup: '18-24',
    wouldReturn: true,
    date: '2024-12-10',
    helpful: 38,
  },
  {
    id: 'r3',
    rideId: 'barco-viking',
    userName: 'Carlos Mendes',
    rating: 4,
    comment:
      'O movimento do barco é muito emocionante, principalmente nas últimas subidas. Só achei a fila um pouco demorada, mas vale a pena esperar.',
    ageGroup: '35-44',
    wouldReturn: true,
    date: '2024-11-28',
    helpful: 15,
  },
  {
    id: 'r4',
    rideId: 'western-water-fall',
    userName: 'Ana Paula Rodrigues',
    rating: 5,
    comment:
      'Adoramos! Nos molhamos muito mas foi super divertido. As crianças amaram e os adultos também. Perfeito para um dia quente. Levamos roupa extra e valeu a pena!',
    ageGroup: '35-44',
    wouldReturn: true,
    date: '2024-12-18',
    helpful: 29,
  },
  {
    id: 'r5',
    rideId: 'western-water-fall',
    userName: 'Paulo Santana',
    rating: 4,
    comment:
      'Muito divertido para a família inteira. A queda final dá um susto mas é emocionante. Boa diversão para quem não tem medo de se molhar.',
    ageGroup: '25-34',
    wouldReturn: true,
    date: '2024-12-05',
    helpful: 18,
  },
  {
    id: 'r6',
    rideId: 'monster',
    userName: 'Juliana Lima',
    rating: 4,
    comment:
      'Os sustos são genuínos! Os animatrônicos estão bem feitos e os efeitos sonoros contribuem muito para a atmosfera. Meu marido ficou com medo de verdade haha. Recomendo!',
    ageGroup: '25-34',
    wouldReturn: true,
    date: '2024-12-12',
    helpful: 22,
  },
  {
    id: 'r7',
    rideId: 'monster',
    userName: 'Marcos Ferreira',
    rating: 3,
    comment:
      'Legal mas achei que poderia ser mais assustador. Os cenários são bem feitos, porém os sustos são previsíveis depois de um tempo. Para quem gosta do gênero é uma boa experiência.',
    ageGroup: '18-24',
    wouldReturn: false,
    date: '2024-11-20',
    helpful: 10,
  },
  {
    id: 'r8',
    rideId: 'big-tower',
    userName: 'Thiago Oliveira',
    rating: 5,
    comment:
      'Uau! A queda livre é de tirar o fôlego. Você sobe bem alto e a vista do parque lá de cima é linda. Depois a queda acontece em frações de segundo. Imperdível para os corajosos!',
    ageGroup: '25-34',
    wouldReturn: true,
    date: '2024-12-20',
    helpful: 35,
  },
  {
    id: 'r9',
    rideId: 'big-tower',
    userName: 'Letícia Santos',
    rating: 5,
    comment:
      'Fiquei com muito medo mas me arrisquei e não me arrependo! A sensação de queda livre é única. Definitivamente o brinquedo mais emocionante que já experimentei na vida.',
    ageGroup: '18-24',
    wouldReturn: true,
    date: '2024-12-08',
    helpful: 27,
  },
  {
    id: 'r10',
    rideId: 'beto-rock',
    userName: 'Márcia Pereira',
    rating: 5,
    comment:
      'Que show incrível! Os dançarinos são muito talentosos e a produção é de altíssima qualidade. Fomos com as crianças e todos adoraram. Assistimos duas vezes!',
    ageGroup: '35-44',
    wouldReturn: true,
    date: '2024-12-14',
    helpful: 31,
  },
  {
    id: 'r11',
    rideId: 'beto-rock',
    userName: 'Diego Castro',
    rating: 5,
    comment:
      'Melhor show do parque! A energia é absurda, as músicas são animadas e os dançarinos impressionam. A filha ficou encantada. Não percam esse show!',
    ageGroup: '35-44',
    wouldReturn: true,
    date: '2024-11-25',
    helpful: 24,
  },
  {
    id: 'r12',
    rideId: 'star-race',
    userName: 'Rafael Machado',
    rating: 4,
    comment:
      'Boa montanha-russa para família. Não é tão radical quanto outras mas tem uma boa dose de emoção. Perfeita para quem não quer algo muito pesado mas quer sentir a adrenalina.',
    ageGroup: '25-34',
    wouldReturn: true,
    date: '2024-12-09',
    helpful: 14,
  },
  {
    id: 'r13',
    rideId: 'star-race',
    userName: 'Camila Souza',
    rating: 5,
    comment:
      'Perfeita para levar os filhos! Meu filho de 10 anos amou e ficou pedindo para repetir várias vezes. A temática espacial é bem bacana. Brinquedo muito bem conservado também.',
    ageGroup: '35-44',
    wouldReturn: true,
    date: '2024-12-01',
    helpful: 19,
  },
  {
    id: 'r14',
    rideId: 'naja',
    userName: 'Bruno Cardoso',
    rating: 5,
    comment:
      'A Naja é brutal! Os loopings são intensos e a velocidade é excelente. Quem curte montanha-russa vai adorar. A fila costuma andar bem e a experiência é muito boa.',
    ageGroup: '18-24',
    wouldReturn: true,
    date: '2024-12-16',
    helpful: 21,
  },
  {
    id: 'r15',
    rideId: 'baloes-da-happy',
    userName: 'Priscila Nunes',
    rating: 4,
    comment:
      'As crianças amaram! Meu filho de 4 anos ficou super feliz. Os balões são coloridos e a atração é bem segura. Ótima para os menores do grupo.',
    ageGroup: '25-34',
    wouldReturn: true,
    date: '2024-12-11',
    helpful: 16,
  },
  {
    id: 'r16',
    rideId: 'tour-da-india',
    userName: 'Viviane Gomes',
    rating: 4,
    comment:
      'Cenários muito bem feitos e imersivos. A viagem "pela Índia" é bem convincente. Ótima para a família, especialmente para quem aprecia cenografia e efeitos especiais.',
    ageGroup: '35-44',
    wouldReturn: true,
    date: '2024-12-03',
    helpful: 13,
  },
  {
    id: 'r17',
    rideId: 'roda-gigante',
    userName: 'Alexandre Pinto',
    rating: 4,
    comment:
      'Vista linda de todo o parque. Ótima para descansar entre as atrações. Levamos a avó que não podia andar nas radicais e ela adorou a vista. Bom para famílias diversas.',
    ageGroup: '45-54',
    wouldReturn: true,
    date: '2024-12-07',
    helpful: 11,
  },
  {
    id: 'r18',
    rideId: 'jungle',
    userName: 'Natália Ribeiro',
    rating: 4,
    comment:
      'Adorável para os pequenos! Os animatrônicos da floresta são bem feitos e as crianças ficam encantadas. Atração tranquila perfeita para intercalar com as mais radicais.',
    ageGroup: '25-34',
    wouldReturn: true,
    date: '2024-11-30',
    helpful: 9,
  },
  {
    id: 'r19',
    rideId: 'bate-bate',
    userName: 'Eduardo Silva',
    rating: 4,
    comment:
      'Clássico que nunca decepciona! Os adultos ficam mais animados do que as crianças haha. Diversão garantida para toda a família. Preço do token um pouco salgado.',
    ageGroup: '35-44',
    wouldReturn: true,
    date: '2024-12-04',
    helpful: 8,
  },
  {
    id: 'r20',
    rideId: 'barco-viking',
    userName: 'Isabela Torres',
    rating: 5,
    comment:
      'Nunca senti tanto medo e emoção ao mesmo tempo! Quando o barco chegou lá no alto, parecia que eu ia sair do assento. Fui sozinha porque meu marido não teve coragem e adorei!',
    ageGroup: '25-34',
    wouldReturn: true,
    date: '2024-12-19',
    helpful: 33,
  },
];
