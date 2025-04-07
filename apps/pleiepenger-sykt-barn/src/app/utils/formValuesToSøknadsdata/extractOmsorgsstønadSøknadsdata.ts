import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { OmsorgsstønadSøknadsdata } from '../../types/søknadsdata/OmsorgsstønadSøknadsdata';
import { OmsorgsstønadFormValues } from '../../types/søknad-form-values/OmsorgsstønadFormValues';
import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik-ds';

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
        antallTimer,
    } = omsorgsstønad;
    if (mottarOmsorgsstønad === YesOrNo.UNANSWERED) {
        return undefined;
    }
    if (mottarOmsorgsstønad === YesOrNo.NO) {
        return {
            type: 'mottarIkke',
            mottarOmsorgsstønad,
        };
    }

    const timer = getNumberFromNumberInputValue(antallTimer);
    if (timer === undefined) {
        throw 'extractOmsorgsstønadSøknadsdata. Antall timer er undefined';
    }

    if (mottarOmsorgsstønad === YesOrNo.YES) {
        if (mottarOmsorgsstønadIHelePerioden === YesOrNo.YES) {
            return {
                type: 'mottarIHelePeroden',
                mottarOmsorgsstønad: YesOrNo.YES,
                mottarOmsorgsstønadIHelePerioden: YesOrNo.YES,
                antallTimer: timer,
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
                antallTimer: timer,
            };
        }
    }

    return undefined;
};
