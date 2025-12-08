import React, { useState } from 'react';
import { Send, Heart, Star } from 'lucide-react';

interface CompletionScreenProps {
  onFinish: (note: string, author: string, rating: number) => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ onFinish }) => {
  const [note, setNote] = useState('');
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const authorSignature = `${name} (${studentClass})`;
    onFinish(note, authorSignature, rating);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-stone-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6 border border-rose-100 animate-fade-in-up text-center">
        
        <div className="flex justify-center -mt-16 mb-4">
          <div className="bg-gradient-to-br from-rose-400 to-pink-500 p-6 rounded-full shadow-lg text-white">
            <Heart className="w-12 h-12 fill-current" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-stone-800">What a Journey!</h2>
          <p className="text-stone-500">
            We hope you enjoyed your romantic tour of Buenos Aires. 
            Leave a little note for the next couple starting their adventure.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Editable Rating */}
          <div className="flex flex-col items-center justify-center gap-2 pb-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Rate your experience</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-transform hover:scale-110"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star 
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-stone-300'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1 ml-1">
              Your Message
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Share a hidden gem or a sweet moment..."
              className="w-full p-4 rounded-xl bg-stone-50 border border-stone-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none resize-none h-32 text-stone-700"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1 ml-1">
                Your Name(s)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Ana & Leo"
                className="w-full p-4 rounded-xl bg-stone-50 border border-stone-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none text-stone-700"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1 ml-1">
                Class
              </label>
              <input
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                placeholder="e.g., 2024"
                className="w-full p-4 rounded-xl bg-stone-50 border border-stone-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none text-stone-700"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-stone-900 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:bg-stone-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              Finish & Share Love <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompletionScreen;