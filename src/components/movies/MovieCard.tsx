import React, { useState } from "react";
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
  // ✨ [추가] 이미지 로딩 에러 상태 관리
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`movie-card ${isWishlisted ? "movie-card-liked" : ""}`}>
      {/* ✨ 상세 페이지로 이동하는 클릭 영역 */}
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-card-poster-wrapper">
          {/* ✨ [수정] 포스터 경로가 있고 + 로딩 에러가 없을 때만 이미지 표시 
             (하나라도 충족 안 되면 아래의 No Image div를 보여줌)
          */}
          {movie.poster_path && !imageError ? (
            <img
              src={`${IMG_BASE}${movie.poster_path}`}
              alt={movie.title}
              className="movie-card-poster"
              loading="lazy"
              // ✨ [추가] 이미지 로딩 실패 시 에러 상태를 true로 변경
              onError={() => setImageError(true)}
            />
          ) : (
            // 이미지가 없거나 로딩에 실패했을 때 보여줄 대체 UI
            <div className="movie-card-no-poster">
              <span style={{ fontSize: '24px', marginBottom: '8px' }}>🎬</span>
              <span>No Image</span>
            </div>
          )}

          <div className="movie-card-overlay">
            <p className="movie-card-overview">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>
          </div>
        </div>

        <div className="movie-card-info">
          <h3 className="movie-card-title">{movie.title}</h3>
          <div className="movie-card-meta">
            <span>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}</span>
            <span>{movie.release_date || "날짜 미정"}</span>
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
        aria-label="찜하기" // 접근성 추가
      >
        ♥
      </button>
    </div>
  );
};