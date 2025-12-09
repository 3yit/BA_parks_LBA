import React, { useState } from 'react';
import { Photo } from '../types';
import { X, Upload, Image as ImageIcon, MessageCircle, Send } from 'lucide-react';

interface PhotoGalleryProps {
  photos: Photo[];
  onClose: () => void;
  onAddPhoto: (file: File, name: string, caption: string) => void;
  onAddComment: (photoId: string | number, author: string, text: string) => void;
  initialSelectedPhotoId?: string | number | null;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, onClose, onAddPhoto, onAddComment, initialSelectedPhotoId }) => {
  const [photographerName, setPhotographerName] = useState('');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [expandedPhoto, setExpandedPhoto] = useState<Photo | null>(
    initialSelectedPhotoId ? photos.find(p => p.id === initialSelectedPhotoId) || null : null
  );
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && photographerName) {
      setIsUploading(true);
      onAddPhoto(e.target.files![0], photographerName, caption);
      setIsUploading(false);
      setPhotographerName('');
      setCaption('');
    }
  };

  const handleAddComment = () => {
    if (expandedPhoto && commentAuthor.trim() && commentText.trim()) {
      onAddComment(expandedPhoto.id, commentAuthor, commentText);
      setCommentText('');
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
                    placeholder="Your Name" 
                    value={photographerName}
                    onChange={(e) => setPhotographerName(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm bg-white"
                />
                <input 
                    type="text" 
                    placeholder="Caption (optional)" 
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
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
                <div key={photo.id} className="break-inside-avoid mb-3 space-y-2 group cursor-pointer" onClick={() => setExpandedPhoto(photo)}>
                    <div className="rounded-xl overflow-hidden shadow-sm border border-stone-100 relative">
                        <img src={photo.url} alt="Memory" className="w-full h-auto object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                        {(photo.comments?.length || 0) > 0 && (
                          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {photo.comments?.length}
                          </div>
                        )}
                    </div>
                    <div className="px-1">
                        <p className="text-xs font-bold text-stone-700">{photo.photographer}</p>
                        {photo.caption && <p className="text-xs text-stone-600 italic">"{photo.caption}"</p>}
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

      {/* Expanded Photo Modal */}
      {expandedPhoto && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setExpandedPhoto(null)}></div>
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col relative z-10">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <p className="font-bold text-stone-800">{expandedPhoto.photographer}</p>
                <p className="text-xs text-stone-500">{expandedPhoto.timestamp}</p>
              </div>
              <button onClick={() => setExpandedPhoto(null)} className="p-2 hover:bg-stone-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Photo */}
            <div className="bg-stone-100">
              <img src={expandedPhoto.url} alt="Memory" className="w-full h-auto max-h-64 object-contain" />
            </div>
            
            {/* Caption */}
            {expandedPhoto.caption && (
              <div className="p-4 border-b bg-stone-50">
                <p className="text-sm text-stone-700 italic">"{expandedPhoto.caption}"</p>
              </div>
            )}
            
            {/* Comments */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-40">
              {expandedPhoto.comments && expandedPhoto.comments.length > 0 ? (
                expandedPhoto.comments.map(comment => (
                  <div key={comment.id} className="bg-stone-50 p-3 rounded-xl">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-sm text-stone-800">{comment.author}</p>
                      <p className="text-[10px] text-stone-400">{comment.timestamp}</p>
                    </div>
                    <p className="text-sm text-stone-600 mt-1">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-stone-400 text-sm py-4">No comments yet</p>
              )}
            </div>
            
            {/* Add Comment */}
            <div className="p-4 border-t bg-white space-y-2">
              <input
                type="text"
                placeholder="Your name"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  className="flex-1 px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!commentAuthor.trim() || !commentText.trim()}
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;