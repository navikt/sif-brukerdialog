import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { Virksomhet } from '@navikt/sif-common-forms-ds/lib';
import { DateRange } from '@navikt/sif-common-utils';
import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../../types';
import { ArbeidIPeriodeFormValues, ArbeidsukerFormValues } from '../../../types/ArbeidIPeriodeFormValues';
import { ArbeidsforholdFormValues, ArbeidsforholdSelvstendigFormValues } from '../../../types/ArbeidsforholdFormValues';
import { SøknadFormValues } from '../../../types/SøknadFormValues';
import {
    ArbeidSelvstendigSøknadsdata,
    ArbeidsgivereSøknadsdata,
    ArbeidSøknadsdata,
    erFrilanserSomMisterInntekt,
} from '../../../types/søknadsdata/Søknadsdata';
import { getPeriodeSomSelvstendigInnenforPeriode } from '../../../utils/selvstendigUtils';
import { getArbeidsukeKey } from '../components/ArbeidstidEnkeltuker';
import { getArbeidsukerIPerioden } from './arbeidstidUtils';

export const cleanupArbeidsuker = (
    periode: DateRange,
    arbeidsuker: ArbeidsukerFormValues,
    timerEllerProsent: TimerEllerProsent
): ArbeidsukerFormValues => {
    const cleanedArbeidsuker: ArbeidsukerFormValues = {};
    const arbeidsukerIPerioden = getArbeidsukerIPerioden(periode);
    arbeidsukerIPerioden.forEach((periode) => {
        const key = getArbeidsukeKey(periode);
        if (arbeidsuker[key]) {
            const { prosentAvNormalt, snittTimerPerUke } = arbeidsuker[key];
            cleanedArbeidsuker[key] = {
                prosentAvNormalt: timerEllerProsent === TimerEllerProsent.PROSENT ? prosentAvNormalt : undefined,
                snittTimerPerUke: timerEllerProsent === TimerEllerProsent.TIMER ? snittTimerPerUke : undefined,
            };
        }
    });
    return cleanedArbeidsuker;
};

export const cleanupArbeidIPeriode = (
    arbeidsperiode: DateRange,
    formValues?: ArbeidIPeriodeFormValues
    // normalarbeidstid: NormalarbeidstidSøknadsdata | undefined
): ArbeidIPeriodeFormValues | undefined => {
    if (!formValues) {
        return undefined;
    }
    const arbeid: ArbeidIPeriodeFormValues = {
        arbeiderIPerioden: formValues.arbeiderIPerioden,
    };
    if (arbeid.arbeiderIPerioden !== ArbeiderIPeriodenSvar.redusert) {
        return arbeid;
    }
    // if (!normalarbeidstid) {
    //     throw 'cleanupArbeidIPeriode: normalarbeidstid er undefined';
    // }

    arbeid.erLiktHverUke = formValues.erLiktHverUke;
    arbeid.timerEllerProsent = formValues.erLiktHverUke === YesOrNo.YES ? formValues.timerEllerProsent : undefined;

    if (arbeid.erLiktHverUke === YesOrNo.YES) {
        return arbeid.timerEllerProsent === TimerEllerProsent.PROSENT
            ? { ...arbeid, prosentAvNormalt: formValues.prosentAvNormalt, arbeidsuker: undefined }
            : { ...arbeid, snittTimerPerUke: formValues.snittTimerPerUke, arbeidsuker: undefined };
    } else {
        return {
            ...arbeid,
            prosentAvNormalt: undefined,
            snittTimerPerUke: undefined,
            arbeidsuker: formValues.arbeidsuker
                ? cleanupArbeidsuker(arbeidsperiode, formValues.arbeidsuker, TimerEllerProsent.TIMER)
                : undefined,
        };
    }
};

export const cleanupArbeidstidAnsatt = (
    søknadsperiode: DateRange,
    ansatt_arbeidsforhold: ArbeidsforholdFormValues[],
    arbeidsgivere: ArbeidsgivereSøknadsdata | undefined
): ArbeidsforholdFormValues[] => {
    if (!arbeidsgivere) {
        throw 'cleanupArbeidstidAnsatt: arbeidsgivere er undefined';
    }
    return ansatt_arbeidsforhold.map((arbeidsforhold) => {
        const arbeidsgiver = arbeidsgivere.get(arbeidsforhold.arbeidsgiver.id);
        if (!arbeidsgiver || arbeidsgiver?.erAnsattISøknadsperiode === false) {
            return arbeidsforhold;
        }
        return {
            ...arbeidsforhold,
            arbeidIPeriode:
                arbeidsforhold.arbeidIPeriode && arbeidsforhold.normalarbeidstid
                    ? cleanupArbeidIPeriode(
                          søknadsperiode,
                          arbeidsforhold.arbeidIPeriode
                          //   arbeidsgiver.arbeidsforhold.normalarbeidstid
                      )
                    : undefined,
        };
    });
};

// export const cleanupArbeidstidFrilansarbeid = (
//     arbeidsforholdFrilansarbeid: ArbeidsforholdFrilanserFormValues | undefined,
//     frilanserSøknadsdata: FrilanserSøknadsdata | undefined,
//     periodeSomFrilanser: DateRange
// ): ArbeidsforholdFrilanserFormValues | undefined => {
//     if (arbeidsforholdFrilansarbeid === undefined || !frilanserSøknadsdata) {
//         return undefined;
//     }

//     const erLiktHverUke = skalSvarePåOmEnJobberLiktIPerioden(periodeSomFrilanser)
//         ? arbeidsforholdFrilansarbeid.arbeidIPeriode?.erLiktHverUke
//         : YesOrNo.NO;

