// const express = require('express');
// const mustacheExpress = require('mustache-express');
// const compression = require('compression');
// const getDecorator = require('./src/build/scripts/decorator.cjs');
// const cookieParser = require('cookie-parser');
// const { initTokenX, exchangeToken } = require('./tokenx.cjs');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const Promise = require('promise');
// const helmet = require('helmet');
// const path = require('path');
// const jose = require('jose');
// const { v4: uuidv4 } = require('uuid');

// const server = express();
// server.use(
//     helmet({
//         contentSecurityPolicy: false,
//         crossOriginEmbedderPolicy: false,
//     }),
// );
// server.use((req, res, next) => {
//     res.set('X-XSS-Protection', '1; mode=block');
//     res.set('Feature-Policy', "geolocation 'none'; microphone 'none'; camera 'none'");
//     next();
// });
// server.use(compression());
// server.use(cookieParser());
// server.set('views', `${__dirname}/dist`);
// server.set('view engine', 'mustache');
// server.engine('html', mustacheExpress());

// const verifyLoginUrl = () =>
//     new Promise((resolve, reject) => {
//         if (!process.env.LOGIN_URL) {
//             reject();
//         } else {
//             resolve();
//         }
//     });

// const renderApp = (decoratorFragments) =>
//     new Promise((resolve, reject) => {
//         server.render('index.html', decoratorFragments, (err, html) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(html);
//             }
//         });
//     });

// const isExpiredOrNotAuthorized = (token) => {
//     if (token) {
//         try {
//             const exp = jose.decodeJwt(token).exp;
//             return Date.now() >= exp * 1000;
//         } catch (err) {
//             // eslint-disable-next-line no-console
//             console.error('Feilet med dekoding av token: ', err);
//             return true;
//         }
//     }
//     return true;
// };

// const startServer = async (html) => {
//     await Promise.all([initTokenX()]);
//     server.use(`${process.env.PUBLIC_PATH}/dist/js`, express.static(path.resolve(__dirname, 'dist/js')));
//     server.use(`${process.env.PUBLIC_PATH}/distjs`, express.static(path.resolve(__dirname, 'dist/js')));
//     server.use(`${process.env.PUBLIC_PATH}/dist/css`, (req, res, next) => {
//         const requestReferer = req.headers.referer;
//         if (requestReferer !== undefined && requestReferer === 'https://nav.psplugin.com/') {
//             res.set('cross-origin-resource-policy', 'cross-origin');
//         }
//         next();
//     });
//     server.use(`${process.env.PUBLIC_PATH}/dist/css`, express.static(path.resolve(__dirname, 'dist/css')));
//     server.get(`${process.env.PUBLIC_PATH}/health/isAlive`, (req, res) => res.sendStatus(200));
//     server.get(`${process.env.PUBLIC_PATH}/health/isReady`, (req, res) => res.sendStatus(200));

//     server.use(
//         process.env.FRONTEND_API_PATH,
//         createProxyMiddleware({
//             target: process.env.API_URL,
//             changeOrigin: true,
//             pathRewrite: (path) => {
//                 return path.replace(process.env.FRONTEND_API_PATH, '');
//             },

//             router: async (req) => {
//                 req.headers['X-Correlation-ID'] = uuidv4();

//                 if (process.env.NAIS_CLIENT_ID !== undefined) {
//                     req.headers['X-K9-Brukerdialog'] = process.env.NAIS_CLIENT_ID;
//                 }

//                 if (req.headers['authorization'] !== undefined) {
//                     const token = req.headers['authorization'].replace('Bearer ', '');
//                     if (isExpiredOrNotAuthorized(token)) {
//                         return undefined;
//                     }
//                     const exchangedToken = await exchangeToken(token);
//                     if (exchangedToken != null && !exchangedToken.expired() && exchangedToken.access_token) {
//                         req.headers['authorization'] = `Bearer ${exchangedToken.access_token}`;
//                     }
//                 }

//                 return undefined;
//             },
//             secure: true,
//             xfwd: true,
//             logLevel: 'info',
//         }),
//     );

//     server.use(`${process.env.PUBLIC_PATH}/assets`, express.static(path.resolve(__dirname, 'dist/assets')));
//     server.use('/assets', express.static(path.resolve(__dirname, 'dist/assets')));

//     server.get(/^\/(?!.*api)(?!.*dist).*$/, (req, res) => {
//         res.send(html);
//     });

//     const port = process.env.PORT || 8080;
//     server.listen(port, () => {
//         // eslint-disable-next-line no-console
//         console.log(`App listening on port: ${port}`);
//     });
// };

// // eslint-disable-next-line no-console
// const logError = (errorMessage, details) => console.log(errorMessage, details);

