const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const User = require("../../models/user.model");

describe('Auth Integration Tests', () => {
    test('should complete full registration flow', async () => {
        const userData = {
            username: 'integrationuser',
            email: 'integration@example.com',
            password: 'password123'
        };

        const registerResponse = await request(app)
            .post('/api/v1/auth/register')
            .send(userData)
            .expect(201);

        expect(registerResponse.body.data).toHaveProperty('token');
        expect(registerResponse.body.data.user.email).toBe(userData.email);

        const savedUser = await User.findOne({ email: userData.email });
        expect(savedUser).toBeTruthy();
        expect(savedUser.username).toBe(userData.username);
    });

    test('should complete full login flow', async () => {
        const userData = {
            username: 'integrationuser',
            email: 'integration@example.com',
            password: 'password123'
        };

        const existingUser = new User(userData);
        await existingUser.save();

        const loginResponse = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: userData.email,
                password: userData.password
            })
            .expect(200);

        expect(loginResponse.body.data).toHaveProperty('token');
        expect(loginResponse.body.data.user.email).toBe(userData.email);
    });


});

