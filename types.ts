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

export interface PhotoComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Photo {
  id: number | string;
  url: string;
  photographer: string;
  caption?: string;
  timestamp: string;
  parkId: number;
  parkName: string;
  comments?: PhotoComment[];
}

export interface UserLocation {
  lat: number;
  lon: number;
}