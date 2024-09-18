import dotenv from 'dotenv';

dotenv.config();

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

const verifyProxyConfig = (service: Service) => {
    const proxy = proxies[service];
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
};

export const verifyAllProxiesAreSet = () => {
    verifyProxyConfig(Service.innsyn);
    verifyProxyConfig(Service.k9SakInnsyn);
    verifyProxyConfig(Service.k9BrukerdialogProsessering);
};

const app = {
    port: Number(process.env.PORT) || 8080,
    env: process.env.ENV as 'dev' | 'prod',
    version: process.env.APP_VERSION,
    publicPath: process.env.PUBLIC_PATH || '',
};

export default { proxies, app };
