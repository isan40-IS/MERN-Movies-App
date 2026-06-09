/* eslint-env jest */
import request from 'supertest';
import app from '../app.js';

describe('Health API', () => {
  it('should return backend health status', async () => {
    const res = await request(app).get('/api/v1/health');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('backend');
    expect(res.body.timestamp).toBeDefined();
  });
});
