import { DateRange } from '@navikt/sif-common-utils';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { Virksomhet } from '@navikt/sif-common-forms-ds/lib';
import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../../types';
import {
    ArbeidIPeriodeFormField,
    ArbeidIPeriodeFormValues,
    ArbeidsukerFormValues,
    MisterHonorarerFraVervIPerioden,
} from '../../../types/ArbeidIPeriodeFormValues';
import {
    ArbeidsforholdFormValues,
    ArbeidsforholdFrilanserFormValues,
    ArbeidsforholdSelvstendigFormValues,
} from '../../../types/ArbeidsforholdFormValues';
import { FrilansFormData } from '../../../types/FrilansFormData';
import { SøknadFormValues } from '../../../types/SøknadFormValues';
import {
    ArbeidFrilansSøknadsdata,
    ArbeidSelvstendigSøknadsdata,
    ArbeidsgivereSøknadsdata,
    ArbeidSøknadsdata,
    NormalarbeidstidSøknadsdata,
} from '../../../types/søknadsdata/Søknadsdata';
import { getPeriodeSomFrilanserInnenforPeriode } from '../../../utils/frilanserUtils';
import { getPeriodeSomSelvstendigInnenforPeriode } from '../../../utils/selvstendigUtils';
import { getArbeidsukeKey } from '../components/ArbeidstidUkerSpørsmål';
import { arbeidIPeriodeSpørsmålConfig } from './arbeidIPeriodeSpørsmålConfig';
import { getArbeidsukerIPerioden, skalSvarePåOmEnJobberLiktIPerioden } from './arbeidstidUtils';

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
    arbeidIPerioden: ArbeidIPeriodeFormValues,
    normalarbeidstid: NormalarbeidstidSøknadsdata | undefined
): ArbeidIPeriodeFormValues => {
    const config = arbeidIPeriodeSpørsmålConfig.getVisbility({
        formValues: arbeidIPerioden,
        arbeidsperiode,
    });

    const arbeid: ArbeidIPeriodeFormValues = {
        arbeiderIPerioden: arbeidIPerioden.arbeiderIPerioden,
    };
    if (arbeid.arbeiderIPerioden !== ArbeiderIPeriodenSvar.redusert) {
        return arbeid;
    }
    if (!normalarbeidstid) {
        throw 'cleanupArbeidIPeriode: normalarbeidstid er undefined';
    }

    if (config.isIncluded(ArbeidIPeriodeFormField.erLiktHverUke)) {
        arbeid.erLiktHverUke = arbeidIPerioden.erLiktHverUke;
    }
    if (config.isIncluded(ArbeidIPeriodeFormField.timerEllerProsent)) {
        arbeid.timerEllerProsent = arbeidIPerioden.timerEllerProsent;
    }
    if (arbeid.erLiktHverUke === YesOrNo.YES) {
        return arbeid.timerEllerProsent === TimerEllerProsent.PROSENT
            ? { ...arbeid, prosentAvNormalt: arbeidIPerioden.prosentAvNormalt, arbeidsuker: undefined }
            : { ...arbeid, snittTimerPerUke: arbeidIPerioden.snittTimerPerUke, arbeidsuker: undefined };
    } else {
        return {
            ...arbeid,
            prosentAvNormalt: undefined,
            snittTimerPerUke: undefined,
            arbeidsuker: arbeidIPerioden.arbeidsuker
                ? cleanupArbeidsuker(arbeidsperiode, arbeidIPerioden.arbeidsuker, TimerEllerProsent.TIMER)
                : undefined,
        };
    }
};

