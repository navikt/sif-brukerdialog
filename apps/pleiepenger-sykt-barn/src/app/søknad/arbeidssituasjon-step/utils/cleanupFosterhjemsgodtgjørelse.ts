import { YesOrNo } from '@navikt/sif-common-formik-ds';

import { FosterhjemsgodtgjørelseFormValues } from '../../../types/søknad-form-values/FosterhjemsgodtgjørelseFormValues';

export const cleanupFosterhjemsgodtgjørelse = (
    values: FosterhjemsgodtgjørelseFormValues,
): FosterhjemsgodtgjørelseFormValues => {
    const fosterhjemsgodtgjørelse: FosterhjemsgodtgjørelseFormValues = { ...values };
    if (fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelse === YesOrNo.NO) {
        fosterhjemsgodtgjørelse.erFrikjøptFraJobb = undefined;
    }
    if (fosterhjemsgodtgjørelse.erFrikjøptFraJobb === undefined) {
        fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelseIHelePerioden = undefined;
    }
    if (
        fosterhjemsgodtgjørelse.erFrikjøptFraJobb === YesOrNo.NO ||
        fosterhjemsgodtgjørelse.erFrikjøptFraJobb === undefined
    ) {
        fosterhjemsgodtgjørelse.frikjøptBeskrivelse = undefined;
    }
    if (fosterhjemsgodtgjørelse.erFrikjøptFraJobb === YesOrNo.YES) {
        fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelseIHelePerioden = undefined;
    }
    if (
        fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelseIHelePerioden === YesOrNo.YES ||
        fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelseIHelePerioden === undefined
    ) {
        fosterhjemsgodtgjørelse.starterUndeveis = undefined;
        fosterhjemsgodtgjørelse.startdato = undefined;
        fosterhjemsgodtgjørelse.slutterUnderveis = undefined;
        fosterhjemsgodtgjørelse.sluttdato = undefined;
    }

    if (fosterhjemsgodtgjørelse.starterUndeveis === YesOrNo.NO) {
        fosterhjemsgodtgjørelse.startdato = undefined;
    }

    if (fosterhjemsgodtgjørelse.slutterUnderveis === YesOrNo.NO) {
        fosterhjemsgodtgjørelse.sluttdato = undefined;
    }

    return fosterhjemsgodtgjørelse;
};
