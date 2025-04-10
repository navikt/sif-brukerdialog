import express from 'express';
import path from 'node:path';
import { configureReverseProxyApi } from './utils/reverseProxy.js';
import { verifyToken } from './utils/tokenValidation.js';
import { setupActuators } from './utils/actuators.js';
import { errorHandling } from './utils/errorHandler.js';
import { setupAndServeHtml } from './utils/frontendRoute.js';
import logger from './utils/log.js';
import serverConfig from './utils/serverConfig.js';
import { setupServerDefaults } from './utils/serverSetup.js';

const server = express();

setupServerDefaults(server);
setupActuators(server);

server.use(logger.morganMiddleware);
server.use(express.static('./public', { index: false }));
server.use(`${serverConfig.app.publicPath}/assets`, express.static(path.resolve(path.resolve('public'), 'assets')));
server.use(verifyToken);

configureReverseProxyApi(server);

// Catch all route, må være sist
setupAndServeHtml(server);

server.use(errorHandling);

export default server;
