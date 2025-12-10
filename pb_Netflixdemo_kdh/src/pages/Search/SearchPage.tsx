import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Genre,
    getGenres,
    searchMovies,
    Movie,
} from "../../api/tmdb";
import { MovieGrid } from "../../components/movies/MovieGrid";
import { useWishlist } from "../../hooks/useWishlist";
import "../../styles/movies.css";
import "../../styles/search.css";

type SortOption = "popularity.desc" | "vote_average.desc" | "release_date.desc";

export const SearchPage: React.FC = () => {
    const [query, setQuery] = useState("");
    const [genres, setGenres] = useState<Genre[]>([]);
    const [genreId, setGenreId] = useState<number | 0>(0);
    const [minVote, setMinVote] = useState<number>(0);
    const [sortBy, setSortBy] = useState<SortOption>("popularity.desc");

    const [rawResults, setRawResults] = useState<Movie[]>([]); // TMDB에서 받아온 원본(여러 페이지 누적)
    const [page, setPage] = useState(0);                      // 현재 TMDB page
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);        // 첫 검색/재검색
    const [isLoadingMore, setIsLoadingMore] = useState(false); // 인피니티 로딩
    const [error, setError] = useState<string | null>(null);

    const { toggle, isWishlisted } = useWishlist();
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    // 장르 목록 로딩
    useEffect(() => {
        (async () => {
            try {
                const res = await getGenres();
                setGenres(res.data.genres);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    // 원본 리스트에 필터/정렬 적용
    const filteredResults = useMemo(() => {
        let list = rawResults;

        if (genreId) {
            list = list.filter((m) => m.genre_ids?.includes(genreId));
        }

        if (minVote > 0) {
            list = list.filter((m) => m.vote_average >= minVote);
        }

        list = [...list].sort((a, b) => {
            switch (sortBy) {
                case "vote_average.desc":
                    return (b.vote_average || 0) - (a.vote_average || 0);
                case "release_date.desc":
                    return (
                        (new Date(b.release_date).getTime() || 0) -
                        (new Date(a.release_date).getTime() || 0)
                    );
                case "popularity.desc":
                default:
                    return (b.popularity || 0) - (a.popularity || 0);
            }
        });

        return list;
    }, [rawResults, genreId, minVote, sortBy]);

    // 검색 실행 (page 1부터 다시)
    const doSearch = async () => {
        if (!query.trim()) {
            setError("검색어를 입력해주세요.");
            setRawResults([]);
            setPage(0);
            setTotalPages(1);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            setRawResults([]);
            setPage(0);
            setTotalPages(1);

            const res = await searchMovies({
                query: query.trim(),
                page: 1,
            });

            setRawResults(res.data.results);
            setPage(res.data.page);
            setTotalPages(res.data.total_pages);
            window.scrollTo({ top: 0 }); // 맨 위로
        } catch (e) {
            console.error(e);
            setError("검색 중 오류가 발생했습니다.");
            setRawResults([]);
            setPage(0);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        doSearch();
    };

    const handleReset = () => {
        setQuery("");
        setGenreId(0);
        setMinVote(0);
        setSortBy("popularity.desc");
        setRawResults([]);
        setPage(0);
        setTotalPages(1);
        setError(null);
        window.scrollTo({ top: 0 });
    };

    // 인피니티 스크롤: sentinel 이 화면에 보이면 다음 page 로딩
    useEffect(() => {
        if (!sentinelRef.current) return;
        if (!query.trim()) return;
        if (page >= totalPages) return;

        const target = sentinelRef.current;

        const observer = new IntersectionObserver(
            async (entries) => {
                const entry = entries[0];
                if (!entry.isIntersecting) return;
                if (isLoading || isLoadingMore) return;
                if (page >= totalPages) return;

                try {
                    setIsLoadingMore(true);

                    const startPage = page + 1;
                    const remaining = totalPages - page;
                    const pagesToFetch = Math.min(2, remaining); // ✅ 최대 2페이지

                    // page+1, page+2 를 병렬로 요청
                    const promises = [];
                    for (let i = 0; i < pagesToFetch; i++) {
                        promises.push(
                            searchMovies({
                                query: query.trim(),
                                page: startPage + i,
                            })
                        );
                    }

                    const responses = await Promise.all(promises);
                    const mergedResults = responses.flatMap((r) => r.data.results);

                    setRawResults((prev) => [...prev, ...mergedResults]);

                    // ✅ 현재 페이지를 실제로 불러온 마지막 페이지까지 올려줌
                    setPage((prevPage) => prevPage + pagesToFetch);
                    // totalPages 는 TMDB 값 그대로 유지
                } catch (e) {
                    console.error(e);
                    setError("추가 데이터를 불러오는 중 오류가 발생했습니다.");
                } finally {
                    setIsLoadingMore(false);
                }
            },
            { threshold: 1 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [query, page, totalPages, isLoading, isLoadingMore]);


    return (
        <div className="page search-page">
            <h1>찾아보기</h1>

            <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-row">
                    <input
                        type="text"
                        placeholder="영화 제목을 입력하세요."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                    />

                    <button type="submit" className="btn btn-primary">
                        검색
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={handleReset}
                    >
                        초기화
                    </button>
                </div>

                <div className="search-filters">
                    <div className="filter-group">
                        <label>장르</label>
                        <select
                            value={genreId}
                            onChange={(e) => setGenreId(Number(e.target.value))}
                        >
                            <option value={0}>전체</option>
                            {genres.map((g) => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>최소 평점</label>
                        <input
                            type="range"
                            min={0}
                            max={10}
                            step={0.5}
                            value={minVote}
                            onChange={(e) => setMinVote(Number(e.target.value))}
                        />
                        <span className="filter-value">{minVote.toFixed(1)}+</span>
                    </div>

                    <div className="filter-group">
                        <label>정렬</label>
                        <select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value as SortOption)
                            }
                        >
                            <option value="popularity.desc">인기순</option>
                            <option value="vote_average.desc">평점순</option>
                            <option value="release_date.desc">최신 개봉순</option>
                        </select>
                    </div>
                </div>
            </form>

            {error && <div className="section-error search-error">{error}</div>}

            {isLoading && <div className="section-loading">검색 중...</div>}

            {!isLoading && !error && filteredResults.length === 0 && query.trim() && (
                <div className="section-error search-empty">
                    검색 결과가 없습니다. 조건을 바꾸거나 다른 키워드로 검색해보세요.
                </div>
            )}

            {filteredResults.length > 0 && (
                <>
                    <div className="search-result-info">
                        <span>
                            현재까지 불러온 결과: {filteredResults.length}개 (TMDB 페이지 {page} /{" "}
                            {totalPages})
                        </span>
                    </div>

                    <MovieGrid
                        movies={filteredResults}
                        isWishlisted={isWishlisted}
                        toggleWishlist={toggle}
                    />

                    <div ref={sentinelRef} className="search-sentinel">
                        {page < totalPages
                            ? isLoadingMore
                                ? "더 불러오는 중..."
                                : "아래로 스크롤하면 더 불러옵니다."
                            : "마지막 페이지입니다."}
                    </div>
                </>
            )}
        </div>
    );
};
