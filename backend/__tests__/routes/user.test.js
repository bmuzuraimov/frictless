const request = require('supertest');
const express = require('express');
const router = require('../../routes/index.js');

const app = express();
app.use(router);

describe('GET /server-time', () => {
  it('responds with server time in correct format', async () => {
    const response = await request(app)
      .get('/server-time')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.date).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}/);
  });
});