//     const normalarbeidstid =
//         frilanserSøknadsdata.harInntektSomFrilanser && frilanserSøknadsdata.misterInntektSomFrilanserIPeriode
//             ? frilanserSøknadsdata.arbeidsforholdFrilanserarbeid?.normalarbeidstid
//             : undefined;

//     return {
//         ...arbeidsforholdFrilansarbeid,
//         arbeidIPeriode:
//             periodeSomFrilanser &&
//             normalarbeidstid &&
//             arbeidsforholdFrilansarbeid.arbeidIPeriode &&
//             arbeidsforholdFrilansarbeid.normalarbeidstid
//                 ? cleanupArbeidIPeriode(
//                       periodeSomFrilanser,
//                       { ...arbeidsforholdFrilansarbeid.arbeidIPeriode, erLiktHverUke }
//                       //   normalarbeidstid
//                   )
//                 : undefined,
//     };
// };
// export const cleanupArbeidstidHonorararbeid = (
//     arbeidsforholdHonorararbeid: ArbeidsforholdFrilanserFormValues | undefined,
//     normalarbeidstid: NormalarbeidstidSøknadsdata,
//     periodeSomFrilanser: DateRange
// ): ArbeidsforholdFrilanserFormValues | undefined => {
//     if (arbeidsforholdHonorararbeid === undefined) {
//         return undefined;
//     }

//     const erLiktHverUke = skalSvarePåOmEnJobberLiktIPerioden(periodeSomFrilanser)
//         ? arbeidsforholdHonorararbeid.arbeidIPeriode?.erLiktHverUke
//         : YesOrNo.NO;

//     return {
//         ...arbeidsforholdHonorararbeid,
//         arbeidIPeriode:
//             periodeSomFrilanser &&
//             normalarbeidstid &&
//             arbeidsforholdHonorararbeid.arbeidIPeriode &&
//             arbeidsforholdHonorararbeid.normalarbeidstid
//                 ? cleanupArbeidIPeriode(
//                       periodeSomFrilanser,
//                       { ...arbeidsforholdHonorararbeid.arbeidIPeriode, erLiktHverUke }
//                       //   normalarbeidstid
//                   )
//                 : undefined,
//     };
// };

export const cleanupArbeidstidSelvstendigNæringdrivende = (
    søknadsperiode: DateRange,
    selvstendigSøknadsdata: ArbeidSelvstendigSøknadsdata | undefined,
    selvstendig_virksomhet: Virksomhet | undefined,
    selvstendig_arbeidsforhold: ArbeidsforholdSelvstendigFormValues | undefined
): ArbeidsforholdSelvstendigFormValues | undefined => {
    if (!selvstendig_arbeidsforhold || !selvstendigSøknadsdata) {
        return undefined;
    }
    const periodeSomSelvstendigNæringsdrivende = getPeriodeSomSelvstendigInnenforPeriode(
        søknadsperiode,
        selvstendig_virksomhet
    );
    return {
        ...selvstendig_arbeidsforhold,
        arbeidIPeriode:
            selvstendig_arbeidsforhold?.arbeidIPeriode &&
            periodeSomSelvstendigNæringsdrivende &&
            selvstendig_arbeidsforhold.normalarbeidstid
                ? cleanupArbeidIPeriode(søknadsperiode, selvstendig_arbeidsforhold?.arbeidIPeriode)
                : undefined,
    };
};

export const cleanupArbeidstidStep = (
    formData: SøknadFormValues,
    arbeidSøknadsdata: ArbeidSøknadsdata,
    søknadsperiode: DateRange
): SøknadFormValues => {
    const values: SøknadFormValues = { ...formData };

    values.ansatt_arbeidsforhold = arbeidSøknadsdata.arbeidsgivere
        ? cleanupArbeidstidAnsatt(søknadsperiode, values.ansatt_arbeidsforhold, arbeidSøknadsdata.arbeidsgivere)
        : values.ansatt_arbeidsforhold;

    const periodeSomFrilanser = erFrilanserSomMisterInntekt(arbeidSøknadsdata.frilanser)
        ? arbeidSøknadsdata.frilanser.periodeinfo.aktivPeriode
        : undefined;

    if (periodeSomFrilanser) {
        values.frilans.arbeidsforholdFrilansarbeid = values.frilans.arbeidsforholdFrilansarbeid
            ? {
                  normalarbeidstid: values.frilans.arbeidsforholdFrilansarbeid.normalarbeidstid,
                  arbeidIPeriode: cleanupArbeidIPeriode(
                      periodeSomFrilanser,
                      values.frilans.arbeidsforholdFrilansarbeid.arbeidIPeriode
                  ),
              }
            : undefined;
        values.frilans.arbeidsforholdHonorararbeid = values.frilans.arbeidsforholdHonorararbeid
            ? {
                  normalarbeidstid: values.frilans.arbeidsforholdHonorararbeid.normalarbeidstid,
                  arbeidIPeriode: cleanupArbeidIPeriode(
                      periodeSomFrilanser,
                      values.frilans.arbeidsforholdHonorararbeid.arbeidIPeriode
                  ),
              }
            : undefined;
    }

    values.selvstendig.arbeidsforhold = cleanupArbeidstidSelvstendigNæringdrivende(
        søknadsperiode,
        arbeidSøknadsdata.selvstendig,
        values.selvstendig.virksomhet,
        values.selvstendig.arbeidsforhold
    );

    return values;
};
