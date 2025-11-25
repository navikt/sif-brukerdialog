import promClient from 'prom-client';

// Samle default metrics (memory, CPU, event loop, etc.)
promClient.collectDefaultMetrics();

// Eksporter register
export const register = promClient.register;
