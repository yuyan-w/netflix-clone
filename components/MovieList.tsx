import { Movie } from "@prisma/client";
import React from "react";
import MovieCard from "./MovieCard";

type MovieListProps = {
  movies: Movie[];
  title: string;
};

const MovieList: React.FC<MovieListProps> = ({ movies, title }) => {
  if (movies.length === 0) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
