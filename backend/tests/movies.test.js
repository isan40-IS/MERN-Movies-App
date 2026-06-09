/* eslint-env jest */
import request from 'supertest';
import app from '../app.js';
import { connectTestDB, clearTestDB, closeTestDB } from './setupTestDB.js';
import Genre from '../models/Genre.js';
import Movie from '../models/Movie.js';

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

describe('Movie API - Search and Filter Functionality', () => {
  test('GET /api/v1/movies/all-movies should return all movies', async () => {
    const genre = await Genre.create({ name: 'Action' });
    await Movie.create({
      name: 'Test Action Movie',
      year: 2024,
      genre: genre._id,
      detail: 'An action-packed movie',
    });

    const res = await request(app).get('/api/v1/movies/all-movies');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/v1/movies/all-movies?search=test should filter movies by name (case-insensitive)', async () => {
    const genre = await Genre.create({ name: 'Drama' });
    await Movie.create({
      name: 'The Great Movie',
      year: 2023,
      genre: genre._id,
      detail: 'A great drama movie',
    });
    await Movie.create({
      name: 'Another Film',
      year: 2024,
      genre: genre._id,
      detail: 'A different movie',
    });

    const res = await request(app).get('/api/v1/movies/all-movies?search=great');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toContain('Great');
  });

  test('GET /api/v1/movies/all-movies?genre=id should filter movies by genre', async () => {
    const actionGenre = await Genre.create({ name: 'Action' });
    const dramaGenre = await Genre.create({ name: 'Drama' });

    await Movie.create({
      name: 'Action Hero',
      year: 2023,
      genre: actionGenre._id,
      detail: 'An action movie',
    });
    await Movie.create({
      name: 'Drama Series',
      year: 2024,
      genre: dramaGenre._id,
      detail: 'A drama movie',
    });

    const res = await request(app).get(`/api/v1/movies/all-movies?genre=${actionGenre._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Action Hero');
  });

  test('GET /api/v1/movies/all-movies?year=2024 should filter movies by year', async () => {
    const genre = await Genre.create({ name: 'Sci-Fi' });
    await Movie.create({
      name: 'Future Movie 2024',
      year: 2024,
      genre: genre._id,
      detail: 'A 2024 sci-fi movie',
    });
    await Movie.create({
      name: 'Past Movie 2020',
      year: 2020,
      genre: genre._id,
      detail: 'A 2020 sci-fi movie',
    });

    const res = await request(app).get('/api/v1/movies/all-movies?year=2024');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].year).toBe(2024);
  });

  test('GET /api/v1/movies/all-movies should combine multiple filters', async () => {
    const actionGenre = await Genre.create({ name: 'Action' });
    const dramaGenre = await Genre.create({ name: 'Drama' });

    await Movie.create({
      name: 'Action 2024',
      year: 2024,
      genre: actionGenre._id,
      detail: 'New action movie',
    });
    await Movie.create({
      name: 'Drama 2024',
      year: 2024,
      genre: dramaGenre._id,
      detail: 'New drama movie',
    });

    const res = await request(app).get(
      `/api/v1/movies/all-movies?genre=${actionGenre._id}&year=2024`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Action 2024');
  });

  test('GET /api/v1/movies/all-movies?search=nonexistent should return empty array', async () => {
    const genre = await Genre.create({ name: 'Comedy' });
    await Movie.create({
      name: 'Funny Movie',
      year: 2024,
      genre: genre._id,
      detail: 'A comedy movie',
    });

    const res = await request(app).get('/api/v1/movies/all-movies?search=nonexistent');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});
