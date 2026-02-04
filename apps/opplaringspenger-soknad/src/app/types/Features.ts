import { appEnv } from '../utils/appEnv';

export const Features = {
    toggleFraværFraArbeid: appEnv.SIF_PUBLIC_FEATURE_TOGGLE_FRAVAR_FRA_ARBEID === 'on',
};
