import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    const options = stan.subscriptionOptions()
        .setManualAckMode(true); // allows us to some operations (eg saving to db) before sending ack/
    // if some error happens it will re-deliver if there is no ack

    const subscription = stan.subscribe('ticket:created', 'orders-service-queue-group', options);
    // the purpose of the queue group is when multiple listener.ts start, 
    // the message will only go to one of them.

    subscription.on('message', (msg: Message) => {
        const data = msg.getData();

        if (typeof data === 'string') {
            console.log(`Received event #${msg.getSequence()} with data: ${data}`);
        }

        msg.ack(); // manually ack the msg. so publisher won't deliver again.
    });
});