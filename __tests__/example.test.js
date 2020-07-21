import request from 'supertest';
import app from '../src/app';

describe('Controller Hello', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/check');

    expect(response.status).toBe(200);
  });

  it('should return {message: "hello world"} ', async () => {
    const response = await request(app).get('/check');

    expect(response.body).toEqual({ message: "Hi I'm alive" });
  });
});
