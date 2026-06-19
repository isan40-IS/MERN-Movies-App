import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetFavoriteMoviesQuery, useToggleFavoriteMovieMutation } from '../../redux/api/users';
import MovieCard from './MovieCard';

const Favorites = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    data: favoriteMovies,
    isLoading,
    isError,
  } = useGetFavoriteMoviesQuery(undefined, {
    skip: !userInfo,
  });
  const [toggleFavoriteMovie] = useToggleFavoriteMovieMutation();

  const handleRemove = async (movieId) => {
    try {
      await toggleFavoriteMovie(movieId).unwrap();
      toast.success('Removed from favorites');
    } catch (error) {
      toast.error(error.data?.message || error.message || 'Could not update favorites');
    }
  };

  if (!userInfo) {
    navigate('/login');
    return null;
  }

  return (
    <div className="mt-[6rem] px-8">
      <h1 className="text-4xl font-bold mb-6 text-white">Your Favorite Movies</h1>

      {isLoading && <p className="text-white">Loading favorites...</p>}
      {isError && <p className="text-red-400">Could not load favorite movies.</p>}

      {!isLoading && favoriteMovies?.length === 0 && (
        <p className="text-white">You have no favorite movies yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteMovies?.map((movie) => (
          <div key={movie._id} className="relative">
            <MovieCard movie={movie} />
            <button
              onClick={() => handleRemove(movie._id)}
              className="absolute bottom-4 right-4 rounded-full bg-black bg-opacity-70 px-3 py-2 text-sm text-white hover:bg-opacity-90"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
