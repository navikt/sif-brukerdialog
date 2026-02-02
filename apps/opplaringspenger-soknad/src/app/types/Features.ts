import { appEnv } from '../utils/appEnv';

export const Features = {
    toggleArbeidstidEnabled: appEnv.SIF_PUBLIC_FEATURE_TOGGLE_ARBEIDSTID === 'on',
};
