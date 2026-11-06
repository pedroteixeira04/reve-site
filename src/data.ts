export type ProductKind = 'device' | 'accessory' | 'subscription';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  kind: ProductKind;
  unit?: string;
  includes?: string[];
}

export const eur = (n: number): string =>
  new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(n);

export const products: Product[] = [
  {
    id: 'reve',
    name: 'Revê',
    kind: 'device',
    price: 169,
    description:
      'A venda de olhos com auscultadores sem fios, som Dolby Atmos, monitorização do sono e despertar inteligente.',
    includes: ['1 capa lavável', '2 gel packs', 'Funções básicas da aplicação', 'Estojo de transporte']
  },
  {
    id: 'capa',
    name: 'Capa adicional',
    kind: 'accessory',
    price: 24,
    description: 'Capa lavável num tecido que não aquece. Troca-a e personaliza o teu Revê.'
  },
  {
    id: 'gel',
    name: 'Gel packs',
    kind: 'accessory',
    price: 12,
    description: 'Para os bolsos removíveis: calor ou frio, à medida da tua noite.'
  },
  {
    id: 'aroma',
    name: 'Recarga de aroma',
    kind: 'accessory',
    price: 9,
    description: 'Aromatiza a capa com lavanda e adormece num ambiente mais calmo.'
  }
];

export const subscription = {
  monthly: { id: 'premium-mensal', name: 'Revê Premium — mensal', price: 4.99, unit: '/mês' },
  yearly: { id: 'premium-anual', name: 'Revê Premium — anual', price: 49.9, unit: '/ano' }
};

export const premiumBenefits = [
  'Biblioteca completa de meditações guiadas',
  'Relatórios de sono detalhados',
  'Sugestões personalizadas para a tua rotina de descanso'
];

export type IconName = 'sound' | 'sleep' | 'temp' | 'leaf' | 'battery' | 'app' | 'design' | 'heart' | 'power';

export interface Feature {
  icon: IconName;
  title: string;
  short: string;
  text: string;
}

export const features: Feature[] = [
  {
    icon: 'sound',
    title: 'Som envolvente',
    short: 'Dolby Atmos',
    text: 'Auscultadores sem fios embutidos com Dolby Atmos. A tua playlist favorita, com uma qualidade de som que te envolve.'
  },
  {
    icon: 'sleep',
    title: 'Monitorização do sono',
    short: 'do sono',
    text: 'Lê o ritmo cardíaco para perceber quando estás em sono leve, normal ou profundo, e mostra-o na aplicação.'
  },
  {
    icon: 'temp',
    title: 'Temperatura controlada',
    short: 'controlada',
    text: 'Bolsos removíveis para gel packs. Ajustas a temperatura na aplicação e o ambiente fica ideal, à tua medida.'
  },
  {
    icon: 'leaf',
    title: 'Aromatizável',
    short: 'com lavanda',
    text: 'Um tecido que não aquece e que pode ser aromatizado, por exemplo com lavanda.'
  },
  {
    icon: 'battery',
    title: 'Bateria de longa duração',
    short: 'duração',
    text: 'Bateria de lítio recarregável. Carregas de dia e esqueces-te dela à noite.'
  },
  {
    icon: 'app',
    title: 'A tua noite, na aplicação',
    short: 'app',
    text: 'Liga-se ao Spotify para tocar as tuas playlists ao colocares a venda e oferece meditações guiadas.'
  }
];
