import type { AppEnv } from '../env.schema.ts';
import { getDevAppSettings } from '../mock/devAppSettings.ts';

export const getPlaywrightAppSettings = (): AppEnv => ({
    ...getDevAppSettings(),
    SIF_PUBLIC_USE_ANALYTICS: 'false',
});
