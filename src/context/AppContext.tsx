import { createContext, useContext, useState, type ReactNode } from 'react';
import { rides as initialRides, type Ride } from '../data/rides';
import { reviews as initialReviews, type Review } from '../data/reviews';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppContextValue {
  rides: Ride[];
  reviews: Review[];
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => void;
  getRideReviews: (rideId: string) => Review[];
  getRideById: (id: string) => Ride | undefined;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [rides, setRides] = useState<Ride[]>(initialRides);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  function login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  function register(name: string, email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find((u: any) => u.email === email)) {
        resolve(false);
        return;
      }
      const newUser = { id: `u${Date.now()}`, name, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      resolve(true);
    });
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
  }

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
    <AppContext.Provider value={{ rides, reviews, user, login, register, logout, addReview, getRideReviews, getRideById }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
