"use client";

import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useInfoModal from "@/hooks/useInfoModal";
import { Movie } from "@prisma/client";

type MoreInfoButtonProps = {
  movie: Movie;
};

const MoreInfoButton: React.FC<MoreInfoButtonProps> = ({ movie }) => {
  const { openModal } = useInfoModal();
  return (
    <button
      onClick={() => openModal(movie)}
      className="
  bg-white
  text-white
    bg-opacity-30 
    rounded-md 
    py-1 md:py-2 
    px-2 md:px-4
    w-auto 
    text-xs lg:text-lg 
    font-semibold
    flex
    flex-row
    items-center
    hover:bg-opacity-20
    transition
  "
    >
      <InformationCircleIcon className="w-4 md:w-7 mr-1" />
      More Info
    </button>
  );
};

export default MoreInfoButton;
