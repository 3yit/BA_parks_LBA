import { Park, CommuteInfo } from './types';

export const TOUR_ORDER = [2, 9, 0, 6, 7, 8, 1, 3, 5, 4];

export const PARKS: Park[] = [
  { id: 0, name: 'Plaza Dr. Bernardo Houssay', neighborhood: 'San Nicolás', lat: -34.5945, lon: -58.3817,
    description: 'Named after Argentina\'s first Nobel Prize winner in sciences. This plaza occupies the historic grounds of the first Hospital de Clínicas.',
    vibes: '🎓 Student Revolution | 🧪 Scientific Legacy',
    bestTime: 'Weekday lunch (12-2pm)',
    funFacts: [
      'Surrounded by 5 UBA faculties',
      'Preserves the original San Lucas Chapel',
      'Features political murals',
      'Beating heart of academic life'
    ],
    commute_content: { 
      book: { title: 'Plaza Houssay Architecture (Archello)', link: 'https://archello.com/es/project/plaza-houssay' },
      podcast: { title: 'Reabre Plaza Houssay (ArchDaily)', link: 'https://www.archdaily.cl/cl/921566/reabre-plaza-houssay-en-buenos-aires' },
      article: { title: 'Completaron la reforma (Clarín)', link: 'https://www.clarin.com/ciudades/completaron-reforma-plaza-houssay-transitadas-ciudad-quedo_0_ULDPqxdmTe.html' }
    }
  },
  { id: 1, name: 'El Rosedal Garden', neighborhood: 'Palermo', lat: -34.5808, lon: -58.4349,
    description: 'Winner of the 2012 Garden Excellence Award. Latin America\'s premier rose garden within Parque Tres de Febrero.',
    vibes: '🌹 Supreme Romance | 📸 Instagram Gold',
    bestTime: 'Golden Hour (5-7pm)',
    funFacts: [
      'Over 18,000 rose bushes',
      'Andalusian Patio from 1929',
      'Authentic Triana ceramics',
      'Horticultural masterpiece'
    ],
    commute_content: { 
      book: { title: 'Xinhua - Celebra 110 años', link: 'https://spanish.news.cn/20241205/cf8dc621a61d49b9aed6641135861d2a/c.html' },
      podcast: { title: 'Buenos Aires Outdoor Gems (Podcast)', link: 'https://podcasts.apple.com/ro/podcast/buenos-aires/id1660929072?i=1000703167530' },
      article: { title: 'Garden Excellence Award (Lagunas)', link: 'https://www.revistalagunas.com/131-rosedal-de-palermo-reconocido-con-el-premio-internacional-%E2%80%9Cgarden-excellence-award%E2%80%9D' }
    }
  },
  { id: 2, name: 'Plaza General San Martín', neighborhood: 'Retiro', lat: -34.5905, lon: -58.3729,
    description: 'After Plaza de Mayo, this is Buenos Aires\' most historically significant plaza. Declared National Historic Place in 1942.',
    vibes: '🏛️ Epic History | 🌆 Panoramic Views',
    bestTime: 'Late afternoon (4-6pm)',
    funFacts: [
      'Site of British invasion defeat (1807)',
      'San Martín\'s barracks location',
      'Former South Sea Company site',
      'Military tradition hub'
    ],
    commute_content: { 
      book: { title: 'Wikipedia - Plaza San Martín', link: 'https://es.wikipedia.org/wiki/Plaza_General_San_Mart%C3%ADn_(Buenos_Aires)' },
      podcast: { title: 'Historia de Plaza San Martín (BA en Foco)', link: 'https://baenfoco.com/plaza-san-martin/' },
      article: { title: 'Un homenaje eterno (Retiroweb)', link: 'https://retiroweb.ar/plaza-san-martin-un-homenaje-eterno-al-libertador-y-la-historia-de-la-independencia/' }
    }
  },
  { id: 3, name: 'Floralis Genérica', neighborhood: 'Recoleta', lat: -34.5858, lon: -58.3934,
    description: 'Giant 75-foot aluminum and steel flower sculpture by Eduardo Catalano. Opens at sunrise and closes at sunset.',
    vibes: '🌸 Kinetic Art | 🌅 Sunset Magic',
    bestTime: 'Golden hour (6-8pm)',
    funFacts: [
      'Weighs 18 tons, 23m tall',
      'Moves with the sun',
      'Gift from architect Catalano',
      'Engineering marvel'
    ],
    commute_content: { 
      book: { title: 'Advisor Travel Guide', link: 'https://sl.advisor.travel/poi/Floralis-Generica-13430' },
      podcast: { title: 'Floralis Image (Wikimedia)', link: 'https://commons.wikimedia.org/wiki/File:Floralis_Gen%C3%A9rica_(27547134408).jpg' },
      article: { title: 'Gobierno BA - Espacios Verdes', link: 'http://buenosaires.gob.ar/noticias/la-ciudad-inaugura-la-cubierta-verde-sobre-el-centro-de-exposiciones-y-convenciones-en' }
    }
  },
  { id: 4, name: 'Plaza Rodríguez Peña', neighborhood: 'Recoleta', lat: -34.5884, lon: -58.3948,
    description: 'Designed by Carlos Thays in 1894 with English Romantic style. Designated National Historic Place in 2006.',
    vibes: '🌳 Ancient Trees | 📖 Literary Vibe',
    bestTime: 'Late afternoon (4-6pm)',
    funFacts: [
      'Named after revolutionary Rodríguez Peña',
      'Secret meeting place for independence',
      'Trees over 130 years old',
      'Fountain "The Thirsty One"'
    ],
    commute_content: { 
      book: { title: 'A Tranquil Oasis (Evendo)', link: 'https://evendo.com/locations/argentina/buenos-aires/attraction/plaza-rodriguez-pena' },
      podcast: { title: 'Historia de la Plaza (Blog)', link: 'https://www.buenosairesmequiere.com/2015/09/plazas-rodriguez-pena.html' },
      article: { title: 'Flickr Photo Essay', link: 'https://www.flickr.com/photos/90955804@N04/49988342727' }
    }
  },
  { id: 5, name: 'Plaza Rep. Fed. del Brasil', neighborhood: 'Recoleta', lat: -34.5843, lon: -58.3975,
    description: 'Recently renovated (2019) plaza featuring innovative green roof covering the Centro de Exposiciones y Convenciones.',
    vibes: '🏗️ Futuristic Design | 💃 Salsa Dance',
    bestTime: 'Weekend evenings (6-9pm)',
    funFacts: [
      '55,200 m² of green roof',
      'Pedestrian ramps connecting levels',
      'Part of massive green corridor',
      'Salsa gathering spot'
    ],
    commute_content: { 
      book: { title: 'La Ciudad inauguró (Gobierno BA)', link: 'http://buenosaires.gob.ar/noticias/la-ciudad-inaugura-la-cubierta-verde-sobre-el-centro-de-exposiciones-y-convenciones-en' },
      podcast: { title: 'Plaza Brasil Inauguration (TV Publica)', link: 'https://www.youtube.com/watch?v=qo38mj1AKqI' },
      article: { title: 'Parque CEC (ArchDaily)', link: 'https://www.archdaily.cl/cl/02-244495/primer-lugar-concurso-parque-centro-de-exposiciones-y-convenciones-en-buenos-aires' }
    }
  },
  { id: 6, name: 'Parque Centenario', neighborhood: 'Almagro', lat: -34.6019, lon: -58.4128,
    description: 'Created in 1909 by Carlos Thays. This circular park sits at Buenos Aires\' geographic center.',
    vibes: '🎪 Festival Atmosphere | 🦖 Museums',
    bestTime: 'Weekend mornings (10am-1pm)',
    funFacts: [
      'Geographic center of BA',
      'Eva Perón Amphitheater',
      'Natural Sciences Museum home',
      'Astronomical observatory site'
    ],
    commute_content: { 
      book: { title: 'Vida y milagros (ANCCOM)', link: 'https://anccom.sociales.uba.ar/2015/05/04/vida-y-milagros-en-el-parque-centenario/' },
      podcast: { title: 'Buenos Aires al Aire Libre (Podcast)', link: 'https://podcasts.apple.com/us/podcast/turismo-buenos-aires/id1537991045' },
      article: { title: 'Historias de los parques (Video)', link: 'https://www.youtube.com/watch?v=CarNtBo93C0' }
    }
  },
  { id: 7, name: 'Los Andes Park', neighborhood: 'Chacarita', lat: -34.5757, lon: -58.4421,
    description: 'A recently revitalized urban oasis in Chacarita showcasing Buenos Aires\' commitment to modern urban green space design.',
    vibes: '👗 Vintage Fashion | 💀 Funky music',
    bestTime: 'Sat/Sun (11am-3pm)',
    funFacts: [
      'Instagram-famous vintage markets',
      'Hosts open-air concerts',
      'Next to Chacarita Cemetery',
      'Urban renewal example'
    ],
    commute_content: { 
      book: { title: 'Renovación en Parque Los Andes', link: 'https://lachacritaonline.com.ar/renovacion-en-parque-los-andes-%F0%9F%8F%9E%EF%B8%8F.html' },
      podcast: { title: 'TripAdvisor Reviews', link: 'https://www.tripadvisor.com/Attraction_Review-g312741-d8749474-Reviews-Parque_Los_Andes-Buenos_Aires_Capital_Federal_District.html' },
      article: { title: 'Yelp Community Reviews', link: 'https://www.yelp.com/biz/parque-los-andes-buenos-aires' }
    }
  },
  { id: 8, name: 'Plaza Mafalda', neighborhood: 'Colegiales', lat: -34.5667, lon: -58.4555,
    description: 'Landmark celebrating Argentina\'s most beloved comic character created by Quino. The plaza design itself tells a story.',
    vibes: '🎨 Quirky Culture | 🇦🇷 Argentine Identity',
    bestTime: 'Afternoon (3-6pm)',
    funFacts: [
      'Tic-Tac-Toe pathway pattern',
      'Symbolizes character connections',
      'Mafalda is a national icon',
      'Beloved local gem'
    ],
    commute_content: { 
      book: { title: 'La historia de Plaza Mafalda', link: 'http://barriocolegiales.blogspot.com/2013/08/la-historia-de-plaza-mafalda.html' },
      podcast: { title: 'Colegiales Neighborhood Guide', link: 'https://nickipoststravelstuff.com/colegiales-buenos-aires-neighborhoods/' },
      article: { title: 'La sabiduría de Mafalda (La Nacion)', link: 'https://www.lanacion.com.ar/cultura/la-sabiduria-de-mafalda-revive-en-una-plaza-de-colegiales-nid731540/' }
    }
  },
  { id: 9, name: 'Plaza Libertad', neighborhood: 'Retiro', lat: -34.5918, lon: -58.3689,
    description: 'One of Buenos Aires\' oldest plazas with deep revolutionary history. Created in 1810 during the May Revolution.',
    vibes: '⚔️ Revolution History | 🎭 Teatro District',
    bestTime: 'Morning (9-11am)',
    funFacts: [
      'Former brothel site (Doña Gracia)',
      '1890 Revolution battleground',
      'Statue of VP Adolfo Alsina',
      'Next to Teatro Coliseo'
    ],
    commute_content: { 
      book: { title: 'Entre leyendas (Retiroweb)', link: 'https://retiroweb.ar/%F0%9F%8C%B3-plaza-libertad-entre-leyendas-combates-y-memoria-urbana/' },
      podcast: { title: 'Revolución del Parque (YouTube)', link: 'https://www.youtube.com/watch?v=y3hyoeUyJT8' },
      article: { title: 'Campo de batalla (Clarín)', link: 'https://www.clarin.com/ciudades/plaza-libertad-campo-batalla_0_HJYv_iUsDQl.html' }
    }
  }
];

