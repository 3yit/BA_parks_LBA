import React from 'react';
import { Flower, Route, MessageCircleHeart } from 'lucide-react';
import { GuestNote } from '../App';

interface WelcomeScreenProps {
  onStart: () => void;
  guestNotes?: GuestNote[];
}

const TOUR_STOPS = [
  "Plaza General San Martín",
  "Floralis Genérica",
  "Plaza Rep. Fed. del Brasil",
  "El Rosedal Garden",
  "Parque Centenario",
  "Los Andes Park",
  "Plaza Mafalda",
  "Plaza Dr. Bernardo Houssay",
  "Plaza Rodríguez Peña",
  "Plaza Libertad"
];

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, guestNotes = [] }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-stone-100 to-rose-100 text-stone-800 flex flex-col items-center justify-center p-6 relative overflow-hidden overflow-y-auto">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 fixed">
        <div className="absolute top-10 right-10 w-64 h-64 bg-rose-300 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-200 rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-md w-full z-10 text-center space-y-8 animate-fade-in-up my-auto py-10">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-lg mb-4">
            <Flower className="w-10 h-10 text-rose-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-800 tracking-tight leading-tight">
            Buenos Aires<br />
            <span className="text-rose-500 italic">Park Guide</span>
          </h1>
          <p className="text-xl text-stone-600 font-light">
            By Minervans, for Minervans.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 shadow-xl border border-white/50 space-y-6">
          {/* TSP Tour Order */}
          <div className="text-left space-y-3">
            <div className="flex items-center gap-2 justify-center mb-4">
              <Route className="w-5 h-5 text-rose-500" />
              <h3 className="font-serif font-bold text-stone-700 text-sm">
                Optimal Tour Order (TSP Formulation)
              </h3>
            </div>
            <ol className="space-y-1.5">
              {TOUR_STOPS.map((stop, index) => (
                <li key={index} className="flex items-center gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-stone-600">{stop}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="pt-4">
            <button
              onClick={onStart}
              className="w-full bg-stone-900 text-white font-medium text-lg px-8 py-4 rounded-xl shadow-xl hover:bg-stone-800 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              LESGO
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <p className="text-xs text-stone-400 mt-4 font-medium uppercase tracking-widest">
              Designed by: Rim, Mara and Jonathan for a CS164 assignment.
            </p>
          </div>
        </div>

        {/* Guestbook Section */}
        {guestNotes && guestNotes.length > 0 && (
          <div className="text-left space-y-4">
            <h3 className="text-center font-serif font-bold text-stone-700 flex items-center justify-center gap-2">
              <MessageCircleHeart className="w-5 h-5 text-rose-400" />
              Notes from Previous Visitors
            </h3>
            <div className="space-y-3">
              {guestNotes.slice(0, 3).map((note) => (
                <div key={note.id} className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white shadow-sm text-sm">
                  <p className="text-stone-700 italic mb-2">"{note.text}"</p>
                  <p className="text-rose-500 text-xs font-bold text-right">- {note.author}, {note.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;