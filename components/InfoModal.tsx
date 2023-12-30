"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useInfoModal from "@/hooks/useInfoModal";
import FavoriteButton from "./FavoriteButton";

const InfoModal = () => {
  const { movie, isOpen, closeModal } = useInfoModal();

  const handleClose = () => {
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${
            isOpen ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96">
            <video
              poster={movie?.thumbnailUrl}
              autoPlay
              muted
              loop
              src={movie?.videoUrl}
              className="w-full brightness-[60%] object-cover h-full"
            />
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
            >
              <XMarkIcon className="text-white w-6" />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {movie?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <FavoriteButton movieId={movie?.id ?? ""} />
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <div className="flex flex-row items-center gap-2 mb-8">
              <p className="text-green-400 font-semibold text-lg">New</p>
              <p className="text-white text-lg">{movie?.duration}</p>
              <p className="text-white text-lg">{movie?.genre}</p>
            </div>
            <p className="text-white text-lg">{movie?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