export const cleanupArbeidIPeriodeFrilans = (
    arbeidsperiode: DateRange,
    arbeidIPerioden: ArbeidIPeriodeFormValues,
    normalarbeidstid: NormalarbeidstidSøknadsdata | undefined
): ArbeidIPeriodeFormValues => {
    const config = arbeidIPeriodeSpørsmålConfig.getVisbility({
        formValues: arbeidIPerioden,
        arbeidsperiode,
    });

    const arbeid: ArbeidIPeriodeFormValues = {
        arbeiderIPerioden: arbeidIPerioden.arbeiderIPerioden,
        misterHonorarerFraVervIPerioden: arbeidIPerioden.misterHonorarerFraVervIPerioden,
    };

    if (!normalarbeidstid) {
        throw 'cleanupArbeidIPeriode: normalarbeidstid er undefined';
    }

    if (
        arbeid.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert ||
        arbeid.misterHonorarerFraVervIPerioden === MisterHonorarerFraVervIPerioden.misterDelerAvHonorarer
    ) {
        if (config.isIncluded(ArbeidIPeriodeFormField.erLiktHverUke)) {
            arbeid.erLiktHverUke = arbeidIPerioden.erLiktHverUke;
        }

        if (arbeid.erLiktHverUke === YesOrNo.YES) {
            return { ...arbeid, snittTimerPerUke: arbeidIPerioden.snittTimerPerUke, arbeidsuker: undefined };
        } else {
            return {
                ...arbeid,
                prosentAvNormalt: undefined,
                snittTimerPerUke: undefined,
                arbeidsuker: arbeidIPerioden.arbeidsuker
                    ? cleanupArbeidsuker(arbeidsperiode, arbeidIPerioden.arbeidsuker, TimerEllerProsent.TIMER)
                    : undefined,
            };
        }
    }
    return arbeid;
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
                          arbeidsforhold.arbeidIPeriode,
                          arbeidsgiver.arbeidsforhold.normalarbeidstid
                      )
                    : undefined,
        };
    });
};

export const cleanupArbeidstidFrilans = (
    frilans: FrilansFormData,
    frilansSøknadsdata: ArbeidFrilansSøknadsdata | undefined,
    søknadsperiode: DateRange
): ArbeidsforholdFrilanserFormValues | undefined => {
    if (frilans.arbeidsforhold === undefined || !frilansSøknadsdata) {
        return undefined;
    }

    const periodeSomFrilanser = getPeriodeSomFrilanserInnenforPeriode(søknadsperiode, frilans);
    const erLiktHverUke = skalSvarePåOmEnJobberLiktIPerioden(periodeSomFrilanser)
        ? frilans.arbeidsforhold.arbeidIPeriode?.erLiktHverUke
        : YesOrNo.NO;

    const normalarbeidstid =
        frilansSøknadsdata.erFrilanser &&
        (frilansSøknadsdata.type === 'pågående' || frilansSøknadsdata.type === 'sluttetISøknadsperiode')
            ? frilansSøknadsdata.arbeidsforhold.normalarbeidstid
            : undefined;

    return {
        ...frilans.arbeidsforhold,
        arbeidIPeriode:
            periodeSomFrilanser &&
            normalarbeidstid &&
            frilans.arbeidsforhold.arbeidIPeriode &&
            frilans.arbeidsforhold.normalarbeidstid
                ? cleanupArbeidIPeriodeFrilans(
                      periodeSomFrilanser,
                      { ...frilans.arbeidsforhold.arbeidIPeriode, erLiktHverUke },
                      normalarbeidstid
                  )
                : undefined,
    };
};

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
    const normalarbeidstid = selvstendigSøknadsdata.erSN
        ? selvstendigSøknadsdata.arbeidsforhold.normalarbeidstid
        : undefined;
    return {
        ...selvstendig_arbeidsforhold,
        arbeidIPeriode:
            selvstendig_arbeidsforhold?.arbeidIPeriode &&
            periodeSomSelvstendigNæringsdrivende &&
            selvstendig_arbeidsforhold.normalarbeidstid
                ? cleanupArbeidIPeriode(søknadsperiode, selvstendig_arbeidsforhold?.arbeidIPeriode, normalarbeidstid)
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
    values.frilans.arbeidsforhold = cleanupArbeidstidFrilans(values.frilans, arbeidSøknadsdata.frilans, søknadsperiode);
    values.selvstendig.arbeidsforhold = cleanupArbeidstidSelvstendigNæringdrivende(
        søknadsperiode,
        arbeidSøknadsdata.selvstendig,
        values.selvstendig.virksomhet,
        values.selvstendig.arbeidsforhold
    );

    return values;
};
