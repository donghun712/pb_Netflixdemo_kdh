import React from "react";
import { Movie } from "../../api/tmdb";
import { MovieCard } from "./MovieCard";

interface Props {
    movies: Movie[];
    isWishlisted: (id: number) => boolean;
    toggleWishlist: (movie: Movie) => void;
}

export const MovieGrid: React.FC<Props> = ({
    movies,
    isWishlisted,
    toggleWishlist,
}) => {
    return (
        <div className="movie-grid">
            {movies.map((m, idx) => (
                <MovieCard
                    key={`${m.id}-${idx}`}   // ✅ id + index 조합으로 유니크 보장
                    movie={m}
                    isWishlisted={isWishlisted(m.id)}
                    onToggleWishlist={() => toggleWishlist(m)}
                />
            ))}

        </div>
    );
};
