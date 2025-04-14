require('dotenv').config();

const process = require('process');

const getAppSettings = () => ({
    ENV: `${process.env.ENV}`,
    APP_VERSION: `${process.env.APP_VERSION}`,
    GITHUB_REF_NAME: `${process.env.GITHUB_REF_NAME}`,
    PUBLIC_PATH: `${process.env.PUBLIC_PATH}`,
    IS_LOCAL: `${process.env.IS_LOCAL}`,

    UNG_DELTAKELSE_OPPLYSER_API_URL: `${process.env.UNG_DELTAKELSE_OPPLYSER_API_URL}`,
    UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: `${process.env.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH}`,
    UNG_DELTAKELSE_OPPLYSER_API_SCOPE: `${process.env.UNG_DELTAKELSE_OPPLYSER_API_SCOPE}`,
});

module.exports = getAppSettings;
