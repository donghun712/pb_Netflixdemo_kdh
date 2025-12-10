import React from "react";
import {
    getNowPlaying,
    getPopular,
    getTopRated,
    getUpcoming,
    Movie,
} from "../../api/tmdb";
import { useMovies } from "../../hooks/useMovies";
import { useWishlist } from "../../hooks/useWishlist";
import { MovieGrid } from "../../components/movies/MovieGrid";
import "../../styles/movies.css";
import { Link } from "react-router-dom";

const HERO_IMG_BASE = "https://image.tmdb.org/t/p/original";

export const HomePage: React.FC = () => {
    const nowPlaying = useMovies(getNowPlaying);
    const popular = useMovies(getPopular);
    const topRated = useMovies(getTopRated);
    const upcoming = useMovies(getUpcoming);

    const { toggle, isWishlisted } = useWishlist();

    // 랜덤으로 인기 영화 중 하나를 hero로 선택
    const heroMovie: Movie | undefined =
        popular.data.length > 0
            ? popular.data[Math.floor(Math.random() * popular.data.length)]
            : undefined;

    return (
        <div className="page page-home">
            {/* ----------------------- 🎬 HERO SECTION ----------------------- */}
            {heroMovie && (
                <section className="hero">
                    <div className="hero-bg">
                        {heroMovie.backdrop_path && (
                            <img
                                src={`${HERO_IMG_BASE}${heroMovie.backdrop_path}`}
                                alt={heroMovie.title}
                            />
                        )}
                        <div className="hero-gradient" />
                    </div>

                    <div className="hero-content">
                        <h1>{heroMovie.title}</h1>
                        <p>{heroMovie.overview}</p>

                        <div className="hero-buttons">
                            {/* ⭐ '자세히 보기' 버튼 활성화 */}
                            <Link
                                to={`/movie/${heroMovie.id}`}
                                className="btn btn-light"
                            >
                                자세히 보기
                            </Link>

                            <button
                                className={`btn ${isWishlisted(heroMovie.id)
                                        ? "btn-secondary"
                                        : "btn-outline-light"
                                    }`}
                                onClick={() => toggle(heroMovie)}
                            >
                                {isWishlisted(heroMovie.id) ? "찜 해제" : "찜하기"}
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* ----------------------- 📌 지금 상영 중 ----------------------- */}
            <section className="movie-section">
                <h2>지금 상영 중</h2>
                {nowPlaying.isLoading ? (
                    <div className="movie-skeleton-grid">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="movie-skeleton-card" />
                        ))}
                    </div>
                ) : nowPlaying.error ? (
                    <div className="section-error">{nowPlaying.error}</div>
                ) : (
                    <MovieGrid
                        movies={nowPlaying.data}
                        isWishlisted={isWishlisted}
                        toggleWishlist={toggle}
                    />
                )}
            </section>

            {/* ----------------------- 📌 인기 영화 ----------------------- */}
            <section className="movie-section">
                <h2>인기 영화</h2>
                {popular.isLoading ? (
                    <div className="section-loading">로딩 중...</div>
                ) : popular.error ? (
                    <div className="section-error">{popular.error}</div>
                ) : (
                    <MovieGrid
                        movies={popular.data}
                        isWishlisted={isWishlisted}
                        toggleWishlist={toggle}
                    />
                )}
            </section>

            {/* ----------------------- 📌 평점 높은 영화 ----------------------- */}
            <section className="movie-section">
                <h2>평점 높은 영화</h2>
                {topRated.isLoading ? (
                    <div className="section-loading">로딩 중...</div>
                ) : topRated.error ? (
                    <div className="section-error">{topRated.error}</div>
                ) : (
                    <MovieGrid
                        movies={topRated.data}
                        isWishlisted={isWishlisted}
                        toggleWishlist={toggle}
                    />
                )}
            </section>

            {/* ----------------------- 📌 개봉 예정작 ----------------------- */}
            <section className="movie-section">
                <h2>개봉 예정작</h2>
                {upcoming.isLoading ? (
                    <div className="section-loading">로딩 중...</div>
                ) : upcoming.error ? (
                    <div className="section-error">{upcoming.error}</div>
                ) : (
                    <MovieGrid
                        movies={upcoming.data}
                        isWishlisted={isWishlisted}
                        toggleWishlist={toggle}
                    />
                )}
            </section>
        </div>
    );
};
