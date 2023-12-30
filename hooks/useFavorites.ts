import useSwr from "swr";
import fetcher from "@/lib/fetcher";
import { Movie } from "@prisma/client";

const useFavorites = () => {
  const { data, error, isLoading, mutate } = useSwr(
    "/api/favorites",
    fetcher<Movie[]>,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFavorites;
