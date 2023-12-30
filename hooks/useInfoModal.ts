import { Movie } from "@prisma/client";
import { create } from "zustand";

type ModalStoreType = {
  movie?: Movie;
  isOpen: boolean;
  openModal: (movie: Movie) => void;
  closeModal: () => void;
};

const useInfoModal = create<ModalStoreType>((set) => ({
  movie: undefined,
  isOpen: false,
  openModal: (movie: Movie) => set({ isOpen: true, movie }),
  closeModal: () => set({ isOpen: false, movie: undefined }),
}));

export default useInfoModal;
