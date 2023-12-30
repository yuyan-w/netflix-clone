import useSwr from "swr";
import fetcher from "@/lib/fetcher";
import { Movie } from "@prisma/client";

const useMovie = (id?: string) => {
  const { data, error, isLoading } = useSwr(
    id ? `/api/movies/${id}` : null,
    fetcher<Movie>,
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
  };
};

export default useMovie;