// Raw commute data map
const COMMUTE_DATA_RAW: Record<string, CommuteInfo> = {
  '2-9': { time: 14, method: 'Walk' },
  '2-4': { time: 17, method: 'Bus' },
  '2-0': { time: 22, method: 'Bus' },
  '2-6': { time: 38, method: 'Bus' },
  '2-7': { time: 39, method: 'Bus' },
  '2-8': { time: 56, method: 'Bus' },
  '2-1': { time: 27, method: 'Bus' },
  '2-3': { time: 21, method: 'Bus' },
  '2-5': { time: 18, method: 'Bus' },
  '9-2': { time: 14, method: 'Walk' },
  '9-4': { time: 12, method: 'Walk' },
  '9-0': { time: 15, method: 'Bus' },
  '9-6': { time: 34, method: 'Bus' },
  '9-7': { time: 30, method: 'Bus' },
  '9-8': { time: 33, method: 'Bus' },
  '9-1': { time: 34, method: 'Bus' },
  '9-3': { time: 26, method: 'Bus' },
  '9-5': { time: 21, method: 'Bus' },
  '4-2': { time: 17, method: 'Bus' },
  '4-9': { time: 12, method: 'Walk' },
  '4-0': { time: 10, method: 'Walk' },
  '4-6': { time: 37, method: 'Bus' },
  '4-7': { time: 36, method: 'Bus' },
  '4-8': { time: 32, method: 'Bus' },
  '4-1': { time: 24, method: 'Bus' },
  '4-3': { time: 16, method: 'Bus' },
  '4-5': { time: 17, method: 'Bus' },
  '0-2': { time: 22, method: 'Bus' },
  '0-9': { time: 15, method: 'Bus' },
  '0-4': { time: 10, method: 'Walk' },
  '0-6': { time: 24, method: 'Bus' },
  '0-7': { time: 33, method: 'Bus' },
  '0-8': { time: 28, method: 'Bus' },
  '0-1': { time: 33, method: 'Metro' },
  '0-3': { time: 24, method: 'Metro' },
  '0-5': { time: 19, method: 'Metro' },
  '6-2': { time: 38, method: 'Bus' },
  '6-9': { time: 34, method: 'Bus' },
  '6-4': { time: 37, method: 'Bus' },
  '6-0': { time: 24, method: 'Bus' },
  '6-7': { time: 18, method: 'Bus' },
  '6-8': { time: 30, method: 'Bus' },
  '6-1': { time: 35, method: 'Bus + Walk' },
  '6-3': { time: 40, method: 'Bus' },
  '6-5': { time: 35, method: 'Bus' },
  '7-2': { time: 39, method: 'Bus' },
  '7-9': { time: 30, method: 'Bus' },
  '7-4': { time: 36, method: 'Bus' },
  '7-0': { time: 33, method: 'Bus' },
  '7-6': { time: 18, method: 'Bus' },
  '7-8': { time: 16, method: 'Walk' },
  '7-1': { time: 40, method: 'Bus + Walk' },
  '7-3': { time: 48, method: 'Bus' },
  '7-5': { time: 42, method: 'Bus' },
  '8-2': { time: 56, method: 'Bus' },
  '8-9': { time: 33, method: 'Bus' },
  '8-4': { time: 32, method: 'Bus' },
  '8-0': { time: 28, method: 'Bus' },
  '8-6': { time: 30, method: 'Bus' },
  '8-7': { time: 16, method: 'Walk' },
  '8-1': { time: 40, method: 'Walk' },
  '8-3': { time: 45, method: 'Bus' },
  '8-5': { time: 45, method: 'Bus + Walk' },
  '1-2': { time: 27, method: 'Bus' },
  '1-9': { time: 34, method: 'Bus' },
  '1-4': { time: 24, method: 'Bus' },
  '1-0': { time: 33, method: 'Metro' },
  '1-6': { time: 35, method: 'Bus + Walk' },
  '1-7': { time: 40, method: 'Bus + Walk' },
  '1-8': { time: 40, method: 'Walk' },
  '1-3': { time: 27, method: 'Bus' },
  '1-5': { time: 22, method: 'Bus' },
  '3-2': { time: 21, method: 'Bus' },
  '3-9': { time: 26, method: 'Bus' },
  '3-4': { time: 16, method: 'Bus' },
  '3-0': { time: 24, method: 'Metro' },
  '3-6': { time: 40, method: 'Bus' },
  '3-7': { time: 48, method: 'Bus' },
  '3-8': { time: 45, method: 'Bus' },
  '3-1': { time: 27, method: 'Bus' },
  '3-5': { time: 5, method: 'Walk' },
  '5-2': { time: 18, method: 'Bus' },
  '5-9': { time: 21, method: 'Bus' },
  '5-4': { time: 17, method: 'Bus' },
  '5-0': { time: 19, method: 'Metro' },
  '5-6': { time: 35, method: 'Bus' },
  '5-7': { time: 42, method: 'Bus' },
  '5-8': { time: 45, method: 'Bus + Walk' },
  '5-1': { time: 22, method: 'Bus' },
  '5-3': { time: 5, method: 'Walk' },
};

export const getCommuteInfo = (fromId: number, toId: number): CommuteInfo => {
  const key = `${fromId}-${toId}`;
  return COMMUTE_DATA_RAW[key] || { time: 20, method: 'Transit' };
};