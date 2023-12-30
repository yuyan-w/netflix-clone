import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "invalid session" }, { status: 400 });
  }

  const favoriteMovies = await prisma.favorite.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      movie: true,
    },
  });

  const favorites = favoriteMovies.map((favorite) => favorite.movie);
  return NextResponse.json(favorites, { status: 200 });
}
