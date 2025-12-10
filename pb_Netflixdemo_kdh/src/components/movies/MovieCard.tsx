import React from "react";
import { Movie } from "../../api/tmdb";
import "../../styles/movies.css";

interface Props {
  movie: Movie;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export const MovieCard: React.FC<Props> = ({
  movie,
  isWishlisted,
  onToggleWishlist,
}) => {
  return (
    <div className={`movie-card ${isWishlisted ? "movie-card-liked" : ""}`}>
      <div className="movie-card-poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`${IMG_BASE}${movie.poster_path}`}
            alt={movie.title}
            className="movie-card-poster"
            loading="lazy"
          />
        ) : (
          <div className="movie-card-no-poster">No Image</div>
        )}

        <div className="movie-card-overlay">
          <p className="movie-card-overview">{movie.overview}</p>
        </div>

        <button
          className={`wishlist-btn ${
            isWishlisted ? "wishlist-btn-active" : ""
          }`}
          onClick={onToggleWishlist}
        >
          ♥
        </button>
      </div>

      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div className="movie-card-meta">
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
          <span>{movie.release_date}</span>
        </div>
      </div>
    </div>
  );
};
