import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});
// to make this work,
// find nats-streaming pod name by `kubectl get pods`
// then setup port-forward `kubectl port-forward [name] 4222:4222`

stan.on('connect', () => {
    console.log('Publisher connected to NATS');
});

