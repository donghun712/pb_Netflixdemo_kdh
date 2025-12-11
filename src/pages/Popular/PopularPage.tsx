import React, { useEffect, useRef, useState } from "react";
import { getPopular, Movie } from "../../api/tmdb";
import { useMovies } from "../../hooks/useMovies";
import { useWishlist } from "../../hooks/useWishlist";
import { MovieGrid } from "../../components/movies/MovieGrid";
import { ScrollTopButton } from "../../components/common/ScrollTopButton";
import "../../styles/movies.css";
import "../../styles/popular.css";

type ViewType = "table" | "infinite";

export const PopularPage: React.FC = () => {
  const popular = useMovies(getPopular);
  const { wishlist, toggle, isWishlisted } = useWishlist();

  const [view, setView] = useState<ViewType>("table");
  
  // ✨ [추가] Infinite View를 위한 별도의 누적 데이터 상태
  const [infiniteMovies, setInfiniteMovies] = useState<Movie[]>([]);
  
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // 1. 뷰에 따라 body 스크롤 제어
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

  // ✨ [추가] 데이터 누적 로직 (Hook이 데이터를 덮어써도 여기서 보존함)
  useEffect(() => {
    if (view !== "infinite") return;
    if (popular.data.length === 0) return;

    if (popular.page === 1) {
      // 1페이지면 그냥 덮어쓰기 (초기화)
      setInfiniteMovies(popular.data);
    } else {
      // 2페이지 이상이면 기존 데이터에 이어 붙이기 (중복 제거 포함)
      setInfiniteMovies((prev) => {
        const newMovies = popular.data;
        // 기존 ID와 겹치지 않는 것만 필터링 (안전장치)
        const uniqueNewMovies = newMovies.filter(
          (nm) => !prev.some((pm) => pm.id === nm.id)
        );
        return [...prev, ...uniqueNewMovies];
      });
    }
  }, [popular.data, popular.page, view]);

  // 2. Infinite scroll용 IntersectionObserver
  useEffect(() => {
    if (view !== "infinite") return;
    if (!sentinelRef.current) return;
    
    if (isFetchingMore || popular.page >= popular.totalPages) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsFetchingMore(true);
          // 훅의 동작 방식과 상관없이 페이지를 증가시킴
          await popular.load(popular.page + 1, true); 
          setIsFetchingMore(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [view, popular.page, popular.totalPages, isFetchingMore]); 

  // 3. 뷰 전환 핸들러
  const handleViewChange = (next: ViewType) => {
    if (view === next) return;
    setView(next);
    window.scrollTo({ top: 0 });
    
    // 뷰를 바꿀 때 데이터를 깔끔하게 1페이지부터 다시 로드
    popular.load(1, false); 
    if (next === "infinite") {
        setInfiniteMovies([]); // 초기화
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > popular.totalPages) return;
    popular.load(page, false);
  };

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
            className={`toggle-btn ${view === "infinite" ? "toggle-btn-active" : ""}`}
            onClick={() => handleViewChange("infinite")}
          >
            Infinite View
          </button>
        </div>
      </div>

      {popular.error && (
        <div className="section-error popular-error">{popular.error}</div>
      )}

      {/* ===== TABLE VIEW ===== */}
      {view === "table" ? (
        popular.isLoading ? (
          <div className="movie-skeleton-grid">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="movie-skeleton-card" />
            ))}
          </div>
        ) : (
          <div className="popular-table-wrapper">
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
                {popular.data.map((m, idx) => (
                  <tr key={`${m.id}-${idx}`}>
                    <td>{(popular.page - 1) * 20 + idx + 1}</td>
                    <td>{m.title}</td>
                    <td>{m.vote_average.toFixed(1)}</td>
                    <td>{m.release_date}</td>
                    <td>
                      <button
                        onClick={() => toggle(m)}
                        className={`wishlist-toggle-small ${
                          isWishlisted(m.id) ? "wishlist-toggle-small-active" : ""
                        }`}
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
          </div>
        )
      ) : (
        /* ===== INFINITE VIEW ===== */
        <div className="popular-infinite-wrapper">
          
          {/* ✨ [수정] popular.data 대신 누적된 infiniteMovies 사용 */}
          {infiniteMovies.length > 0 && (
            <MovieGrid
              movies={infiniteMovies}
              isWishlisted={isWishlisted}
              toggleWishlist={toggle}
            />
          )}

          {/* 최초 로딩 시 스켈레톤 */}
          {popular.isLoading && infiniteMovies.length === 0 && (
            <div className="movie-skeleton-grid">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="movie-skeleton-card" />
              ))}
            </div>
          )}

          {/* 하단 센티넬 및 추가 로딩 */}
          <div ref={sentinelRef} className="popular-sentinel">
            {isFetchingMore && (
              <div className="movie-skeleton-grid">
                {/* ✨ [수정] 스켈레톤 개수 9개로 변경 */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="movie-skeleton-card" />
                ))}
              </div>
            )}
            
            {!isFetchingMore && popular.page >= popular.totalPages && infiniteMovies.length > 0 && (
              <p style={{ marginTop: '20px', color: '#666' }}>모든 콘텐츠를 불러왔습니다.</p>
            )}
          </div>
        </div>
      )}

      <ScrollTopButton />
    </div>
  );
};