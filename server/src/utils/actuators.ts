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

    // Prometheus metrics endpoint - konfigurert i nais.yml (prometheus.path: /metrics)
    // Returnerer tomt svar inntil vi evt. implementerer faktiske metrics med prom-client
    server.get('/metrics', (_request, response) => {
        response.set('Content-Type', 'text/plain');
        response.send('');
    });
}
