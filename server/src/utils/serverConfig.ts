type Proxy = {
    frontendPath: string;
    apiScope: string;
    apiUrl: string;
};

export enum Service {
    innsyn = 'innsyn',
    k9SakInnsyn = 'k9SakInnsyn',
    k9BrukerdialogProsessering = 'k9BrukerdialogProsessering',
}

const proxies = {
    [Service.innsyn]: <Proxy>{
        frontendPath: process.env.INNSYN_FRONTEND_PATH,
        apiScope: process.env.INNSYN_API_SCOPE,
        apiUrl: process.env.INNSYN_API_URL,
    },
    [Service.k9SakInnsyn]: <Proxy>{
        frontendPath: process.env.K9_SAK_INNSYN_FRONTEND_PATH,
        apiScope: process.env.K9_SAK_INNSYN_API_SCOPE,
        apiUrl: process.env.K9_SAK_INNSYN_API_URL,
    },
    [Service.k9BrukerdialogProsessering]: <Proxy>{
        frontendPath: process.env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
        apiScope: process.env.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE,
        apiUrl: process.env.K9_BRUKERDIALOG_PROSESSERING_API_URL,
    },
};

export const verifyProxyConfigIsSet = (service: Service) => {
    const proxy = proxies[service];
    try {
        if (!proxy) {
            throw `Missing proxy ${service}`;
        }
        if (!proxy.apiScope) {
            throw `Missing apiScope for ${service}`;
        }
        if (!proxy.apiUrl) {
            throw `Missing apiUrl for ${service}`;
        }
        if (!proxy.frontendPath) {
            throw `Missing frontendPath for ${service}`;
        }
    } catch {
        console.log('Error setting up reverse proxy', service);
    }
};

export const getPublicEnvVariables = () => {
    const publicEnv: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(process.env)) {
        if (key.startsWith('SIF_PUBLIC_')) {
            publicEnv[key] = value || '';
        }
    }
    return publicEnv;
};
const app = {
    port: Number(process.env.PORT) || 8080,
    env: process.env.ENV as 'dev' | 'prod',
    version: process.env.APP_VERSION,
    publicPath: process.env.PUBLIC_PATH || '',
};

console.log('ServerConfig.app', app);

export default { proxies, app };
