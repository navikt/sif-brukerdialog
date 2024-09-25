require('dotenv').config();

const getPublicEnvVariables = () => {
    const publicEnv = {};
    for (const [key, value] of Object.entries(process.env)) {
        if (key.startsWith('SIF_PUBLIC_')) {
            publicEnv[key] = value || '';
        }
    }
    return publicEnv;
};

const getAppSettings = () => ({
    APP_VERSION: `${process.env.APP_VERSION}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL: `${process.env.NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL}`,
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: `${process.env.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,

    ...getPublicEnvVariables(),
});

module.exports = getAppSettings;
