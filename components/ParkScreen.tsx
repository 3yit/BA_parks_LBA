import React, { useState } from 'react';
import { Park, Photo } from '../types';
import { Camera, MapPin, Clock, Info, ChevronLeft, ArrowRight, Share2, ExternalLink, Music, BookOpen, Podcast, X } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import PhotoGallery from './PhotoGallery';

interface EmbeddedContent {
  title: string;
  link: string;
  type: 'article' | 'podcast';
}

interface ParkScreenProps {
  park: Park;
  stopNumber: number;
  totalStops: number;
  photos: Photo[];
  onAddPhoto: (file: File, name: string, caption: string) => void;
  onAddComment: (photoId: string | number, author: string, text: string) => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

// Simulated data for "Popular Times" chart (Visual aid only)
const CHART_DATA = [
  { time: '10am', visitors: 40 },
  { time: '12pm', visitors: 85 },
  { time: '2pm', visitors: 60 },
  { time: '4pm', visitors: 90 },
  { time: '6pm', visitors: 70 },
];

const ParkScreen: React.FC<ParkScreenProps> = ({ 
  park, stopNumber, totalStops, photos, onAddPhoto, onAddComment, onNext, onPrev, hasPrev, hasNext 
}) => {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | number | null>(null);
  const [embeddedContent, setEmbeddedContent] = useState<EmbeddedContent | null>(null);
  const placeholderImage = `https://picsum.photos/seed/${park.id}/800/600`;

  const handlePhotoClick = (photoId: string | number) => {
    setSelectedPhotoId(photoId);
    setShowGallery(true);
  };

  // Construct Google Maps Search Query
  const googleMapsQuery = encodeURIComponent(`${park.name} ${park.neighborhood} Buenos Aires`);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${googleMapsQuery}`;

  return (
    <div className="min-h-screen bg-stone-50 pb-36">
      {/* Hero Image Header */}
      <div className="relative h-72 md:h-96 w-full">
        <img 
            src={placeholderImage} 
            alt={park.name} 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent"></div>
        
        {/* Top Nav */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center text-white z-10">
            <button 
                onClick={hasPrev ? onPrev : undefined} 
                disabled={!hasPrev}
                className={`p-2 rounded-full bg-black/20 backdrop-blur-md ${!hasPrev ? 'opacity-0 cursor-default' : 'hover:bg-black/40'}`}
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-xs font-bold tracking-widest bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                STOP {stopNumber} / {totalStops}
            </span>
            <button 
                onClick={() => {
                    if (navigator.share) {
                        navigator.share({
                            title: 'Buenos Aires Park Guide',
                            text: 'Check out this awesome BA parks tour guide!',
                            url: 'https://ba-parks-lba.vercel.app'
                        });
                    } else {
                        navigator.clipboard.writeText('https://ba-parks-lba.vercel.app');
                        alert('Link copied to clipboard!');
                    }
                }}
                className="p-2 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40"
            >
                <Share2 className="w-5 h-5" />
            </button>
        </div>

        {/* Title Block */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-white animate-fade-in-up">
            <div className="flex items-center gap-2 text-rose-300 text-sm font-bold mb-2 uppercase tracking-wide">
                <MapPin className="w-4 h-4" />
                {park.neighborhood}
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold leading-none mb-2 text-shadow-sm">
                {park.name}
            </h1>
            <p className="text-stone-200 text-sm md:text-base font-light opacity-90 line-clamp-2">
                {park.vibes}
            </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto -mt-6 relative z-10 px-4 space-y-6">
        
        {/* Info Cards */}
        <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-6 space-y-6">
            
            {/* Description */}
            <div className="prose prose-stone prose-sm max-w-none">
                <p className="text-stone-600 leading-relaxed text-lg">
                    {park.description}
                </p>
            </div>

            <hr className="border-stone-100" />

            {/* Best Time & Crowd Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="flex items-center gap-2 font-bold text-stone-800 mb-3">
                        <Clock className="w-4 h-4 text-rose-500" />
                        Best Time to Visit
                    </h3>
                    <p className="text-stone-600 text-sm mb-4 bg-rose-50 p-3 rounded-lg border border-rose-100">
                        {park.bestTime}
                    </p>
                    <div className="space-y-2">
                         <h3 className="flex items-center gap-2 font-bold text-stone-800 mb-2">
                            <Info className="w-4 h-4 text-indigo-500" />
                            Fun Facts
                        </h3>
                        <ul className="space-y-2">
                            {park.funFacts.slice(0, 2).map((fact, i) => (
                                <li key={i} className="text-sm text-stone-500 flex items-start gap-2">
                                    <span className="text-rose-400 mt-1">•</span>
                                    {fact}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Recharts + Google Maps Link */}
                <div className="flex flex-col h-full">
                    <div className="flex-1 min-h-[160px] bg-stone-50 rounded-t-xl p-4 border border-stone-100 border-b-0">
                        <p className="text-xs font-bold text-stone-400 mb-2 text-center uppercase">Est. Crowd Levels</p>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={CHART_DATA}>
                                <XAxis 
                                    dataKey="time" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 10, fill: '#78716c'}} 
                                />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                />
                                <Bar dataKey="visitors" radius={[4, 4, 0, 0]}>
                                    {CHART_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 3 ? '#fb7185' : '#e7e5e4'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <a 
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold py-3 px-4 rounded-b-xl flex items-center justify-center gap-2 transition-colors border border-t-0 border-stone-100"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Check Real-Time Crowd on Maps
                    </a>
                </div>
            </div>
        </div>

        {/* Recommendations & Spotify */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-6">
            <h3 className="font-bold text-stone-800 flex items-center gap-2 text-lg">
                <Music className="w-5 h-5 text-rose-500" />
                Vibes & Recommendations
            </h3>

            {/* Spotify Player */}
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

            {/* Recommendations Grid */}
            <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest">While You're Here</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button 
                        onClick={() => setEmbeddedContent({ 
                            title: park.commute_content.book.title, 
                            link: park.commute_content.book.link, 
                            type: 'article' 
                        })}
                        className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors border border-amber-100 text-left"
                    >
                        <div className="bg-amber-200 p-2 rounded-full text-amber-700">
                            <BookOpen className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-amber-600 font-bold uppercase">Read</p>
                            <p className="text-stone-800 text-sm font-medium truncate">{park.commute_content.book.title}</p>
                        </div>
                    </button>
                    
                    <button 
                        onClick={() => setEmbeddedContent({ 
                            title: park.commute_content.podcast.title, 
                            link: park.commute_content.podcast.link, 
                            type: 'podcast' 
                        })}
                        className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-100 text-left"
                    >
                        <div className="bg-purple-200 p-2 rounded-full text-purple-700">
                            <Podcast className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-purple-600 font-bold uppercase">Listen</p>
                            <p className="text-stone-800 text-sm font-medium truncate">{park.commute_content.podcast.title}</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>

        {/* Gallery Preview */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-stone-800 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-rose-500" />
                    Memories
                </h3>
                <button 
                    onClick={() => setShowGallery(true)}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700"
                >
                    VIEW ALL
                </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
                {photos.slice(0, 2).map((photo) => (
                    <div 
                        key={photo.id} 
                        className="aspect-square rounded-xl overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handlePhotoClick(photo.id)}
                    >
                         <img src={photo.url} alt="Memory" className="w-full h-full object-cover" />
                    </div>
                ))}
                <button 
                    onClick={() => setShowGallery(true)}
                    className="aspect-square rounded-xl bg-stone-100 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400 hover:bg-stone-50 hover:border-rose-300 hover:text-rose-400 transition-all"
                >
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-bold">ADD</span>
                </button>
            </div>
        </div>
      </div>

      {/* Sticky Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md border-t border-stone-200 z-30">
        <div className="max-w-3xl mx-auto flex gap-4">
            <button 
                onClick={() => setShowGallery(true)}
                className="flex-1 bg-white border border-stone-200 text-stone-700 font-bold py-4 rounded-2xl shadow-sm hover:bg-stone-50"
            >
                📷 Photos
            </button>
            <button
                onClick={onNext}
                className={`flex-[2] font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-colors ${
                    hasNext 
                    ? "bg-stone-900 text-white hover:bg-stone-800" 
                    : "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:opacity-90"
                }`}
            >
                {hasNext ? (
                    <>Next Stop <ArrowRight className="w-5 h-5" /></>
                ) : (
                    <>Finish Tour 🎉</>
                )}
            </button>
        </div>
      </div>

      {/* Gallery Modal Overlay */}
      {showGallery && (
        <PhotoGallery 
            photos={photos} 
            onClose={() => {
              setShowGallery(false);
              setSelectedPhotoId(null);
            }} 
            onAddPhoto={onAddPhoto}
            onAddComment={onAddComment}
            initialSelectedPhotoId={selectedPhotoId}
        />
      )}

      {/* Embedded Content Modal */}
      {embeddedContent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-stone-50">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`p-2 rounded-full ${embeddedContent.type === 'article' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>
                  {embeddedContent.type === 'article' ? <BookOpen className="w-4 h-4" /> : <Podcast className="w-4 h-4" />}
                </div>
                <h3 className="font-semibold text-stone-800 truncate">{embeddedContent.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={embeddedContent.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in new tab
                </a>
                <button 
                  onClick={() => setEmbeddedContent(null)}
                  className="p-2 hover:bg-stone-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-stone-600" />
                </button>
              </div>
            </div>
            
            {/* Iframe Container */}
            <div className="flex-1 bg-stone-100">
              <iframe
                src={embeddedContent.link}
                className="w-full h-full border-0"
                title={embeddedContent.title}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkScreen;