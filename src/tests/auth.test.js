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


describe('Auth Login Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/v1/auth/login', () => {
    const validUserData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    test('should login user successfully', async () => {
      const existingUser = new User(validUserData);
      await existingUser.save();

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(200);

      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.user).toHaveProperty("username");
      expect(response.body.data.user.email).toBe(validUserData.email);
      expect(response.body.data.user).not.toHaveProperty('password');
    });

    test('should not login when invalid email provided', async () => {
      const existingUser = new User(validUserData);
      await existingUser.save();

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test1@example.com',
          password: 'password123',
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('should not login when wrong password provided', async () => {
      const existingUser = new User(validUserData);
      await existingUser.save();

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password1234',
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});


describe('Update User Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('PUT /api/v1/auth/me', () => {

    test('should update user successfully', async () => {
      const registerRes = await request(app)
        .post('/api/v1/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(201);

      const token = registerRes.body.data.token;

      const res = await request(app)
        .put('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .send({ username: "updatedUsername", mockFile:true })
        .expect(201);

      expect(res.body.data.username).toBe("updatedUsername");
    });

    test('should update only profile image', async () => {
      const registerRes = await request(app)
        .post('/api/v1/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(201);

      const token = registerRes.body.data.token;

      const res = await request(app)
        .put('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .send({mockFile:true})
        .expect(201);

      expect(res.body.data.profileImage).toBeDefined();
    });

    test('should update username only', async () => {
      const registerRes = await request(app)
        .post('/api/v1/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(201);

      const token = registerRes.body.data.token;

      const res = await request(app)
        .put('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .send({ username: "updatedUsername"})
        .expect(201);

      expect(res.body.data.username).toBe("updatedUsername");
    });

    test('should show unauthorized user', async () => {
      const registerRes = await request(app)
        .post('/api/v1/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(201);

      const token = registerRes.body.data.token;

      const res = await request(app)
        .put('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}1`)
        .send({ username: "updatedUsername"})
        .expect(401);
    });
  });
});

describe('Fetch User Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/v1/auth/me', () => {

    test('should update user successfully', async () => {
      const registerRes = await request(app)
        .post('/api/v1/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(201);

      const token = registerRes.body.data.token;

      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.data.username).toBe("testuser");
      expect(res.body.data.email).toBe("test@example.com");
    });

    test('should show unauthorized user', async () => {
      const registerRes = await request(app)
        .post('/api/v1/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(201);

      const token = registerRes.body.data.token;

      await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}1`)
        .expect(401);
    });
  });
});