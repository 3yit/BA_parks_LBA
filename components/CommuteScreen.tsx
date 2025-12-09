import React from 'react';
import { Park, CommuteInfo, UserLocation } from '../types';
import { MapPin, Navigation, Music2, ExternalLink, ArrowRight } from 'lucide-react';

interface CommuteScreenProps {
  nextPark: Park;
  commuteInfo: CommuteInfo;
  userLocation: UserLocation | null;
  onArrive: () => void;
}

const CommuteScreen: React.FC<CommuteScreenProps> = ({ nextPark, commuteInfo, userLocation, onArrive }) => {
  const getGoogleMapsMode = (method: string) => {
    if (method === 'Walk') return 'walking';
    if (method === 'Metro') return 'transit';
    return 'transit';
  };

  const mapsMode = getGoogleMapsMode(commuteInfo.method);
  // Always use empty origin to let Google Maps use current location
  const originParam = '';
  const destinationParam = encodeURIComponent(`${nextPark.name}, Buenos Aires, Argentina`);
  
  // Use the API key provided in the original snippet, or fallback if needed.
  // Note: For production, this should be in an env var, but keeping it here as requested by prompt logic to fix *this* site.
  const API_KEY = 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'; 
  
  // For embed, show place if no user location, otherwise show directions
  const embedSrc = userLocation
    ? `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${userLocation.lat},${userLocation.lon}&destination=${destinationParam}&mode=${mapsMode}`
    : `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${destinationParam}`;

  const getTransportIcon = (method: string) => {
    switch(method) {
        case 'Walk': return '🚶';
        case 'Metro': return '🚇';
        case 'Bus': return '🚌';
        default: return '🚀';
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      {/* Header */}
      <div className="bg-white p-6 sticky top-0 z-20 shadow-sm border-b border-stone-100">
        <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">In Transit</span>
            <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded-full">{commuteInfo.method}</span>
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-800 leading-none">
          En route to <span className="text-rose-600 block mt-1">{nextPark.name}</span>
        </h2>
        <div className="flex items-center gap-2 mt-3 text-stone-500 text-sm font-medium">
            <span className="text-xl">{getTransportIcon(commuteInfo.method)}</span>
            <span>~{commuteInfo.time} min travel time</span>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        {/* Map Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-stone-200/50 border border-stone-100">
          <div className="h-64 w-full bg-stone-200">
             <iframe
                width="100%"
                height="100%"
                style={{border: 0}}
                loading="lazy"
                allowFullScreen
                src={embedSrc}
              />
          </div>
          <div className="p-4 bg-white">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${destinationParam}&travelmode=${mapsMode}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Open in Maps
            </a>
          </div>
        </div>

        {/* Learn While You Travel */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider ml-1">Soundtrack</h3>
            </div>

            <iframe 
                style={{borderRadius: '12px'}}
                src="https://open.spotify.com/embed/playlist/647rKRiACqIdtxA1pBOWDj?utm_source=generator&theme=0"
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Tour Playlist"
                className="shadow-md"
            ></iframe>

            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider ml-1 pt-2">Resources</h3>
            
            <a href={nextPark.commute_content.podcast.link} target="_blank" rel="noreferrer" className="block group">
                <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm flex items-center gap-4 transition-all group-hover:border-rose-200 group-hover:shadow-md">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                        <Music2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-amber-600 font-bold mb-0.5">Recommended Listen</p>
                        <p className="text-stone-800 font-medium text-sm line-clamp-1">{nextPark.commute_content.podcast.title}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-stone-300 group-hover:text-rose-400" />
                </div>
            </a>

             <a href={nextPark.commute_content.article.link} target="_blank" rel="noreferrer" className="block group">
                <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm flex items-center gap-4 transition-all group-hover:border-rose-200 group-hover:shadow-md">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-indigo-600 font-bold mb-0.5">Read Up</p>
                        <p className="text-stone-800 font-medium text-sm line-clamp-1">{nextPark.commute_content.article.title}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-stone-300 group-hover:text-rose-400" />
                </div>
            </a>
        </div>
      </div>

      {/* Floating Bottom Action */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md border-t border-stone-200 z-30">
        <div className="max-w-2xl mx-auto">
             <button
                onClick={onArrive}
                className="w-full bg-stone-900 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                We've Arrived! 
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default CommuteScreen;