import server from './server.js';
import config from './utils/serverConfig.js';
import log from './utils/log.js';

const port = config.app.port;

const runningServer = server.listen(port, () => {
    console.log(`Starting server at ${port}`);
});

process.on('SIGTERM', () => {
    log.info('SIGTERM received.');
    // Vent litt før stopp starter, så Kubernetes load balancer får tid til å rute nye requests til andre pods
    setTimeout(() => {
        runningServer.close(error => {
            if (error) {
                log.warning('SIGTERM received on non-open server.');
            } else {
                log.info('SIGTERM stopped server.');
            }
            process.exit(0);
        });
    }, 2_000);
});
