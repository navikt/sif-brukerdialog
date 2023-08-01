import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils';
import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../../types';
import { ArbeidIPeriodeFormValues, ArbeidsukerFormValues } from '../../../types/ArbeidIPeriodeFormValues';
import { SøknadFormValues } from '../../../types/SøknadFormValues';
import { ArbeidssituasjonAnsattType } from '../../../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { ArbeidssituasjonSøknadsdata } from '../../../types/søknadsdata/ArbeidssituasjonSøknadsdata';
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

export const cleanupArbeidstidStep = (
    formValues: SøknadFormValues,
    arbeidssituasjonSøknadsdata?: ArbeidssituasjonSøknadsdata
): SøknadFormValues => {
    const cleanedValues: SøknadFormValues = { ...formValues };

    if (!arbeidssituasjonSøknadsdata) {
        throw 'cleanupArbeidstidStep: arbeidssituasjonSøknadsdata is undefined';
    }

    /** Ansatt */
    cleanedValues.ansatt_arbeidsforhold = cleanedValues.ansatt_arbeidsforhold.map((arbeidsforholdFormValues) => {
        const arbeidssituasjon = arbeidssituasjonSøknadsdata.arbeidsgivere.find(
            (a) => a.arbeidsgiver.id === arbeidsforholdFormValues.arbeidsgiver.id
        );
        if (!arbeidssituasjon) {
            return arbeidsforholdFormValues;
        }
        return {
            ...arbeidsforholdFormValues,
            arbeidIPeriode:
                arbeidssituasjon.type === ArbeidssituasjonAnsattType.sluttetFørSøknadsperiode
                    ? undefined
                    : cleanupArbeidIPeriode(
                          arbeidssituasjon.periodeSomAnsattISøknadsperiode,
                          arbeidsforholdFormValues.arbeidIPeriode
                      ),
        };
    });

    /** Frilanser */
    if (
        arbeidssituasjonSøknadsdata.frilans?.harInntektSomFrilanser &&
        arbeidssituasjonSøknadsdata.frilans.misterInntektSomFrilanser
    ) {
        const { frilansarbeid, honorararbeid, periodeSomFrilanserISøknadsperiode } =
            arbeidssituasjonSøknadsdata.frilans;

        cleanedValues.frilans.arbeidsforholdFrilansarbeid =
            cleanedValues.frilans.arbeidsforholdFrilansarbeid !== undefined && frilansarbeid
                ? {
                      ...cleanedValues.frilans.arbeidsforholdFrilansarbeid,
                      arbeidIPeriode: cleanupArbeidIPeriode(
                          periodeSomFrilanserISøknadsperiode,
                          cleanedValues.frilans.arbeidsforholdFrilansarbeid.arbeidIPeriode
                      ),
                  }
                : undefined;

        cleanedValues.frilans.arbeidsforholdHonorararbeid =
            cleanedValues.frilans.arbeidsforholdHonorararbeid !== undefined && honorararbeid
                ? {
                      ...cleanedValues.frilans.arbeidsforholdHonorararbeid,
                      arbeidIPeriode: cleanupArbeidIPeriode(
                          periodeSomFrilanserISøknadsperiode,
                          cleanedValues.frilans.arbeidsforholdHonorararbeid.arbeidIPeriode
                      ),
                  }
                : undefined;
    }

    /** Selvstendig næringsdrivende */
    if (
        arbeidssituasjonSøknadsdata.selvstendig?.erSN &&
        arbeidssituasjonSøknadsdata.selvstendig?.periodeSomSelvstendigISøknadsperiode
    ) {
        const { arbeidsforhold } = cleanedValues.selvstendig;
        cleanedValues.selvstendig.arbeidsforhold = {
            ...arbeidsforhold,
            arbeidIPeriode: cleanupArbeidIPeriode(
                arbeidssituasjonSøknadsdata.selvstendig.periodeSomSelvstendigISøknadsperiode,
                arbeidsforhold?.arbeidIPeriode
            ),
        };
    }

    return cleanedValues;
};
