import express from 'express';
import path from 'node:path';
import { setupActuators } from './utils/actuators.js';
import { errorHandling } from './utils/errorHandler.js';
import { setupAndServeHtml } from './utils/frontendRoute.js';
import logger from './utils/log.js';
import { configureReverseProxyApi } from './utils/reverseProxy.js';
import serverConfig from './utils/serverConfig.js';
import { setupServerDefaults } from './utils/serverSetup.js';
import { verifyToken } from './utils/tokenValidation.js';

const server = express();

setupServerDefaults(server);
console.log('Defaults added');

setupActuators(server);
console.log('Actuators added');

server.use(logger.morganMiddleware);
console.log('Morgan added');
server.use(express.static('./public', { index: false }));
console.log('Static added');
server.use(`${serverConfig.app.publicPath}/assets`, express.static(path.resolve(path.resolve('public'), 'assets')));
console.log('Assets added');
server.use(verifyToken);
console.log('Token added');

configureReverseProxyApi(server);
console.log('Reverse proxy added');

// Catch all route, må være sist
setupAndServeHtml(server);
console.log('Serve added');

server.use(errorHandling);
console.log('Error handling added');

export default server;
