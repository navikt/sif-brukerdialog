import { Express } from 'express';
import { register } from './metrics.js';

export function setupActuators(server: Express) {
    server.get(`/internal/health/isAlive`, (_request, response) => {
        response.send({
            status: 'UP',
        });
    });

    server.get(`/internal/health/isReady`, (_request, response) => {
        response.send({
            status: 'UP',
        });
    });

    // Prometheus metrics endpoint
    server.get('/metrics', async (_request, response) => {
        response.set('Content-Type', register.contentType);
        response.send(await register.metrics());
    });
}
