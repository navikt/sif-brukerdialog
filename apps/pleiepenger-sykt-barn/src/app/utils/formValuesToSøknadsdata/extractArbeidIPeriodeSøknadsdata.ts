import { DateRange, getNumberFromNumberInputValue, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { dateUtils, ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import { ArbeiderIPeriodenSvar } from '../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../types';
import {
    ArbeidIPeriodeFormValues,
    ArbeidsukerFormValues,
    MisterHonorarerFraVervIPerioden,
} from '../../types/ArbeidIPeriodeFormValues';
import { ArbeidIPeriodeType } from '../../types/arbeidIPeriodeType';
import { ArbeidIPeriodeFrilansSøknadsdata } from '../../types/søknadsdata/arbeidIPeriodeFrilansSøknadsdata';
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

export const extractArbeidIPeriodeSøknadsdata = ({
    arbeiderIPerioden,
    prosentAvNormalt,
    snittTimerPerUke,
    timerEllerProsent,
    erLiktHverUke,
    arbeidsuker,
}: ArbeidIPeriodeFormValues): ArbeidIPeriodeSøknadsdata | undefined => {
    if (arbeiderIPerioden === ArbeiderIPeriodenSvar.heltFravær) {
        return {
            type: ArbeidIPeriodeType.arbeiderIkke,
            arbeiderIPerioden: false,
        };
    }
    if (arbeiderIPerioden === ArbeiderIPeriodenSvar.somVanlig) {
        return {
            type: ArbeidIPeriodeType.arbeiderVanlig,
            arbeiderIPerioden: true,
            arbeiderRedusert: false,
        };
    }

    if (erLiktHverUke === YesOrNo.YES) {
        const arbeiderProsent =
            timerEllerProsent === TimerEllerProsent.PROSENT
                ? getNumberFromNumberInputValue(prosentAvNormalt)
                : undefined;

        const timerISnittPerUke =
            timerEllerProsent === TimerEllerProsent.TIMER ? getNumberFromNumberInputValue(snittTimerPerUke) : undefined;

        if (snittTimerPerUke && timerISnittPerUke) {
            return {
                type: ArbeidIPeriodeType.arbeiderTimerISnittPerUke,
                arbeiderIPerioden: true,
                arbeiderRedusert: true,
                timerISnittPerUke,
            };
        }
        if (arbeiderProsent && prosentAvNormalt) {
            return {
                type: ArbeidIPeriodeType.arbeiderProsentAvNormalt,
                arbeiderIPerioden: true,
                arbeiderRedusert: true,
                prosentAvNormalt: arbeiderProsent,
            };
        }
    }
    if ((erLiktHverUke === YesOrNo.NO || erLiktHverUke === undefined) && arbeidsuker) {
        return {
            type: ArbeidIPeriodeType.arbeiderUlikeUkerTimer,
            arbeiderRedusert: true,
            arbeiderIPerioden: true,
            arbeidsuker: extractArbeidsukerTimerSøknadsdata(arbeidsuker),
        };
    }

    return undefined;
};

export const extractArbeidIPeriodeFrilanserSøknadsdata = ({
    arbeiderIPerioden,
    snittTimerPerUke,
    prosentAvNormalt,
    timerEllerProsent,
    erLiktHverUke,
    arbeidsuker,
    misterHonorarerFraVervIPerioden,
}: ArbeidIPeriodeFormValues): ArbeidIPeriodeFrilansSøknadsdata | undefined => {
    if (
        arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert ||
        misterHonorarerFraVervIPerioden === MisterHonorarerFraVervIPerioden.misterDelerAvHonorarer ||
        (arbeiderIPerioden !== ArbeiderIPeriodenSvar.heltFravær &&
            misterHonorarerFraVervIPerioden !== undefined &&
            misterHonorarerFraVervIPerioden === MisterHonorarerFraVervIPerioden.misterAlleHonorarer)
    ) {
        if (erLiktHverUke === YesOrNo.YES) {
            const arbeiderProsent =
                timerEllerProsent === TimerEllerProsent.PROSENT
                    ? getNumberFromNumberInputValue(prosentAvNormalt)
                    : undefined;

            const timerISnittPerUke =
                timerEllerProsent === TimerEllerProsent.TIMER
                    ? getNumberFromNumberInputValue(snittTimerPerUke)
                    : undefined;

            if (snittTimerPerUke && timerISnittPerUke) {
                return {
                    gjelderFrilans: true,
                    type: ArbeidIPeriodeType.arbeiderTimerISnittPerUke,
                    arbeiderIPerioden: arbeiderIPerioden,
                    misterHonorarerFraVervIPerioden: misterHonorarerFraVervIPerioden,
                    timerISnittPerUke,
                };
            }
            if (arbeiderProsent && prosentAvNormalt) {
                return {
                    gjelderFrilans: true,
                    type: ArbeidIPeriodeType.arbeiderProsentAvNormalt,
                    arbeiderIPerioden: arbeiderIPerioden,
                    misterHonorarerFraVervIPerioden: misterHonorarerFraVervIPerioden,
                    prosentAvNormalt: arbeiderProsent,
                };
            }
        }

        if ((erLiktHverUke === YesOrNo.NO || erLiktHverUke === undefined) && arbeidsuker) {
            return {
                gjelderFrilans: true,
                type: ArbeidIPeriodeType.arbeiderUlikeUkerTimer,
                arbeiderIPerioden: arbeiderIPerioden,
                misterHonorarerFraVervIPerioden: misterHonorarerFraVervIPerioden,
                arbeidsuker: extractArbeidsukerTimerSøknadsdata(arbeidsuker),
            };
        }
    }

    if (
        arbeiderIPerioden === ArbeiderIPeriodenSvar.heltFravær ||
        misterHonorarerFraVervIPerioden === MisterHonorarerFraVervIPerioden.misterAlleHonorarer
    ) {
        return {
            gjelderFrilans: true,
            type: ArbeidIPeriodeType.arbeiderIkke,
            arbeiderIPerioden,
            misterHonorarerFraVervIPerioden: misterHonorarerFraVervIPerioden,
        };
    }

    return {
        gjelderFrilans: true,
        type: ArbeidIPeriodeType.arbeiderVanlig,
        arbeiderIPerioden: arbeiderIPerioden,
        misterHonorarerFraVervIPerioden: misterHonorarerFraVervIPerioden,
    };
};
