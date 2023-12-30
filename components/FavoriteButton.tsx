"use client";

import useFavorites from "@/hooks/useFavorites";
import React, { useMemo } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";
import { addFavorite, removeFavorite } from "@/actions/favorite";

type FavoriteButtonProps = {
  movieId: string;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites, data: favorites = [] } = useFavorites();

  const isFavorite = useMemo(() => {
    return favorites.some((favorite) => favorite.id === movieId);
  }, [favorites, movieId]);

  const toggleFavorites = async () => {
    if (isFavorite) {
      await removeFavorite({ movieId });
    } else {
      await addFavorite({ movieId });
    }

    mutateFavorites();
  };

  const Icon = isFavorite ? CheckIcon : PlusIcon;
  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default FavoriteButton;
