import { Express } from 'express';
import config from './serverConfig.js';

export function setupActuators(server: Express) {
    server.get(`${config.app.publicPath}'/internal/health/isAlive`, (_request, response) => {
        return response.send({
            status: 'UP',
        });
    });

    server.get(`${config.app.publicPath}'/internal/health/isReady`, (_request, response) => {
        return response.send({
            status: 'UP',
        });
    });
}
