import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetail, MovieDetail } from "../../api/tmdb";
import "../../styles/movies.css";
import "../../styles/movie-detail.css";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

export const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await getMovieDetail(Number(id));
        setMovie(res.data);
      } catch (e) {
        console.error(e);
        setError("영화 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="page movie-detail-page">
        <div className="section-loading">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page movie-detail-page">
        <div className="section-error">{error}</div>
        <button className="btn btn-outline" onClick={handleBack}>
          뒤로가기
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="page movie-detail-page">
        <div className="section-error">영화 정보를 찾을 수 없습니다.</div>
        <button className="btn btn-outline" onClick={handleBack}>
          뒤로가기
        </button>
      </div>
    );
  }

  return (
    <div className="page movie-detail-page">
      <div className="movie-detail-hero">
        {movie.backdrop_path && (
          <div
            className="movie-detail-backdrop"
            style={{
              backgroundImage: `url(${BACKDROP_BASE}${movie.backdrop_path})`,
            }}
          />
        )}
        <div className="movie-detail-hero-overlay">
          {movie.poster_path && (
            <img
              src={`${IMG_BASE}${movie.poster_path}`}
              alt={movie.title}
              className="movie-detail-poster"
            />
          )}
          <div className="movie-detail-main">
            <h1>{movie.title}</h1>
            {movie.tagline && (
              <p className="movie-detail-tagline">"{movie.tagline}"</p>
            )}
            <div className="movie-detail-meta">
              <span>{movie.release_date}</span>
              <span>· 평점 {movie.vote_average.toFixed(1)}</span>
              {movie.runtime && <span>· {movie.runtime}분</span>}
            </div>
            {movie.genres && movie.genres.length > 0 && (
              <div className="movie-detail-genres">
                {movie.genres.map((g) => (
                  <span key={g.id} className="movie-detail-genre-chip">
                    {g.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="movie-detail-body">
        <h2>줄거리</h2>
        <p className="movie-detail-overview">
          {movie.overview || "줄거리 정보가 없습니다."}
        </p>

        <button className="btn btn-outline" onClick={handleBack}>
          ← 뒤로가기
        </button>
      </div>
    </div>
  );
};
