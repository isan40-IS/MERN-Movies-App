import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
    }),

    getFavoriteMovies: builder.query({
      query: () => ({
        url: `${USERS_URL}/favorites`,
      }),
      providesTags: ['Favorites'],
    }),

    toggleFavoriteMovie: builder.mutation({
      query: (movieId) => ({
        url: `${USERS_URL}/favorites/${movieId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetUsersQuery,
  useGetFavoriteMoviesQuery,
  useToggleFavoriteMovieMutation,
} = userApiSlice;
