import { appEnv } from '../env/appEnv';

export interface FeatureToggles {
    spørOmSluttetISøknadsperiode: boolean;
}

export const getFeatureToggles = (): FeatureToggles => ({
    spørOmSluttetISøknadsperiode: appEnv.SIF_PUBLIC_FEATURE_VIS_SPM_SLUTTET_I_PERIODE === 'on',
});
