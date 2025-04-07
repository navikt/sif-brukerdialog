import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { OmsorgsstønadSøknadsdata } from '../../types/søknadsdata/OmsorgsstønadSøknadsdata';
import { OmsorgsstønadFormValues } from '../../types/søknad-form-values/OmsorgsstønadFormValues';

export const extractOmsorgsstønadSøknadsdata = (
    omsorgsstønad: OmsorgsstønadFormValues,
): OmsorgsstønadSøknadsdata | undefined => {
    const {
        mottarOmsorgsstønad,
        mottarOmsorgsstønadIHelePerioden,
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
        if (mottarOmsorgsstønadIHelePerioden === YesOrNo.YES) {
            return {
                type: 'mottarIHelePeroden',
                mottarOmsorgsstønad: YesOrNo.YES,
                mottarOmsorgsstønadIHelePerioden: YesOrNo.YES,
            };
        }
        if (mottarOmsorgsstønadIHelePerioden === YesOrNo.NO && starterUndeveis && slutterUnderveis) {
            return {
                type: 'mottarIDelerAvPeroden',
                mottarOmsorgsstønad: YesOrNo.YES,
                mottarOmsorgsstønadIHelePerioden: YesOrNo.NO,
                starterUndeveis,
                startdato: starterUndeveis === YesOrNo.YES ? startdato : undefined,
                slutterUnderveis,
                sluttdato: slutterUnderveis === YesOrNo.YES ? sluttdato : undefined,
            };
        }
    }

    return undefined;
};
