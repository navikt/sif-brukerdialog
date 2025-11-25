import { Express } from 'express';

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
}
