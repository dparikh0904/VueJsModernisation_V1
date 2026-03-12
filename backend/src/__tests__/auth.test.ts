import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../server';
import pool from '../config/database';

describe('Auth API', () => {
  beforeAll(async () => {
    // Clean test data
    await pool.query('DELETE FROM users WHERE email LIKE $1', ['%test@example.com%']);
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /api/users/signup', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/users/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe('test@example.com');
      expect(response.body.user).not.toHaveProperty('password_hash');
    });

    it('should reject duplicate email', async () => {
      const response = await request(app)
        .post('/api/users/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveProperty('email');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test2@example.com',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveProperty('name');
      expect(response.body.errors).toHaveProperty('password');
    });
  });

  describe('POST /api/users/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          user: {
            email: 'test@example.com',
            password: 'password123',
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toHaveProperty('token');
      expect(response.body.user.email).toBe('test@example.com');
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          user: {
            email: 'test@example.com',
            password: 'wrongpassword',
          },
        });

      expect(response.status).toBe(401);
      expect(response.body.errors).toHaveProperty('email');
    });

    it('should reject non-existent user', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          user: {
            email: 'nonexistent@example.com',
            password: 'password123',
          },
        });

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('should refresh access token with valid refresh token', async () => {
      // First login to get refresh token
      const loginResponse = await request(app)
        .post('/api/users/login')
        .send({
          user: {
            email: 'test@example.com',
            password: 'password123',
          },
        });

      const cookies = loginResponse.headers['set-cookie'];

      // Then refresh
      const response = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', cookies);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('accessToken');
    });

    it('should reject missing refresh token', async () => {
      const response = await request(app).post('/api/auth/refresh');

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout and clear cookies', async () => {
      const response = await request(app).post('/api/auth/logout');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.headers['set-cookie']).toBeDefined();
    });
  });
});