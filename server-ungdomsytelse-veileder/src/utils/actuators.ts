import { Express } from 'express';

export function setupActuators(server: Express) {
    server.get(`/internal/health/isAlive`, async (_request, response) => {
        response.send({
            status: 'UP',
        });
    });

    server.get(`/internal/health/isReady`, async (_request, response) => {
        response.send({
            status: 'UP',
        });
    });
}
