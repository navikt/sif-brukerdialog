import { AppEnv } from '../env.schema';
import { getDevAppSettings } from '../mock/devAppSettings';

export const getPlaywrightAppSettings = (): AppEnv => ({
    ...getDevAppSettings(),
    SIF_PUBLIC_USE_ANALYTICS: 'false',
    SIF_PUBLIC_USE_FARO: 'false',
});
