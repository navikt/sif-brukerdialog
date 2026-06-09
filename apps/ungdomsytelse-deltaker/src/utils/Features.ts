import { appEnv } from './appEnv';

export const Features = {
    useMellomlagring: appEnv.SIF_PUBLIC_USE_MELLOMLAGRING === 'true',
};
