import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils';
import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../../types';
import {
    ArbeidIPeriodeFormValues,
    ArbeidsukerFormValues,
} from '../../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { ArbeidssituasjonAnsattType } from '../../../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { ArbeidssituasjonSøknadsdata } from '../../../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { getArbeidsukeKey } from '../components/ArbeidstidEnkeltuker';
import { getArbeidsukerIPerioden } from './arbeidstidStepUtils';

export const cleanupArbeidsuker = (periode: DateRange, arbeidsuker: ArbeidsukerFormValues): ArbeidsukerFormValues => {
    const cleanedArbeidsuker: ArbeidsukerFormValues = {};
    const arbeidsukerIPerioden = getArbeidsukerIPerioden(periode);
    arbeidsukerIPerioden.forEach((periode) => {
        const key = getArbeidsukeKey(periode);
        if (arbeidsuker[key]) {
            const { snittTimerPerUke } = arbeidsuker[key];
            cleanedArbeidsuker[key] = {
                snittTimerPerUke,
            };
        }
    });
    return cleanedArbeidsuker;
};

export const cleanupArbeidIPeriode = (
    arbeidsperiode: DateRange,
    formValues?: ArbeidIPeriodeFormValues,
): ArbeidIPeriodeFormValues | undefined => {
    if (!formValues) {
        return undefined;
    }
    const arbeid: ArbeidIPeriodeFormValues = {
        arbeiderIPerioden: formValues.arbeiderIPerioden,
    };

    if (arbeid.arbeiderIPerioden !== ArbeiderIPeriodenSvar.redusert) {
        return { arbeiderIPerioden: arbeid.arbeiderIPerioden };
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
                ? cleanupArbeidsuker(arbeidsperiode, formValues.arbeidsuker)
                : undefined,
        };
    }
};

export const cleanupArbeidstidStep = (
    formValues: SøknadFormValues,
    arbeidssituasjonSøknadsdata?: ArbeidssituasjonSøknadsdata,
): SøknadFormValues => {
    const cleanedValues: SøknadFormValues = { ...formValues };

    if (!arbeidssituasjonSøknadsdata) {
        throw 'cleanupArbeidstidStep: arbeidssituasjonSøknadsdata is undefined';
    }

    /** Ansatt */
    cleanedValues.ansatt_arbeidsforhold = cleanedValues.ansatt_arbeidsforhold.map((arbeidsforholdFormValues) => {
        const arbeidssituasjon = arbeidssituasjonSøknadsdata.arbeidsgivere.get(
            arbeidsforholdFormValues.arbeidsgiver.id,
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
                          arbeidsforholdFormValues.arbeidIPeriode,
                      ),
        };
    });

    const { frilans: arbeidssituasjonFrilans } = arbeidssituasjonSøknadsdata;
    /** Frilanser */
    if (!arbeidssituasjonFrilans?.harInntektSomFrilanser || !arbeidssituasjonFrilans?.misterInntektSomFrilanser) {
        delete cleanedValues.frilans.arbeidsforhold;
    } else {
        if (cleanedValues.frilans.arbeidsforhold) {
            cleanedValues.frilans.arbeidsforhold.arbeidIPeriode = cleanupArbeidIPeriode(
                arbeidssituasjonFrilans.periodeSomFrilanserISøknadsperiode,
                cleanedValues.frilans.arbeidsforhold?.arbeidIPeriode,
            );
        }
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
                arbeidsforhold?.arbeidIPeriode,
            ),
        };
    }

    return cleanedValues;
};
