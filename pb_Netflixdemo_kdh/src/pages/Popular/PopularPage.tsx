import React, { useEffect, useRef, useState } from "react";
import { getPopular, Movie } from "../../api/tmdb";
import { useMovies } from "../../hooks/useMovies";
import { useWishlist } from "../../hooks/useWishlist";
import { MovieGrid } from "../../components/movies/MovieGrid";
import { ScrollTopButton } from "../../components/common/ScrollTopButton";
import "../../styles/movies.css";
import "../../styles/popular.css";

type ViewType = "table" | "infinite";

const PAGE_SIZE = 20; // TMDB 기본값

export const PopularPage: React.FC = () => {
    const popular = useMovies(getPopular);
    const { wishlist, toggle, isWishlisted } = useWishlist();

    const [view, setView] = useState<ViewType>("table");
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    // 뷰에 따라 body 스크롤 제어
    useEffect(() => {
        if (view === "table") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [view]);

    // Infinite scroll용 IntersectionObserver
    useEffect(() => {
        if (view !== "infinite") return;
        if (!sentinelRef.current) return;
        if (popular.isLoading) return;

        const target = sentinelRef.current;
        const observer = new IntersectionObserver(
            async (entries) => {
                const entry = entries[0];
                if (
                    entry.isIntersecting &&
                    !isFetchingMore &&
                    popular.page < popular.totalPages
                ) {
                    setIsFetchingMore(true);
                    await popular.load(popular.page + 1, false);
                    setIsFetchingMore(false);
                }
            },
            { threshold: 1 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [view, popular.page, popular.totalPages, popular.isLoading, isFetchingMore]);

    const handleViewChange = (next: ViewType) => {
        if (view === next) return;
        setView(next);
        window.scrollTo({ top: 0 });
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > popular.totalPages) return;
        popular.load(page, true);
    };

    const currentPageMovies = popular.data;

    const rankBase = (popular.page - 1) * PAGE_SIZE;

    return (
        <div className="page popular-page">
            <div className="popular-header-row">
                <h1>대세 콘텐츠</h1>
                <div className="popular-toggle">
                    <button
                        className={`toggle-btn ${view === "table" ? "toggle-btn-active" : ""}`}
                        onClick={() => handleViewChange("table")}
                    >
                        Table View
                    </button>
                    <button
                        className={`toggle-btn ${view === "infinite" ? "toggle-btn-active" : ""
                            }`}
                        onClick={() => handleViewChange("infinite")}
                    >
                        Infinite View
                    </button>
                </div>
            </div>

            {popular.error && (
                <div className="section-error popular-error">{popular.error}</div>
            )}

            {view === "table" ? (
                <div className="popular-table-wrapper">
                    {popular.isLoading ? (
                        <div className="section-loading">로딩 중...</div>
                    ) : (
                        <>
                            <table className="popular-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>제목</th>
                                        <th>평점</th>
                                        <th>개봉일</th>
                                        <th>찜</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPageMovies.map((m, idx) => (
                                        <tr key={`${m.id}-${idx}`}>
                                            <td>{rankBase + idx + 1}</td>
                                            <td>{m.title}</td>
                                            <td>{m.vote_average.toFixed(1)}</td>
                                            <td>{m.release_date}</td>
                                            <td>
                                                <button
                                                    className={`wishlist-toggle-small ${isWishlisted(m.id) ? "wishlist-toggle-small-active" : ""
                                                        }`}
                                                    onClick={() => toggle(m)}
                                                >
                                                    ♥
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                            <div className="popular-pagination">
                                <button
                                    className="page-btn"
                                    disabled={popular.page === 1}
                                    onClick={() => handlePageChange(popular.page - 1)}
                                >
                                    이전
                                </button>
                                <span className="page-info">
                                    {popular.page} / {popular.totalPages}
                                </span>
                                <button
                                    className="page-btn"
                                    disabled={popular.page === popular.totalPages}
                                    onClick={() => handlePageChange(popular.page + 1)}
                                >
                                    다음
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="popular-infinite-wrapper">
                    <MovieGrid
                        movies={popular.data}
                        isWishlisted={isWishlisted}
                        toggleWishlist={toggle}
                    />
                    <div ref={sentinelRef} className="popular-sentinel">
                        {isFetchingMore && <span>더 불러오는 중...</span>}
                    </div>
                </div>
            )}

            <ScrollTopButton />
        </div>
    );
};
