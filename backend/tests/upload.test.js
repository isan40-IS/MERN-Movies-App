/* eslint-env jest */
import path from 'path';
import request from 'supertest';
import app from '../app.js';

describe('Upload API', () => {
  const imagePath = path.join(process.cwd(), 'backend/tests/fixtures/test-image.png');
  const textPath = path.join(process.cwd(), 'backend/tests/fixtures/test.txt');

  describe('POST /api/v1/upload', () => {
    it('should upload valid image file', async () => {
      const res = await request(app).post('/api/v1/upload').attach('image', imagePath);

      expect([200, 201]).toContain(res.statusCode);
      expect(res.body).toBeDefined();

      const responseText = JSON.stringify(res.body);
      expect(responseText).toMatch(/uploads|image|png|jpg|jpeg|webp/i);
    });

    it('should reject upload when no file is provided', async () => {
      const res = await request(app).post('/api/v1/upload');

      expect([400, 422, 500]).toContain(res.statusCode);
    });

    it('should reject invalid non-image file', async () => {
      const res = await request(app).post('/api/v1/upload').attach('image', textPath);

      expect([400, 415, 422, 500]).toContain(res.statusCode);
    });
  });
});
