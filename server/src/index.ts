import server from './server.js';
import config from './utils/serverConfig.js';

const port = config.app.port;

server.listen(port, () => {
    console.log(`Starting server at ${port}`);
});
