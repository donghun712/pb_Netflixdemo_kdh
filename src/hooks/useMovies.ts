import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Movie, TMDBResponse } from "../api/tmdb";

export const useMovies = (
  fetcher: (page?: number) => Promise<AxiosResponse<TMDBResponse<Movie>>>
) => {
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async (targetPage = 1, replace = true) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetcher(targetPage);
      setPage(res.data.page);
      setTotalPages(res.data.total_pages);
      setData((prev) =>
        replace ? res.data.results : [...prev, ...res.data.results]
      );
    } catch (e) {
      console.error(e);
      setError("영화 데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, page, totalPages, isLoading, error, load };
};
