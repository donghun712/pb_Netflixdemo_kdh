import { useEffect, useState } from "react";
import { Movie } from "../api/tmdb";

const WISHLIST_KEY = "pb:wishlist";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(WISHLIST_KEY);
    const movies: Movie[] = raw ? JSON.parse(raw) : [];
    setWishlist(movies);
  }, []);

  const persist = (next: Movie[]) => {
    setWishlist(next);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
  };

  const toggle = (movie: Movie) => {
    setWishlist((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      const next = exists
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clear = () => {
    persist([]);
  };

  const isWishlisted = (id: number) => wishlist.some((m) => m.id === id);

  return { wishlist, toggle, clear, isWishlisted };
};
