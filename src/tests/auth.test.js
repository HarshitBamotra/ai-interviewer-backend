const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

jest.mock('cloudinary');
jest.mock('multer-storage-cloudinary');
jest.mock('multer');

const User = require('../models/user.model');
const authController = require('../controllers/auth.controller');
const apiRouter = require("../routes/index");

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

describe('Auth Registration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/v1/auth/register', () => {
    const validUserData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    test('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          mockFile: true
        })
        .expect(201);

      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.user.email).toBe(validUserData.email);
      expect(response.body.data.user.username).toBe(validUserData.username);
      expect(response.body.data.user.profileImage).toBeDefined();
      expect(response.body.data.isNewUser).toBe(true);
      expect(response.body.data.user).not.toHaveProperty('password');
    });

    test('should register a new user without profile image', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(validUserData)
        .expect(201);

      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.user.email).toBe(validUserData.email);
      expect(response.body.data.user.username).toBe(validUserData.username);
      expect(response.body.data.user.profileImage).toBe(null);
      expect(response.body.data.isNewUser).toBe(true);
      expect(response.body.data.user).not.toHaveProperty('password');
    });

    test('should return existing user with correct password', async () => {
      const existingUser = new User(validUserData);
      await existingUser.save();

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(validUserData)
        .expect(201);

      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.isNewUser).toBe(false);
      expect(response.body.data.user.email).toBe(validUserData.email);
      expect(response.body.data.user.username).toBe(validUserData.username);
      expect(response.body.data.user).not.toHaveProperty('password');
    });

    describe('JWT Token Tests', () => {
      test('should generate valid JWT token', async () => {
        process.env.JWT_SECRET = 'test-secret';

        const response = await request(app)
          .post('/api/v1/auth/register')
          .send({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
          })
          .expect(201);

        const token = response.body.data.token;
        expect(token).toBeDefined();

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        expect(decoded).toHaveProperty('id');
        expect(decoded).toHaveProperty('exp');
      });
    });

    describe('Password Hashing Tests', () => {
      test('should hash password before saving', async () => {
        const userData = {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        };

        await request(app)
          .post('/api/v1/auth/register')
          .send(userData)
          .expect(201);

        const savedUser = await User.findOne({ email: userData.email });
        expect(savedUser.password).not.toBe(userData.password);

        const isValidPassword = await bcrypt.compare(userData.password, savedUser.password);
        expect(isValidPassword).toBe(true);
      });
    });

  });
});