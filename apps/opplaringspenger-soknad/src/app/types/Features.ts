import { appEnv } from '../utils/appEnv';

export const Features = {
    toggleFraværFraArbeid: appEnv.SIF_PUBLIC_FEATURE_TOGGLE_FRAVÆR_FRA_ARBEID === 'on',
};
