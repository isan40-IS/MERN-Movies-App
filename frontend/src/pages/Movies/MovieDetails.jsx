import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetSpecificMovieQuery, useAddMovieReviewMutation } from '../../redux/api/movies';
import { useToggleFavoriteMovieMutation } from '../../redux/api/users';
import { setCredentials } from '../../redux/features/auth/authSlice';
import MovieTabs from './MovieTabs';

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] = useAddMovieReviewMutation();
  const [toggleFavoriteMovie] = useToggleFavoriteMovieMutation();

  const isFavorited = userInfo?.favorites?.some(
    (fav) => (fav._id || fav).toString() === movie?._id?.toString()
  );

  const favoriteHandler = async () => {
    if (!userInfo) {
      toast.error('Please login to manage favorites');
      return;
    }

    try {
      const updatedFavorites = await toggleFavoriteMovie(movieId).unwrap();
      dispatch(setCredentials({ ...userInfo, favorites: updatedFavorites }));
      refetch();
      toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      toast.error(error.data?.message || error.message || 'Could not update favorites');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success('Review created successfully');
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <>
      <div>
        <Link to="/" className="  text-white font-semibold hover:underline ml-[20rem]">
          Go Back
        </Link>
      </div>

      <div className="mt-[2rem]">
        <div className="flex justify-center items-center">
          <div className="relative w-[70%]">
            <img
              src={movie?.image}
              alt={movie?.name}
              className="w-full h-[30rem] rounded object-cover"
            />
            <button
              type="button"
              onClick={favoriteHandler}
              className="absolute bottom-4 right-4 rounded-full bg-black bg-opacity-70 px-4 py-2 text-white hover:bg-opacity-90"
            >
              {isFavorited ? 'Remove from Favorite' : 'Add to Favorite'}
            </button>
          </div>
        </div>
        {/* Container One */}
        <div className="container  flex justify-between ml-[20rem] mt-[3rem]">
          <section>
            <h2 className="text-5xl my-4 font-extrabold">{movie?.name}</h2>
            <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
              {movie?.detail}
            </p>
          </section>

          <div className="mr-[5rem]">
            <p className="text-2xl font-semibold">Releasing Date: {movie?.year}</p>

            <div>
              {movie?.cast.map((c) => (
                <ul key={c._id}>
                  <li className="mt-[1rem]">{c}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="container ml-[20rem]">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
