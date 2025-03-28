import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";


it('returns 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    // must use this ObjectId() to generate id.
    // random ids like `owweoi` will cause error when calling .findById()

    await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404);
});

it('returns the ticket if the ticket is found', async () => {
    const title = "o1234234gerwg";
    const price = 20;

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title, price })
        .expect(201);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});
