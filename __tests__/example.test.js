import request from 'supertest';
import app from '../src/app';

describe('Controller Hello', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
  });

  it('should return {message: "hello world"} ', async () => {
    const response = await request(app).get('/');

    expect(response.body).toEqual({ message: 'hello world' });
  });
});
