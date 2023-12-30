"use server";

import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const addFavorite = async ({ movieId }: { movieId: string }) => {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("invalid session");
  }

  const existingMovie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  });
  if (!existingMovie) {
    throw new Error("invalid movieId");
  }

  await prisma.favorite.create({
    data: {
      userId: session.user.id,
      movieId: movieId,
    },
  });

  return;
};

export const removeFavorite = async ({ movieId }: { movieId: string }) => {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("invalid session");
  }

  const existingMovie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  });
  if (!existingMovie) {
    throw new Error("invalid movieId");
  }

  await prisma.favorite.delete({
    where: {
      userId_movieId: {
        userId: session.user.id,
        movieId,
      },
    },
  });
  return;
};