// verifyLoginUrl()
//     .then(getDecorator, () => {
//         logError('LOGIN_URL is missing');
//         process.exit(1);
//     })
//     .then(renderApp, (error) => {
//         logError('Failed to get decorator', error);
//         process.exit(1);
//     })
//     .then(startServer, (error) => logError('Failed to render app', error));

/* eslint-disable no-console */
const express = require('express');
const server = express();
server.use(express.json());
const path = require('path');
const mustacheExpress = require('mustache-express');
const getDecorator = require('./src/build/scripts/decorator.cjs');
const compression = require('compression');
const jose = require('jose');
const { v4: uuidv4 } = require('uuid');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { initTokenX, exchangeToken } = require('./tokenx.cjs');

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
    require('dotenv').config();
}

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var apiLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // max 100 requests per windowMs
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});

server.disable('x-powered-by');
server.use(compression());

if (isDev) {
    server.set('views', `${__dirname}`);
} else {
    server.set('views', `${__dirname}/dist`);
}

server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

server.use((_req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Referrer-Policy', 'no-referrer');
    res.set('Feature-Policy', "geolocation 'none'; microphone 'none'; camera 'none'");
    next();
});

const isExpiredOrNotAuthorized = (token) => {
    if (token) {
        try {
            const exp = jose.decodeJwt(token).exp;
            return Date.now() >= exp * 1000;
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Feilet med dekoding av token: ', err);
            return true;
        }
    }
    return true;
};

const renderApp = (decoratorFragments) =>
    new Promise((resolve, reject) => {
        server.render('index.html', decoratorFragments, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

const setupTokenX = async () => {
    if (isDev) {
        return Promise.resolve();
    }
    return Promise.all([initTokenX()]);
};

const startServer = async (html) => {
    await setupTokenX();

    server.get(`${process.env.PUBLIC_PATH}/health/isAlive`, (_req, res) => res.sendStatus(200));
    server.get(`${process.env.PUBLIC_PATH}/health/isReady`, (_req, res) => res.sendStatus(200));

    server.use(
        process.env.FRONTEND_API_PATH,
        createProxyMiddleware({
            target: process.env.API_URL,
            changeOrigin: true,
            pathRewrite: (path) => {
                return path.replace(process.env.FRONTEND_API_PATH, '');
            },

            router: async (req) => {
                req.headers['X-Correlation-ID'] = uuidv4();

                if (process.env.NAIS_CLIENT_ID !== undefined) {
                    req.headers['X-K9-Brukerdialog'] = process.env.NAIS_CLIENT_ID;
                }

                if (req.headers['authorization'] !== undefined) {
                    const token = req.headers['authorization'].replace('Bearer ', '');
                    if (isExpiredOrNotAuthorized(token)) {
                        return undefined;
                    }
                    const exchangedToken = await exchangeToken(token);
                    if (exchangedToken != null && !exchangedToken.expired() && exchangedToken.access_token) {
                        req.headers['authorization'] = `Bearer ${exchangedToken.access_token}`;
                    }
                }

                return undefined;
            },
            secure: true,
            xfwd: true,
            logLevel: 'info',
        }),
    );

    if (isDev) {
        const fs = require('fs');
        fs.writeFileSync(path.resolve(__dirname, 'index-decorated.html'), html);
        const vedleggMockStore = './dist/vedlegg';

        if (!fs.existsSync(vedleggMockStore)) {
            fs.mkdirSync(vedleggMockStore);
        }

        const vite = await require('vite').createServer({
            root: __dirname,
            server: {
                middlewareMode: true,
                port: 8080,
                open: './index-decorated.html',
            },
        });

        server.use('/api', apiLimiter);

        server.get(/^\/(?!.*dist).*$/, (req, _res, next) => {
            const fullPath = path.resolve(__dirname, decodeURIComponent(req.path.substring(1)));
            const fileExists = fs.existsSync(fullPath);

            if ((!fileExists && !req.url.startsWith('/@')) || req.url === '/') {
                req.url = '/index-decorated.html';
            }
            next();
        });

        server.use(vite.middlewares);
    } else {
        server.use(`${process.env.PUBLIC_PATH}/assets`, express.static(path.resolve(__dirname, 'dist/assets')));
        server.use('/assets', express.static(path.resolve(__dirname, 'dist/assets')));
        server.get(/^\/(?!.*api)(?!.*dist).*$/, (_req, res) => {
            res.send(html);
        });
    }

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
    });
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

getDecorator()
    .then(renderApp, (error) => {
        console.log(error);
        logError('Failed to get decorator', error);
        process.exit(1);
    })
    .then(startServer, (error) => logError('Failed to render app', error));
