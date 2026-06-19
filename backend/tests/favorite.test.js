/* eslint-env jest */
import request from 'supertest';
import app from '../app.js';
import Movie from '../models/Movie.js';
import { connectTestDB, clearTestDB, closeTestDB } from './setup.js';
import { createLoggedInUserAgent, createTestMovie } from './helpers/testData.js';

beforeAll(connectTestDB);
afterEach(clearTestDB);
afterAll(closeTestDB);

describe('Favorite Movie API', () => {
  describe('POST /api/v1/users/favorites/:id', () => {
    it('should add a movie to the user favorites when authenticated', async () => {
      const { agent } = await createLoggedInUserAgent();
      const movie = await createTestMovie({ name: 'Favorite Movie' });

      const res = await agent.post(`/api/v1/users/favorites/${movie._id}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty('_id', movie._id.toString());
    });

    it('should remove a movie from favorites when the same movie is toggled again', async () => {
      const { agent } = await createLoggedInUserAgent();
      const movie = await createTestMovie({ name: 'Toggle Favorite Movie' });

      const firstRes = await agent.post(`/api/v1/users/favorites/${movie._id}`);
      expect(firstRes.statusCode).toBe(200);
      expect(firstRes.body).toHaveLength(1);

      const secondRes = await agent.post(`/api/v1/users/favorites/${movie._id}`);
      expect(secondRes.statusCode).toBe(200);
      expect(Array.isArray(secondRes.body)).toBe(true);
      expect(secondRes.body).toHaveLength(0);
    });

    it('should reject favorite toggling when not authenticated', async () => {
      const movie = await createTestMovie({ name: 'Unauthorized Favorite Movie' });

      const res = await request(app).post(`/api/v1/users/favorites/${movie._id}`);

      expect([401, 403]).toContain(res.statusCode);
    });
  });

  describe('GET /api/v1/users/favorites', () => {
    it('should return the user favorite movies when authenticated', async () => {
      const { agent } = await createLoggedInUserAgent();
      const movie = await createTestMovie({ name: 'Favorite List Movie' });

      await agent.post(`/api/v1/users/favorites/${movie._id}`);

      const res = await agent.get('/api/v1/users/favorites');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty('_id', movie._id.toString());
    });

    it('should reject access to favorites when not authenticated', async () => {
      const res = await request(app).get('/api/v1/users/favorites');
      expect([401, 403]).toContain(res.statusCode);
    });
  });
});
