import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils';

import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
import {
    ArbeidIPeriodeFormValues,
    ArbeidsukerFormValues,
} from '../../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { ArbeidssituasjonAnsattType } from '../../../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { ArbeidssituasjonSøknadsdata } from '../../../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { skalSpørreOmNormalarbeidstidForIkkeFrilanser } from '../../arbeidssituasjon-step/utils/normalarbeidstidFrilansUtils';
import { getArbeidsukeKey } from '../components/ArbeidstidEnkeltuker';
import { getArbeidsukerIPerioden } from './arbeidstidStepUtils';

export const cleanupArbeidsuker = (periode: DateRange, arbeidsuker: ArbeidsukerFormValues): ArbeidsukerFormValues => {
    const cleanedArbeidsuker: ArbeidsukerFormValues = {};
    const arbeidsukerIPerioden = getArbeidsukerIPerioden(periode);
    arbeidsukerIPerioden.forEach((p) => {
        const key = getArbeidsukeKey(p);
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
    const { arbeiderIPerioden, erLiktHverUke, snittTimerPerUke, arbeidsuker } = formValues;

    if (arbeiderIPerioden !== ArbeiderIPeriodenSvar.redusert) {
        return { arbeiderIPerioden };
    }
    if (erLiktHverUke === YesOrNo.YES) {
        return { arbeiderIPerioden, erLiktHverUke, snittTimerPerUke };
    }
    return {
        arbeiderIPerioden,
        erLiktHverUke,
        arbeidsuker: arbeidsuker ? cleanupArbeidsuker(arbeidsperiode, arbeidsuker) : undefined,
    };
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
                arbeidssituasjon.type === ArbeidssituasjonAnsattType.sluttetFørSøknadsperiode ||
                arbeidssituasjon.type === ArbeidssituasjonAnsattType.ikkeAnsattUkjentSluttdato
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
        if (!skalSpørreOmNormalarbeidstidForIkkeFrilanser(cleanedValues)) {
            delete cleanedValues.frilans.arbeidsforhold;
        }
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
