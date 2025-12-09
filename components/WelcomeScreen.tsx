import React from 'react';
import { Flower, Clock, MapPin, MessageCircleHeart } from 'lucide-react';
import { GuestNote } from '../App';

interface WelcomeScreenProps {
  onStart: () => void;
  guestNotes?: GuestNote[];
}

const TOUR_STOPS = [
  { name: "Plaza General San Martín", link: "https://www.google.com/maps/place/Plaza+Gral.+San+Mart%C3%ADn/@-34.5905,-58.3729,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcca9c1c0a8e9d:0x8a0c8e8a0d9a0a0a!8m2!3d-34.5905!4d-58.3729!16s%2Fm%2F03qjx6y" },
  { name: "Floralis Genérica", link: "https://www.google.com/maps/place/Floralis+Gen%C3%A9rica/@-34.5833855,-58.3959756,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcca90be059813:0x7a0f9b6dd18f1f47!8m2!3d-34.5833899!4d-58.3934007!16s%2Fm%2F0gxqs2g" },
  { name: "Plaza Rep. Fed. del Brasil", link: "https://www.google.com/maps/place/Plaza+Rep%C3%BAblica+Federativa+del+Brasil/@-34.5843,-58.3975,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcca8fb5555555:0x5555555555555555!8m2!3d-34.5843!4d-58.3975" },
  { name: "El Rosedal Garden", link: "https://www.google.com/maps/place/El+Rosedal+de+Palermo/@-34.5714848,-58.4326894,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcb576dba979c5:0x7d5d5c5c5c5c5c5c!8m2!3d-34.5714892!4d-58.4301145!16s%2Fm%2F03qjx7b" },
  { name: "Parque Centenario", link: "https://www.google.com/maps/place/Parque+Centenario/@-34.6064485,-58.4374384,17z/data=!3m1!4b1!4m6!3m5!1s0x95bccac87c1ba619:0x151a03c7f2f3a79!8m2!3d-34.6064529!4d-58.4348635!16s%2Fm%2F047jhv5" },
  { name: "Los Andes Park", link: "https://www.google.com/maps/place/Parque+Los+Andes/@-34.5888831,-58.4552098,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcb5e7f81b2eb1:0x9f05d6b4d0b5b5b5!8m2!3d-34.5888875!4d-58.4526349!16s%2Fg%2F1tdfp04m" },
  { name: "Plaza Mafalda", link: "https://www.google.com/maps/place/Plaza+Mafalda/@-34.5806395,-58.4481864,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcb5ebf9363d9f:0xa431bedea4c4a7d1!8m2!3d-34.5806439!4d-58.4456115!16s%2Fg%2F1q6m1zg15" },
  { name: "Plaza Dr. Bernardo Houssay", link: "https://www.google.com/maps/place/Plaza+Houssay/@-34.5996515,-58.3989927,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcca84b4333333:0x3333333333333333!8m2!3d-34.5996559!4d-58.3964178!16s%2Fg%2F1q5bm1234" },
  { name: "Plaza Rodríguez Peña", link: "https://www.google.com/maps/place/Plaza+Rodr%C3%ADguez+Pe%C3%B1a/@-34.5988449,-58.3954178,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcca8fb5555555:0x5555555555555555!8m2!3d-34.5988493!4d-58.3928429" },
  { name: "Plaza Libertad", link: "https://www.google.com/maps/place/Plaza+Libertad/@-34.5961282,-58.3835556,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcca9c1c0a8e9d:0x8a0c8e8a0d9a0a0a!8m2!3d-34.5961326!4d-58.3809807" }
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
          {/* Tour Order */}
          <div className="text-left space-y-3">
            <div className="flex items-center gap-2 justify-center mb-2">
              <MapPin className="w-5 h-5 text-rose-500" />
              <h3 className="font-serif font-bold text-stone-700 text-sm">
                Please give us a 5 Prof we love you
              </h3>
            </div>
            <div className="flex items-center justify-center gap-1 text-stone-500 text-xs mb-4">
              <Clock className="w-3.5 h-3.5" />
              <span>Estimated duration: ~180 minutes</span>
            </div>
            <ol className="space-y-1.5">
              {TOUR_STOPS.map((stop, index) => (
                <li key={index} className="flex items-center gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <a 
                    href={stop.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-stone-600 hover:text-rose-500 hover:underline transition-colors"
                  >
                    {stop.name}
                  </a>
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