import { DateRange, QuestionConfig, Questions, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
import {
    ArbeidIPeriodeFormField,
    ArbeidIPeriodeFormValues,
    MisterHonorarerFraVervIPerioden,
} from '../../../types/ArbeidIPeriodeFormValues';
import { isYesOrNoAnswered } from '../../../validation/fieldValidations';
import { skalSvarePåOmEnJobberLiktIPerioden } from './arbeidstidUtils';

type ArbeidIPeriodePayload = {
    formValues: ArbeidIPeriodeFormValues;
    arbeidsperiode: DateRange;
};

const ArbeidIPeriodeFormConfig: QuestionConfig<ArbeidIPeriodePayload, ArbeidIPeriodeFormField> = {
    [ArbeidIPeriodeFormField.arbeiderIPerioden]: {
        isIncluded: () => true,
        isAnswered: ({ formValues }) => formValues.arbeiderIPerioden !== undefined,
    },
    [ArbeidIPeriodeFormField.erLiktHverUke]: {
        isIncluded: ({ arbeidsperiode, formValues }) => {
            return (
                skalSvarePåOmEnJobberLiktIPerioden(arbeidsperiode) &&
                (formValues.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert ||
                    formValues.misterHonorarerFraVervIPerioden ===
                        MisterHonorarerFraVervIPerioden.misterDelerAvHonorarer)
            );
        },
        isAnswered: ({ formValues }) => isYesOrNoAnswered(formValues.erLiktHverUke),
    },
    [ArbeidIPeriodeFormField.timerEllerProsent]: {
        isIncluded: ({ formValues, arbeidsperiode }) => {
            if (skalSvarePåOmEnJobberLiktIPerioden(arbeidsperiode) === false) {
                return false;
            } else {
                return formValues.erLiktHverUke === YesOrNo.YES;
            }
        },
        isAnswered: ({ formValues: { timerEllerProsent } }) => timerEllerProsent !== undefined,
    },
    [ArbeidIPeriodeFormField.snittTimerPerUke]: {
        isIncluded: ({ formValues }) => {
            return formValues.erLiktHverUke === YesOrNo.YES;
        },
        isAnswered: ({ formValues: { snittTimerPerUke } }) =>
            snittTimerPerUke !== undefined && snittTimerPerUke.length > 0,
    },
    [ArbeidIPeriodeFormField.arbeidsuker]: {
        isIncluded: ({ formValues, arbeidsperiode }) => {
            return (
                formValues.erLiktHverUke === YesOrNo.NO || skalSvarePåOmEnJobberLiktIPerioden(arbeidsperiode) === false
            );
        },
        isAnswered: () => true,
    },
};

export const arbeidIPeriodeSpørsmålConfig = Questions<ArbeidIPeriodePayload, ArbeidIPeriodeFormField>(
    ArbeidIPeriodeFormConfig
);
