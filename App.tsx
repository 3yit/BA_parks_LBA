import React, { useState, useEffect } from 'react';
import { PARKS, TOUR_ORDER, getCommuteInfo } from './constants';
import { Photo, UserLocation } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import CommuteScreen from './components/CommuteScreen';
import ParkScreen from './components/ParkScreen';
import CompletionScreen from './components/CompletionScreen';

type ViewState = 'WELCOME' | 'COMMUTE' | 'PARK' | 'COMPLETION';

export interface GuestNote {
  id: number;
  text: string;
  author: string;
  rating: number;
  timestamp: string;
}

function App() {
  const [view, setView] = useState<ViewState>('WELCOME');
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [guestNotes, setGuestNotes] = useState<GuestNote[]>([]);

  const currentParkId = TOUR_ORDER[currentStopIndex];
  const currentPark = PARKS.find(p => p.id === currentParkId)!;
  
  const nextParkId = currentStopIndex < TOUR_ORDER.length - 1 ? TOUR_ORDER[currentStopIndex + 1] : null;
  const nextPark = nextParkId !== null ? PARKS.find(p => p.id === nextParkId) : null;

  const commuteInfo = nextPark ? getCommuteInfo(currentParkId, nextParkId!) : { time: 0, method: 'Walk' as const };

  useEffect(() => {
    if (view !== 'WELCOME' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        (err) => console.log('Location access denied', err),
        { enableHighAccuracy: true }
      );
    }
  }, [view]);

  const handleStartTour = () => {
    setView('PARK');
  };

  const handleNext = () => {
    if (nextPark) {
      setView('COMMUTE');
    } else {
      setView('COMPLETION');
    }
  };

  const handleArrive = () => {
    setCurrentStopIndex(prev => prev + 1);
    setView('PARK');
  };

  const handlePrev = () => {
    if (currentStopIndex > 0) {
      setCurrentStopIndex(prev => prev - 1);
      setView('PARK');
    }
  };

  const handleAddPhoto = (file: File, name: string) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newPhoto: Photo = {
        id: Date.now(),
        url: reader.result as string,
        photographer: name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        parkId: currentParkId,
        parkName: currentPark.name
      };
      setPhotos(prev => [newPhoto, ...prev]);
    };
    reader.readAsDataURL(file);
  };

  const handleFinishTour = (note: string, author: string, rating: number) => {
    if (note.trim()) {
      const newNote: GuestNote = {
        id: Date.now(),
        text: note,
        author: author || 'Anonymous Traveler',
        rating: rating,
        timestamp: new Date().toLocaleDateString()
      };
      setGuestNotes(prev => [newNote, ...prev]);
    }
    // Reset tour state for the next visitor
    setCurrentStopIndex(0);
    setPhotos([]); // Optional: clear photos for privacy between sessions
    setView('WELCOME');
  };

  if (view === 'WELCOME') {
    return <WelcomeScreen onStart={handleStartTour} guestNotes={guestNotes} />;
  }

  if (view === 'COMPLETION') {
    return <CompletionScreen onFinish={handleFinishTour} />;
  }

  if (view === 'COMMUTE' && nextPark) {
    return (
      <CommuteScreen 
        nextPark={nextPark} 
        commuteInfo={commuteInfo} 
        userLocation={userLocation}
        onArrive={handleArrive}
      />
    );
  }

  return (
    <ParkScreen
      park={currentPark}
      stopNumber={currentStopIndex + 1}
      totalStops={TOUR_ORDER.length}
      photos={photos.filter(p => p.parkId === currentParkId)}
      onAddPhoto={handleAddPhoto}
      onNext={handleNext}
      onPrev={handlePrev}
      hasPrev={currentStopIndex > 0}
      hasNext={currentStopIndex < TOUR_ORDER.length - 1}
    />
  );
}

export default App;