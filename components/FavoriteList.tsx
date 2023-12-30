"use client";

import useFavorites from "@/hooks/useFavorites";
import React from "react";
import MovieCard from "./MovieCard";

const FavoriteList = () => {
  const { data: favorites = [] } = useFavorites();
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          MyList
        </p>
        <div className="grid grid-cols-4 gap-2">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteList;
