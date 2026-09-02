import server from './server.js';
import config from './utils/serverConfig.js';
import log from './utils/log.js';

const port = config.app.port;

const runningServer = server.listen(port, () => {
    console.log(`Starting server at ${port}`);
});

process.once('SIGTERM', () => {
    log.info('SIGTERM received.');
    // Vent litt før stopp starter, så Kubernetes load balancer får tid til å rute nye requests til andre pods
    setTimeout(() => {
        const forceExit = setTimeout(() => {
            log.warning('SIGTERM shutdown timed out, forcing exit.');
            process.exit(1);
        }, 10_000);
        forceExit.unref();

        runningServer.close(error => {
            clearTimeout(forceExit);
            if (error) {
                log.warning('SIGTERM received on non-open server.');
            } else {
                log.info('SIGTERM stopped server.');
            }
            process.exit(0);
        });
        // Uten dette holder idle keep-alive-connections serveren åpen på ubestemt tid
        runningServer.closeIdleConnections();
    }, 2_000);
});
