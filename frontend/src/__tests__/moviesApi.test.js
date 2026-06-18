import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const createApiStore = (apiSlice) =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  });

describe('movies API query wiring', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('VITE_API_URL', 'http://localhost:3000');
    globalThis.fetch = vi.fn(async () =>
      Promise.resolve(
        new Response(JSON.stringify([]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );
  });

  it('should build all-movies query strings from active filters', async () => {
    const { apiSlice } = await import('../redux/api/apiSlice');
    const { moviesApiSlice } = await import('../redux/api/movies');
    const store = createApiStore(apiSlice);

    await store.dispatch(
      moviesApiSlice.endpoints.getAllMovies.initiate({
        search: 'matrix',
        genre: 'genre-1',
        year: '1999',
        rating: '8',
      })
    );

    const request = globalThis.fetch.mock.calls[0][0];
    const url = request.url || request.toString();

    expect(url).toContain('/api/v1/movies/all-movies');
    expect(url).toContain('search=matrix');
    expect(url).toContain('genre=genre-1');
    expect(url).toContain('year=1999');
    expect(url).toContain('rating=8');
  });
});
