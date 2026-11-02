import express from 'express';
import { setupActuators } from './utils/actuators.js';
import { setCorrelationId } from './utils/correlationId.js';
import { errorHandling } from './utils/errorHandler.js';
import { setupAndServeHtml } from './utils/frontendRoute.js';
import logger from './utils/log.js';
import { configureReverseProxyApi } from './utils/reverseProxy.js';
import { getRequiredServicesFromEnv } from './utils/serverConfig.js';
import { setupServerDefaults } from './utils/serverSetup.js';
import { verifyToken } from './utils/tokenValidation.js';

const server = express();

setupServerDefaults(server);
setupActuators(server);

server.use(setCorrelationId);
server.use(logger.morganMiddleware);
server.use(verifyToken);

configureReverseProxyApi(server, getRequiredServicesFromEnv());

// Catch all route, må være sist
setupAndServeHtml(server);

server.use(errorHandling);

export default server;
