import morgan from 'morgan';
import winston from 'winston';
import config from './serverConfig.js';

const { format } = winston;
const { combine, json, timestamp } = format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    return config.app.env === 'dev' ? 'debug' : 'info';
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

winston.addColors(colors);

// Add custom morgan token for correlation ID
morgan.token('correlation-id', (req) => {
    return (req.headers['X-Correlation-ID'] as string) || '-';
});

const stdoutLogger = winston.createLogger({
    level: level(),
    levels,
    transports: [
        new winston.transports.Console({
            format: combine(timestamp(), json()),
        }),
    ],
});

const debug = (msg: any) => {
    stdoutLogger.debug(msg.replace(/[\n\r]/g, ''));
};

const info = (msg: any) => {
    stdoutLogger.info(msg.replace(/[\n\r]/g, ''));
};

const warning = (msg: any) => {
    stdoutLogger.warn(msg.replace(/[\n\r]/g, ''));
};

const error = (msg: any, err: any) => {
    if (err) {
        stdoutLogger.error(msg, { message: `: ${err.message}` });
    } else {
        stdoutLogger.error(msg, { message: `: ${err}` });
    }
};

const stream = {
    // Use the http severity
    write: (message: string) => {
        // Remove newline that morgan adds and log as structured message
        stdoutLogger.http(message.trim());
    },
};

// More detailed format for better debugging
const detailedFormat = ':method :url :status :res[content-length] - :response-time ms - :correlation-id - :user-agent';
const vanligFormat = ':method :url :status :res[content-length] - :response-time ms - :correlation-id';

// Use detailed format in development, simple in production
const logFormat = config.app.env === 'dev' ? detailedFormat : vanligFormat;

const morganMiddleware = morgan(logFormat as any, {
    stream,
    // Skip logging for health checks and static assets to reduce noise
    skip: (req, _res) => {
        const skipUrls = ['/health', '/isAlive', '/isReady'];
        return skipUrls.includes(req.url || '') || req.url?.startsWith('/assets/') || false;
    },
});

export default {
    debug,
    info,
    warning,
    error,
    logger: stdoutLogger,
    morganMiddleware,
};
