import { createContext, useContext, useState, type ReactNode } from 'react';
import { rides as initialRides, type Ride } from '../data/rides';
import { reviews as initialReviews, type Review } from '../data/reviews';

interface AppContextValue {
  rides: Ride[];
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => void;
  getRideReviews: (rideId: string) => Review[];
  getRideById: (id: string) => Ride | undefined;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [rides, setRides] = useState<Ride[]>(initialRides);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  function addReview(data: Omit<Review, 'id' | 'date' | 'helpful'>) {
    const newReview: Review = {
      ...data,
      id: `r${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    };
    setReviews((prev) => [newReview, ...prev]);

    setRides((prevRides) =>
      prevRides.map((ride) => {
        if (ride.id !== data.rideId) return ride;
        const total = ride.avgRating * ride.reviewCount + data.rating;
        const count = ride.reviewCount + 1;
        return {
          ...ride,
          avgRating: Math.round((total / count) * 10) / 10,
          reviewCount: count,
        };
      })
    );
  }

  function getRideReviews(rideId: string) {
    return reviews.filter((r) => r.rideId === rideId);
  }

  function getRideById(id: string) {
    return rides.find((r) => r.id === id);
  }

  return (
    <AppContext.Provider value={{ rides, reviews, addReview, getRideReviews, getRideById }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
