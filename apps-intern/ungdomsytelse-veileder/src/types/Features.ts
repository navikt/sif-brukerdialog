import { appEnv } from '../utils/appEnv';

export const Features = {
    endreSluttdato: appEnv.SIF_PUBLIC_FEATURE_ENDRE_SLUTTDATO === 'on',
    sjekkliste: appEnv.SIF_PUBLIC_FEATURE_SJEKKLISTE === 'on',
};
