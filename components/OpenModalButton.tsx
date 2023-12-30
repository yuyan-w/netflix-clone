"use client";

import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import useInfoModal from "@/hooks/useInfoModal";
import { Movie } from "@prisma/client";

type OpenModalButtonProps = {
  movie: Movie;
};

const OpenModalButton: React.FC<OpenModalButtonProps> = ({ movie }) => {
  const { openModal } = useInfoModal();
  return (
    <div
      onClick={() => openModal(movie)}
      className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default OpenModalButton;
