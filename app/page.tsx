import Billboard from "@/components/Billboard";
import FavoriteList from "@/components/FavoriteList";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const getMovieList = async () => {
  try {
    return prisma.movie.findMany();
  } catch (error) {
    throw error;
  }
};

const getFavoriteMovies = async ({ userId }: { userId: string }) => {
  const favoriteMovies = await prisma.favorite.findMany({
    where: {
      userId,
    },
    include: {
      movie: true,
    },
  });
  return favoriteMovies.map((favorite) => favorite.movie);
};

export default async function Home() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/auth");
  }

  const movies = await getMovieList();

  return (
    <>
      <InfoModal />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending now" movies={movies} />
        <FavoriteList />
      </div>
    </>
  );
}
