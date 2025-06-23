const request = require('supertest');
const express = require('express');

jest.mock('cloudinary');
jest.mock('multer-storage-cloudinary');
jest.mock('multer');

const Character = require("../models/character.model");
const characterController = require('../controllers/character.controller');
const apiRouter = require("../routes/index");

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

describe('Character Tests', () => {

    let token, user;

    beforeEach(async () => {
        jest.clearAllMocks();
        const registerRes = await request(app)
            .post('/api/v1/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            })
            .expect(201);

        token = registerRes.body.data.token;
        user = registerRes.body.data.user;
    });

    describe("Create Character Tests", () => {

        describe('POST /api/v1/character', () => {
            test('should create character successfully', async () => {
                const res = await request(app)
                    .post('/api/v1/character')
                    .set('Authorization', `Bearer ${token}`)
                    .send({ companyName: "Amazon", interviewRound: "HR", additionalInformation: "" })
                    .expect(201);

                console.log(res.body);
                expect(res.body).toHaveProperty("data")
                expect(res.body.data.companyName).toBe("Amazon")
                expect(res.body.data.interviewRound).toBe("HR")
                expect(res.body.data.additionalInformation).toBe("")
                expect(res.body.data.user).toBe(user.id);
            });

            test('should show unauthorized user', async () => {
                await request(app)
                    .post('/api/v1/character')
                    .set('Authorization', `Bearer ${token}1`)
                    .send({ companyName: "Amazon", interviewRound: "HR", additionalInformation: "" })
                    .expect(401);
            });
        });
    });

    describe("Get All Character Tests", () => {

        beforeEach(async () => {
            await request(app)
                .post('/api/v1/character')
                .set('Authorization', `Bearer ${token}`)
                .send({ companyName: "Amazon", interviewRound: "HR", additionalInformation: "" })
                .expect(201);
        })

        describe('GET /api/v1/character', () => {


            test('should get characters successfully', async () => {
                await request(app)
                    .get('/api/v1/character')
                    .set('Authorization', `Bearer ${token}`)
                    .expect(200);
            });

            test('should show unauthorized user', async () => {
                await request(app)
                    .get('/api/v1/character')
                    .set('Authorization', `Bearer ${token}1`)
                    .expect(401);
            });
        });
    });

    describe("Get One Character Tests", () => {
        let characterId;
        beforeEach(async () => {
            const res = await request(app)
                .post('/api/v1/character')
                .set('Authorization', `Bearer ${token}`)
                .send({ companyName: "Amazon", interviewRound: "HR", additionalInformation: "" })
                .expect(201);
            characterId = res.body.data._id;
        })

        describe('GET /api/v1/character', () => {


            test('should get character successfully', async () => {
                await request(app)
                    .get(`/api/v1/character/${characterId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .expect(200);
            });

            test('should show unauthorized user', async () => {
                await request(app)
                    .get(`/api/v1/character/${characterId}`)
                    .set('Authorization', `Bearer ${token}1`)
                    .expect(401);
            });
        });
    });

    describe("Delete Character Tests", () => {

        let characterId;
        beforeEach(async () => {
            const res = await request(app)
                .post('/api/v1/character')
                .set('Authorization', `Bearer ${token}`)
                .send({ companyName: "Amazon", interviewRound: "HR", additionalInformation: "" })
                .expect(201);
            characterId = res.body.data._id;
        })

        describe('DELETE /api/v1/character/:characterId', () => {

            test('should delete character successfully', async () => {
                await request(app)
                    .delete(`/api/v1/character/${characterId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .expect(200);
            });

            test('should show unauthorized user', async () => {
                await request(app)
                    .delete(`/api/v1/character/${characterId}`)
                    .set('Authorization', `Bearer ${token}1`)
                    .expect(401);
            });
        });
    });
    
    describe("Get Chat History Tests", ()=>{
        let characterId;
        beforeEach(async () => {
            const res = await request(app)
                .post('/api/v1/character')
                .set('Authorization', `Bearer ${token}`)
                .send({ companyName: "Amazon", interviewRound: "HR", additionalInformation: "" })
                .expect(201);
            characterId = res.body.data._id;
        })

        describe('GET /api/v1/chat/:characterId/history', () => {

            test('should get chat messages successfully', async () => {
                await request(app)
                    .get(`/api/v1/chat/${characterId}/history`)
                    .set('Authorization', `Bearer ${token}`)
                    .expect(200);
            });

            test('should show unauthorized user', async () => {
                await request(app)
                    .get(`/api/v1/chat/${characterId}/history`)
                    .set('Authorization', `Bearer ${token}1`)
                    .expect(401);
            });
        });
    });

});