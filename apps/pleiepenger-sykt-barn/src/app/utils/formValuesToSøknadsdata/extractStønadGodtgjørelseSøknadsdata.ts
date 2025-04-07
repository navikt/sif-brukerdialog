import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { StønadGodtgjørelseSøknadsdata } from '../../types/søknadsdata/StønadGodtgjørelseSøknadsdata';
import { StønadGodtgjørelseFormValues } from '../../types/søknad-form-values/StønadGodtgjørelseFormValues';

export const extractStønadGodtgjørelseSøknadsdata = (
    omsorgsstønad: StønadGodtgjørelseFormValues,
): StønadGodtgjørelseSøknadsdata | undefined => {
    const {
        mottarOmsorgsstønad,
        mottarStønadGodtgjørelseIHelePerioden,
        starterUndeveis,
        startdato,
        slutterUnderveis,
        sluttdato,
    } = omsorgsstønad;
    if (mottarOmsorgsstønad === YesOrNo.NO) {
        return {
            type: 'mottarIkke',
            mottarOmsorgsstønad,
        };
    }

    if (mottarOmsorgsstønad === YesOrNo.YES) {
        if (mottarStønadGodtgjørelseIHelePerioden === YesOrNo.YES) {
            return {
                type: 'mottarIHelePeroden',
                mottarOmsorgsstønad: YesOrNo.YES,
                mottarStønadGodtgjørelseIHelePerioden: YesOrNo.YES,
            };
        }
        if (mottarStønadGodtgjørelseIHelePerioden === YesOrNo.NO && starterUndeveis && slutterUnderveis) {
            return {
                type: 'mottarIDelerAvPeroden',
                mottarOmsorgsstønad: YesOrNo.YES,
                mottarStønadGodtgjørelseIHelePerioden: YesOrNo.NO,
                starterUndeveis,
                startdato: starterUndeveis === YesOrNo.YES ? startdato : undefined,
                slutterUnderveis,
                sluttdato: slutterUnderveis === YesOrNo.YES ? sluttdato : undefined,
            };
        }
    }

    return undefined;
};
