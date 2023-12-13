import { DateRange, getNumberFromNumberInputValue, YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { dateUtils, ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import { ArbeiderIPeriodenSvar } from '../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../types';
import {
    ArbeidIPeriodeFormValues,
    ArbeidsukerFormValues,
} from '../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import { ArbeidIPeriodeType } from '../../types/ArbeidIPeriodeType';
import { RedusertArbeidstidType } from '../../types/RedusertArbeidstidType';
import { ArbeidIPeriodeSøknadsdata, ArbeidsukerTimerSøknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const getMinDateRangeFromDateRanges = (dr1: DateRange, dr2: DateRange): DateRange => ({
    from: dateUtils.getLastOfTwoDates(dr1.from, dr2.from),
    to: dateUtils.getFirstOfTwoDates(dr1.to, dr2.to),
});

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
    const { arbeiderIPerioden, prosentAvNormalt, snittTimerPerUke, timerEllerProsent, erLiktHverUke, arbeidsuker } =
        formValues;

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
        const arbeiderProsent =
            timerEllerProsent === TimerEllerProsent.PROSENT
                ? getNumberFromNumberInputValue(prosentAvNormalt)
                : undefined;

        const timerISnittPerUke =
            timerEllerProsent === TimerEllerProsent.TIMER ? getNumberFromNumberInputValue(snittTimerPerUke) : undefined;

        if (snittTimerPerUke && timerISnittPerUke !== undefined) {
            return {
                type: ArbeidIPeriodeType.arbeiderRedusert,
                redusertArbeid: {
                    type: RedusertArbeidstidType.timerISnittPerUke,
                    timerISnittPerUke,
                },
            };
        }
        if (arbeiderProsent && prosentAvNormalt) {
            return {
                type: ArbeidIPeriodeType.arbeiderRedusert,
                redusertArbeid: {
                    type: RedusertArbeidstidType.prosentAvNormalt,
                    prosentAvNormalt: arbeiderProsent,
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
