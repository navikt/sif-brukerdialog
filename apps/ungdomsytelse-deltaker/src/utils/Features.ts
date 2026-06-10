import { getAppEnv } from './appEnv';

export const Features = {
    useMellomlagring: getAppEnv().SIF_PUBLIC_USE_MELLOMLAGRING === 'true',
};
