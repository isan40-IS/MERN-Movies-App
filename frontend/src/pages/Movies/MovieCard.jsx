import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { useToggleFavoriteMovieMutation } from '../../redux/api/users';
import { setCredentials } from '../../redux/features/auth/authSlice';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [toggleFavoriteMovie] = useToggleFavoriteMovieMutation();

  const isFavorited = userInfo?.favorites?.some(
    (fav) => (fav._id || fav).toString() === movie._id.toString()
  );

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    if (!userInfo) return;

    try {
      const updatedFavorites = await toggleFavoriteMovie(movie._id).unwrap();
      dispatch(setCredentials({ ...userInfo, favorites: updatedFavorites }));
    } catch (error) {
      console.error('Favorite update failed', error);
    }
  };

  return (
    <div key={movie._id} className="relative group m-4 w-[20rem]">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          className="w-full h-[20rem] rounded object-cover transition duration-300 ease-in-out transform group-hover:opacity-70"
        />
      </Link>

      <button
        type="button"
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 z-10 rounded-full bg-black bg-opacity-60 p-2 text-white hover:bg-opacity-90"
      >
        {isFavorited ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
      </button>

      <p className="mt-3 text-white font-semibold text-center truncate">{movie.name}</p>
    </div>
  );
};

export default MovieCard;
