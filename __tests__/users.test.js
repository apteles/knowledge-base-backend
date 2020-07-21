import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../src/app';
import truncate from './utils/truncate';
import factory from './utils/factories';

const server = app.server;

describe('Users', () => {
  beforeEach(async () => {
    await truncate();
  });
  it('should return a new user with password encrypted', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });
    const compareHash = await bcrypt.compare('123456', user.password_hash);
    expect(compareHash).toBe(true);
  });

  it('should be able register a new user', async () => {
    const user = await factory.attrs('User');
    const response = await request(server).post('/users').send(user);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('password');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('password_hash');

    expect(response.body.name).toBe(user.name);
    expect(response.body.email).toBe(user.email);
    expect(response.body.status).toBe(user.status);
  });

  it('should return error if user already exists and status 400', async () => {
    const user = await factory.attrs('User');
    await request(server).post('/users').send(user);
    const response = await request(server).post('/users').send(user);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveProperty('email');
    expect(response.body.errors.email).toEqual(['email already exists']);
  });

  it('should response with errors if body sent empty and status 400', async () => {
    const response = await request(server).post('/users').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveProperty('name');
    expect(response.body.errors).toHaveProperty('status');
    expect(response.body.errors).toHaveProperty('password');
    expect(response.body.errors).toHaveProperty('email');
  });

  it('should return status 401', async () => {
    const response = await request(server).get('/users');
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Token not provided');
  });

  afterAll(() => {
    app.shutdown();
  });
});
