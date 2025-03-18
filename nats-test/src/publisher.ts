import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'abc', { //create a stan client and connect
    url: 'http://localhost:4222'
});
// to make this work,
// find nats-streaming pod name by `kubectl get pods`
// then setup port-forward `kubectl port-forward [name] 4222:4222`

stan.on('connect', () => {
    console.log('Publisher connected to NATS');

    const data = JSON.stringify({
        id: '123',
        title: 'concert',
        price: 20
    });

    stan.publish('ticket:created', data, () => {
        console.log('event published');
    });
});

