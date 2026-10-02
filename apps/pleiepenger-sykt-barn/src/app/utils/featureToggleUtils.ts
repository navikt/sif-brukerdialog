import { appEnv } from '../env/appEnv';

export interface FeatureToggles {
    spørOmSluttetISøknadsperiode: boolean;
    hentFlereAnsettelsesperioder: boolean;
    visNormalarbeidstidForIkkeFrilanser: boolean; // Hvis frilanser har frilansoppdrag men svarer nei på alt under frilans og arbeidssituasjon
}

export const getFeatureToggles = (): FeatureToggles => ({
    spørOmSluttetISøknadsperiode: appEnv.SIF_PUBLIC_FEATURE_VIS_SPM_SLUTTET_I_PERIODE === 'on',
    hentFlereAnsettelsesperioder: appEnv.SIF_PUBLIC_FEATURE_HENT_FLERE_ANSETTELSESPERIODER === 'on',
    visNormalarbeidstidForIkkeFrilanser: appEnv.SIF_PUBLIC_FEATURE_NORMALARBEIDST_IKKE_FRILANSER === 'on',
});
