import { getNumberFromNumberInputValue, YesOrNo } from '@navikt/sif-common-formik-ds';
import { ISODateRangeToDateRange } from '@navikt/sif-common-utils';

import { ArbeiderIPeriodenSvar } from '../../local-sif-common-pleiepenger';
import { ArbeidIPeriodeType } from '../../types/ArbeidIPeriodeType';
import { RedusertArbeidstidType } from '../../types/RedusertArbeidstidType';
import {
    ArbeidIPeriodeFormValues,
    ArbeidsukerFormValues,
} from '../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import { ArbeidIPeriodeSøknadsdata, ArbeidsukerTimerSøknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const extractArbeidsukerTimerSøknadsdata = (arbeidsuker: ArbeidsukerFormValues): ArbeidsukerTimerSøknadsdata => {
    const arbeidsukerSøknadsdata: ArbeidsukerTimerSøknadsdata = [];
    Object.keys(arbeidsuker).forEach((isoDateRange) => {
        const arbeidsuke = arbeidsuker[isoDateRange];
        const periode = ISODateRangeToDateRange(isoDateRange);
        const timerISnittPerUke = getNumberFromNumberInputValue(arbeidsuke.snittTimerPerUke);
        if (timerISnittPerUke !== undefined) {
            arbeidsukerSøknadsdata.push({ periode, timer: timerISnittPerUke });
        }
    });
    return arbeidsukerSøknadsdata;
};

export const extractArbeidIPeriodeSøknadsdata = (
    formValues: ArbeidIPeriodeFormValues,
): ArbeidIPeriodeSøknadsdata | undefined => {
    const { arbeiderIPerioden, snittTimerPerUke, erLiktHverUke, arbeidsuker } = formValues;

    if (arbeiderIPerioden === ArbeiderIPeriodenSvar.heltFravær) {
        return {
            type: ArbeidIPeriodeType.arbeiderIkke,
        };
    }
    if (arbeiderIPerioden === ArbeiderIPeriodenSvar.somVanlig) {
        return {
            type: ArbeidIPeriodeType.arbeiderVanlig,
        };
    }

    if (erLiktHverUke === YesOrNo.YES) {
        const timerISnittPerUke = getNumberFromNumberInputValue(snittTimerPerUke);
        if (timerISnittPerUke !== undefined) {
            return {
                type: ArbeidIPeriodeType.arbeiderRedusert,
                redusertArbeid: {
                    type: RedusertArbeidstidType.timerISnittPerUke,
                    timerISnittPerUke,
                },
            };
        }
    }
    if ((erLiktHverUke === YesOrNo.NO || erLiktHverUke === undefined) && arbeidsuker) {
        return {
            type: ArbeidIPeriodeType.arbeiderRedusert,
            redusertArbeid: {
                type: RedusertArbeidstidType.ulikeUkerTimer,
                arbeidsuker: extractArbeidsukerTimerSøknadsdata(arbeidsuker),
            },
        };
    }

    return undefined;
};
