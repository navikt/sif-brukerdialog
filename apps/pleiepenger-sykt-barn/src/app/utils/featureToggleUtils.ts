import { appEnv } from '../env/appEnv';

export const getFeatureToggles = () => ({
    spørOmSluttetISøknadsperiode: appEnv.SIF_PUBLIC_FEATURE_VIS_SPM_SLUTTET_I_PERIODE === 'on',
});
