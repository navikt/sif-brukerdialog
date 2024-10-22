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

const proxyEnvs = {
    [Service.SIF_INNSYN]: <EnvVariables>{
        [ProxyEnvKey.SIF_INNSYN_FRONTEND_PATH]: process.env[ProxyEnvKey.SIF_INNSYN_FRONTEND_PATH],
        [ProxyEnvKey.SIF_INNSYN_API_SCOPE]: process.env[ProxyEnvKey.SIF_INNSYN_API_SCOPE],
        [ProxyEnvKey.SIF_INNSYN_API_URL]: process.env[ProxyEnvKey.SIF_INNSYN_API_URL],
    },
    [Service.K9_SAK_INNSYN]: <EnvVariables>{
        [ProxyEnvKey.K9_SAK_INNSYN_FRONTEND_PATH]: process.env[ProxyEnvKey.K9_SAK_INNSYN_FRONTEND_PATH],
        [ProxyEnvKey.K9_SAK_INNSYN_API_SCOPE]: process.env[ProxyEnvKey.K9_SAK_INNSYN_API_SCOPE],
        [ProxyEnvKey.K9_SAK_INNSYN_API_URL]: process.env[ProxyEnvKey.K9_SAK_INNSYN_API_URL],
    },
    [Service.K9_BRUKERDIALOG_PROSESSERING]: <EnvVariables>{
        [ProxyEnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH]:
            process.env[ProxyEnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH],
        [ProxyEnvKey.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE]:
            process.env[ProxyEnvKey.K9_BRUKERDIALOG_PROSESSERING_API_SCOPE],
        [ProxyEnvKey.K9_BRUKERDIALOG_PROSESSERING_API_URL]:
            process.env[ProxyEnvKey.K9_BRUKERDIALOG_PROSESSERING_API_URL],
    },
    [Service.UNG_DELTAKELSE_OPPLYSER]: <EnvVariables>{
        [ProxyEnvKey.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH]:
            process.env[ProxyEnvKey.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH],
        [ProxyEnvKey.UNG_DELTAKELSE_OPPLYSER_API_SCOPE]: process.env[ProxyEnvKey.UNG_DELTAKELSE_OPPLYSER_API_SCOPE],
        [ProxyEnvKey.UNG_DELTAKELSE_OPPLYSER_API_URL]: process.env[ProxyEnvKey.UNG_DELTAKELSE_OPPLYSER_API_URL],
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

export const getProxyEnvVariables = (): Partial<ProxyEnvVariables> => {
    let env: Partial<ProxyEnvVariables> = {};
    Object.keys(proxyEnvs).forEach((service) => {
        env = { ...env, ...proxyEnvs[service as Service] };
    });
    return env;
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

const app = {
    port: Number(process.env.PORT) || 8080,
    env: process.env.ENV as 'dev' | 'prod',
    version: process.env.APP_VERSION,
    publicPath: process.env.PUBLIC_PATH || '',
};

export default { proxies, app };
