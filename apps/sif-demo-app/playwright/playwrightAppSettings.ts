import { AppEnv } from '../env.schema';
import { getDevAppSettings } from '../mock/devAppSettings';

export const getPlaywrightAppSettings = (): AppEnv => ({
    ...getDevAppSettings(),
    PUBLIC_PATH: '/sif-demo',
    SIF_PUBLIC_USE_ANALYTICS: 'false',
    SIF_PUBLIC_USE_FARO: 'false',
});