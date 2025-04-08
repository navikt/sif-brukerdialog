import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { FosterhjemsgodtgjørelseFormValues } from '../../../types/søknad-form-values/FosterhjemsgodtgjørelseFormValues';
import { TimerEllerProsent } from '../../../types';

export const cleanupFosterhjemsgodtgjørelse = (
    values: FosterhjemsgodtgjørelseFormValues,
): FosterhjemsgodtgjørelseFormValues => {
    const fosterhjemsgodtgjørelse: FosterhjemsgodtgjørelseFormValues = { ...values };
    if (fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelse === YesOrNo.NO) {
        fosterhjemsgodtgjørelse.erFrikjøptFraJobb = undefined;
    }
    if (
        fosterhjemsgodtgjørelse.erFrikjøptFraJobb === undefined ||
        fosterhjemsgodtgjørelse.erFrikjøptFraJobb === YesOrNo.NO
    ) {
        fosterhjemsgodtgjørelse.frikjøptTimerEllerProsent = undefined;
        fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelseIHelePerioden = undefined;
        fosterhjemsgodtgjørelse.starterUndeveis = undefined;
        fosterhjemsgodtgjørelse.startdato = undefined;
        fosterhjemsgodtgjørelse.slutterUnderveis = undefined;
        fosterhjemsgodtgjørelse.sluttdato = undefined;
    }
    if (fosterhjemsgodtgjørelse.frikjøptTimerEllerProsent === undefined) {
        fosterhjemsgodtgjørelse.frikjøptTimer = undefined;
        fosterhjemsgodtgjørelse.frikjøptProsent = undefined;
    }
    if (fosterhjemsgodtgjørelse.frikjøptTimerEllerProsent === TimerEllerProsent.PROSENT) {
        fosterhjemsgodtgjørelse.frikjøptTimer = undefined;
    }
    if (fosterhjemsgodtgjørelse.frikjøptTimerEllerProsent === TimerEllerProsent.TIMER) {
        fosterhjemsgodtgjørelse.frikjøptProsent = undefined;
    }
    if (fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelseIHelePerioden === YesOrNo.YES) {
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
