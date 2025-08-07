import { useState, useEffect, useMemo } from "react";
import type { Movie } from "../types/movie";
import { movies as movieData } from "../data/movieData";

/**
 * Custom hook to filter movies by search query and selected genres.
 * @param searchQuery - The search text for matching movie title or overview.
 * @param selectedGenres - Array of genre IDs to filter movies by.
 * @returns Filtered movies and loading state.
 */
export const useMovies = (searchQuery: string, selectedGenres: number[]) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setMovies(movieData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredMovies = useMemo(() => {
    // Normalize searchQuery to avoid .toLowerCase() on undefined
    const normalizedSearch = (searchQuery ?? "").toLowerCase();

    return movies.filter((movie) => {
      const title = movie.title ?? "";
      const overview = movie.overview ?? "";

      const matchesSearch =
        title.toLowerCase().includes(normalizedSearch) ||
        overview.toLowerCase().includes(normalizedSearch);

      const matchesGenre =
        selectedGenres.length === 0 ||
        selectedGenres.some((genreId) =>
          Array.isArray(movie.genre_ids) ? movie.genre_ids.includes(genreId) : false
        );

      return matchesSearch && matchesGenre;
    });
  }, [movies, searchQuery, selectedGenres]);

  return { movies: filteredMovies, loading };
};