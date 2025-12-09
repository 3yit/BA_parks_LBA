import React, { useState, useEffect } from 'react';
import { PARKS, TOUR_ORDER, getCommuteInfo } from './constants';
import { Photo, UserLocation } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import CommuteScreen from './components/CommuteScreen';
import ParkScreen from './components/ParkScreen';
import CompletionScreen from './components/CompletionScreen';
import { db, storage } from './firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

  // Load photos from Firebase
  useEffect(() => {
    const q = query(collection(db, 'photos'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedPhotos: Photo[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        loadedPhotos.push({
          id: doc.id as any,
          url: data.url,
          photographer: data.photographer,
          timestamp: data.timestamp?.toDate?.()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || data.timestampString,
          parkId: data.parkId,
          parkName: data.parkName
        });
      });
      setPhotos(loadedPhotos);
    }, (error) => {
      console.error('Error loading photos:', error);
    });
    return () => unsubscribe();
  }, []);

  // Load guest notes from Firebase
  useEffect(() => {
    const q = query(collection(db, 'guestNotes'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedNotes: GuestNote[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        loadedNotes.push({
          id: doc.id as any,
          text: data.text,
          author: data.author,
          rating: data.rating,
          timestamp: data.timestamp?.toDate?.()?.toLocaleDateString() || data.timestampString
        });
      });
      setGuestNotes(loadedNotes);
    }, (error) => {
      console.error('Error loading guest notes:', error);
    });
    return () => unsubscribe();
  }, []);

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

  const handleAddPhoto = async (file: File, name: string) => {
    try {
      // Upload image to Firebase Storage
      const timestamp = Date.now();
      const storageRef = ref(storage, `photos/${timestamp}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Save photo metadata to Firestore
      await addDoc(collection(db, 'photos'), {
        url: downloadURL,
        photographer: name,
        timestamp: serverTimestamp(),
        timestampString: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        parkId: currentParkId,
        parkName: currentPark.name
      });
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo. Please try again.');
    }
  };

  const handleFinishTour = async (note: string, author: string, rating: number) => {
    if (note.trim()) {
      try {
        // Save guest note to Firestore
        await addDoc(collection(db, 'guestNotes'), {
          text: note,
          author: author || 'Anonymous Traveler',
          rating: rating,
          timestamp: serverTimestamp(),
          timestampString: new Date().toLocaleDateString()
        });
      } catch (error) {
        console.error('Error saving guest note:', error);
      }
    }
    // Reset tour state for the next visitor
    setCurrentStopIndex(0);
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