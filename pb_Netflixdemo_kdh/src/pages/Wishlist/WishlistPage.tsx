import React from "react";
import { MovieGrid } from "../../components/movies/MovieGrid";
import { useWishlist } from "../../hooks/useWishlist";
import "../../styles/wishlist.css";
import "../../styles/movies.css";

export const WishlistPage: React.FC = () => {
  const { wishlist, toggle, clear, isWishlisted } = useWishlist();

  return (
    <div className="page wishlist-page">
      <div className="wishlist-header">
        <h1>찜 목록</h1>

        {wishlist.length > 0 && (
          <button className="btn btn-secondary" onClick={clear}>
            전체 삭제
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          ♥ 찜한 영화가 없습니다.  
          <br />
          인기/검색 페이지에서 마음에 드는 영화를 찜해보세요!
        </div>
      ) : (
        <MovieGrid
          movies={wishlist}
          isWishlisted={isWishlisted}
          toggleWishlist={toggle}
        />
      )}
    </div>
  );
};
