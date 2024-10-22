type Proxy = {
    frontendPath: string;
    apiScope: string;
    apiUrl: string;
};

type EnvVariables = { [key: string]: string };
type ProxyEnvVariables = Record<Partial<ProxyEnvKey>, string>;

export enum Service {
    SIF_INNSYN = 'SIF_INNSYN',
    K9_SAK_INNSYN = 'K9_SAK_INNSYN',
    K9_BRUKERDIALOG_PROSESSERING = 'K9_BRUKERDIALOG_PROSESSERING',
    UNG_DELTAKELSE_OPPLYSER = 'UNG_DELTAKELSE_OPPLYSER',
}

export enum ProxyEnvKey {
    SIF_INNSYN_FRONTEND_PATH = 'SIF_INNSYN_FRONTEND_PATH',
    SIF_INNSYN_API_SCOPE = 'SIF_INNSYN_API_SCOPE',
    SIF_INNSYN_API_URL = 'SIF_INNSYN_API_URL',
    K9_SAK_INNSYN_FRONTEND_PATH = 'K9_SAK_INNSYN_FRONTEND_PATH',
    K9_SAK_INNSYN_API_SCOPE = 'K9_SAK_INNSYN_API_SCOPE',
    K9_SAK_INNSYN_API_URL = 'K9_SAK_INNSYN_API_URL',
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH = 'K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH',
    K9_BRUKERDIALOG_PROSESSERING_API_SCOPE = 'K9_BRUKERDIALOG_PROSESSERING_API_SCOPE',
    K9_BRUKERDIALOG_PROSESSERING_API_URL = 'K9_BRUKERDIALOG_PROSESSERING_API_URL',
    UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH = 'UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH',
    UNG_DELTAKELSE_OPPLYSER_API_SCOPE = 'UNG_DELTAKELSE_OPPLYSER_API_SCOPE',
    UNG_DELTAKELSE_OPPLYSER_API_URL = 'UNG_DELTAKELSE_OPPLYSER_API_URL',
}

const proxies = {
    [Service.SIF_INNSYN]: <Proxy>{
        frontendPath: process.env.SIF_INNSYN_FRONTEND_PATH,
        apiScope: process.env.SIF_INNSYN_API_SCOPE,
        apiUrl: process.env.SIF_INNSYN_API_URL,
    },
    [Service.K9_SAK_INNSYN]: <Proxy>{
        frontendPath: process.env.K9_SAK_INNSYN_FRONTEND_PATH,
        apiScope: process.env.K9_SAK_INNSYN_API_SCOPE,
        apiUrl: process.env.K9_SAK_INNSYN_API_URL,
    },
    [Service.K9_BRUKERDIALOG_PROSESSERING]: <Proxy>{
        frontendPath: process.env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
        apiScope: process.env.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE,
        apiUrl: process.env.K9_BRUKERDIALOG_PROSESSERING_API_URL,
    },
    [Service.UNG_DELTAKELSE_OPPLYSER]: <Proxy>{
        frontendPath: process.env.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH,
        apiScope: process.env.UNG_DELTAKELSE_OPPLYSER_API_SCOPE,
        apiUrl: process.env.UNG_DELTAKELSE_OPPLYSER_API_URL,
    },
};

export const getPublicEnvVariables = () => {
    const publicEnv: EnvVariables = {};
    for (const [key, value] of Object.entries(process.env)) {
        if (key.startsWith('SIF_PUBLIC_')) {
            publicEnv[key] = value || '';
        }
    }
    return publicEnv;
};

export const getProxyEnvVariablesForService = (service: Service): Partial<ProxyEnvVariables> | undefined => {
    try {
        const proxy = proxies[service];
        verifyProxyConfigIsSet(service);
        return {
            [`${service}_FRONTEND_PATH`]: proxy.frontendPath,
            [`${service}_API_SCOPE`]: proxy.apiScope,
            [`${service}_API_URL`]: proxy.apiUrl,
        };
    } catch {
        return undefined;
    }
};

export const getProxyEnvVariables = (): Partial<ProxyEnvVariables> => {
    let env: Partial<ProxyEnvVariables> = {};
    Object.keys(proxies).forEach((service) => {
        env = { ...env, ...getProxyEnvVariablesForService(service as Service) };
    });
    return env;
};

export const verifyProxyConfigIsSet = (service: Service) => {
    const proxy = proxies[service];
    if (!proxy) {
        throw `Missing proxy for ${service}`;
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

const app = {
    port: Number(process.env.PORT) || 8080,
    env: process.env.ENV as 'dev' | 'prod',
    version: process.env.APP_VERSION,
    publicPath: process.env.PUBLIC_PATH || '',
};

export default { proxies, app };
