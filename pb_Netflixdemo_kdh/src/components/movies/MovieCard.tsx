import React from "react";
import { Movie } from "../../api/tmdb";
import "../../styles/movies.css";
import { Link } from "react-router-dom";

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
      {/* ✨ 상세 페이지로 이동하는 클릭 영역 */}
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
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
        </div>

        <div className="movie-card-info">
          <h3 className="movie-card-title">{movie.title}</h3>
          <div className="movie-card-meta">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>{movie.release_date}</span>
          </div>
        </div>
      </Link>

      {/* ❤️ 찜 버튼은 상세 페이지 이동과 분리해야 해서 Link 밖에 둠 */}
      <button
        className={`wishlist-btn ${isWishlisted ? "wishlist-btn-active" : ""}`}
        onClick={(e) => {
          e.preventDefault(); // 링크 이동 막기
          e.stopPropagation(); // 버블링 방지
          onToggleWishlist();
        }}
      >
        ♥
      </button>
    </div>
  );
};
