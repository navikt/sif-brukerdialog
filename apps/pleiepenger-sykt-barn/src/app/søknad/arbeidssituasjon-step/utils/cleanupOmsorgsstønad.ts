import { YesOrNo } from '@navikt/sif-common-formik-ds';

import { OmsorgsstønadFormValues } from '../../../types/søknad-form-values/OmsorgsstønadFormValues';

export const cleanupOmsorgsstønad = (values: OmsorgsstønadFormValues): OmsorgsstønadFormValues => {
    const omsorgsstønad: OmsorgsstønadFormValues = { ...values };
    if (omsorgsstønad.mottarOmsorgsstønad === YesOrNo.NO) {
        omsorgsstønad.mottarOmsorgsstønadIHelePerioden = undefined;
        omsorgsstønad.antallTimer = undefined;
        omsorgsstønad.starterUndeveis = undefined;
        omsorgsstønad.startdato = undefined;
        omsorgsstønad.slutterUnderveis = undefined;
        omsorgsstønad.sluttdato = undefined;
    }

    if (omsorgsstønad.mottarOmsorgsstønadIHelePerioden === YesOrNo.YES) {
        omsorgsstønad.starterUndeveis = undefined;
        omsorgsstønad.startdato = undefined;
        omsorgsstønad.slutterUnderveis = undefined;
        omsorgsstønad.sluttdato = undefined;
    }

    if (omsorgsstønad.starterUndeveis === YesOrNo.NO) {
        omsorgsstønad.startdato = undefined;
    }

    if (omsorgsstønad.slutterUnderveis === YesOrNo.NO) {
        omsorgsstønad.sluttdato = undefined;
    }

    return omsorgsstønad;
};
