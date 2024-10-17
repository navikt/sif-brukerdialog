type Proxy = {
    frontendPath: string;
    apiScope: string;
    apiUrl: string;
};

export enum Service {
    sifInnsyn = 'sifInnsyn',
    k9SakInnsyn = 'k9SakInnsyn',
    k9BrukerdialogProsessering = 'k9BrukerdialogProsessering',
    ungDeltakelseOpplyser = 'ungDeltakelseOpplyser',
}

const proxies = {
    [Service.sifInnsyn]: <Proxy>{
        frontendPath: process.env.SIF_INNSYN_FRONTEND_PATH,
        apiScope: process.env.SIF_INNSYN_API_SCOPE,
        apiUrl: process.env.SIF_INNSYN_API_URL,
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
    [Service.ungDeltakelseOpplyser]: <Proxy>{
        frontendPath: process.env.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH,
        apiScope: process.env.UNG_DELTAKELSE_OPPLYSER_API_SCOPE,
        apiUrl: process.env.UNG_DELTAKELSE_OPPLYSER_API_URL,
    },
};

export const verifyProxyConfigIsSet = (service: Service) => {
    const proxy = proxies[service];
    if (!proxy) {
        console.error(`Missing proxy for ${service}`);
        throw `Missing proxy for ${service}`;
    }
    if (!proxy.apiScope) {
        console.error(`Missing apiScope for ${service}`);
        throw `Missing apiScope for ${service}`;
    }
    if (!proxy.apiUrl) {
        console.error(`Missing apiUrl for ${service}`);
        throw `Missing apiUrl for ${service}`;
    }
    if (!proxy.frontendPath) {
        console.error(`Missing frontendPath for ${service}`);
        throw `Missing frontendPath for ${service}`;
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

export default { proxies, app };
