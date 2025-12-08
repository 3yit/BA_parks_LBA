import React, { useState } from 'react';
import { Photo } from '../types';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

interface PhotoGalleryProps {
  photos: Photo[];
  onClose: () => void;
  onAddPhoto: (file: File, name: string) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, onClose, onAddPhoto }) => {
  const [photographerName, setPhotographerName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && photographerName) {
      setIsUploading(true);
      // Simulate network delay for UX
      setTimeout(() => {
        onAddPhoto(e.target.files![0], photographerName);
        setIsUploading(false);
        setPhotographerName('');
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative z-10 animate-fade-in-up">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex justify-between items-center bg-white sticky top-0">
          <div>
            <h2 className="text-xl font-bold text-stone-800">Scrapbook</h2>
            <p className="text-xs text-stone-500">{photos.length} memories captured</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full text-stone-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1">
          
          {/* Upload Section */}
          <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
            <h3 className="text-sm font-bold text-rose-800 mb-3 flex items-center gap-2">
                <Upload className="w-4 h-4" /> Add New Memory
            </h3>
            <div className="space-y-3">
                <input 
                    type="text" 
                    placeholder="Photographer's Name" 
                    value={photographerName}
                    onChange={(e) => setPhotographerName(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm bg-white"
                />
                <label className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed transition-all cursor-pointer ${photographerName ? 'border-rose-300 bg-white hover:bg-rose-50 text-rose-600' : 'border-stone-200 bg-stone-50 text-stone-400 cursor-not-allowed'}`}>
                    {isUploading ? (
                        <span className="text-sm font-bold animate-pulse">Saving...</span>
                    ) : (
                        <>
                            <ImageIcon className="w-4 h-4" />
                            <span className="text-sm font-bold">Select Photo</span>
                        </>
                    )}
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileChange}
                        disabled={!photographerName || isUploading}
                    />
                </label>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 gap-3">
            {photos.map(photo => (
                <div key={photo.id} className="break-inside-avoid mb-3 space-y-2 group">
                    <div className="rounded-xl overflow-hidden shadow-sm border border-stone-100 relative">
                        <img src={photo.url} alt="Memory" className="w-full h-auto object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    </div>
                    <div className="px-1">
                        <p className="text-xs font-bold text-stone-700">{photo.photographer}</p>
                        <p className="text-[10px] text-stone-400">{photo.timestamp}</p>
                    </div>
                </div>
            ))}
          </div>
          
          {photos.length === 0 && (
            <div className="text-center py-10 text-stone-400">
                <p>No photos yet. Be the first!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;