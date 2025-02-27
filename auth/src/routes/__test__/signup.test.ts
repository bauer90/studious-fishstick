import request from 'supertest';
import { app } from '../../app';
import { response } from 'express';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testtest.com',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'tes@ttest.com',
            password: 'pd'
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({ email: "owefo@woefihwof.com" })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({ password: 'woefhweioh' })
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({ email: "owefo@woefihwof.com", password: "weoiowfhi" })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({ email: "owefo@woefihwof.com", password: "weo12123iowfhi" })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({ email: "owefo@woefihwof.com", password: "weoiowfhi" })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});
