import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { movieId?: string } }
) {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("invalid session");
  }

  const movieId = params.movieId;
  if (!movieId) {
    throw new Error("invalid movieId");
  }

  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });
  if (!movie) {
    throw new Error("movie not found");
  }

  return NextResponse.json(movie);
}
