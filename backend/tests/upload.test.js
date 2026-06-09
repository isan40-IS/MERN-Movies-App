/* eslint-env jest */
import request from 'supertest';
import app from '../app.js';

describe('Upload API', () => {
  describe('POST /api/v1/upload', () => {
    it('should upload valid image file', async () => {
      const imageBuffer = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=',
        'base64'
      );

      const res = await request(app)
        .post('/api/v1/upload')
        .attach('image', imageBuffer, {
          filename: 'test-image.png',
          contentType: 'image/png',
        });

      expect([200, 201]).toContain(res.statusCode);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty('message', 'Image uploaded successfully');
      expect(res.body).toHaveProperty('image');
    });

    it('should reject upload when no file is provided', async () => {
      const res = await request(app).post('/api/v1/upload');

      expect([400, 422, 500]).toContain(res.statusCode);
    });

    it.skip('should reject invalid non-image file', async () => {
      const res = await request(app)
        .post('/api/v1/upload')
        .attach('image', Buffer.from('This is not an image'), {
          filename: 'test.txt',
          contentType: 'text/plain',
        });

      expect([400, 415, 422, 500]).toContain(res.statusCode);
    });
  });
});