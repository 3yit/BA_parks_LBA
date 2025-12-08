export interface Park {
  id: number;
  name: string;
  neighborhood: string;
  lat: number;
  lon: number;
  description: string;
  vibes: string;
  bestTime: string;
  funFacts: string[];
  commute_content: {
    book: ContentLink;
    podcast: ContentLink;
    article: ContentLink;
  };
}

export interface ContentLink {
  title: string;
  link: string;
}

export interface CommuteInfo {
  time: number;
  method: 'Walk' | 'Bus' | 'Metro' | 'Bus + Walk' | 'Transit';
}

export interface Photo {
  id: number;
  url: string;
  photographer: string;
  timestamp: string;
  parkId: number;
  parkName: string;
}

export interface UserLocation {
  lat: number;
  lon: number;
}