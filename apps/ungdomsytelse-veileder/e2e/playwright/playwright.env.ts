import { AppEnv } from '../../env.schema';

export const playwrightEnv: AppEnv = {
    ENV: 'development',
    APP_VERSION: 'dev',
    PUBLIC_PATH: '/sif-brukerdialog/ungdomsytelse-veileder',
    GITHUB_REF_NAME: 'local',
    UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH: '/api/ung-deltakelse-opplyser',
    UNG_DELTAKELSE_OPPLYSER_API_URL: 'http://localhost:8089',
    UNG_DELTAKELSE_OPPLYSER_API_SCOPE: 'dev-gcp:dusseldorf:ung-deltakelse-opplyser',
    IS_LOCAL: 'true',
};
