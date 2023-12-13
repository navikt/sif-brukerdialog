import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { Arbeidsgiver } from '../types';
import { ArbeidIPeriodeType } from '../types/ArbeidIPeriodeType';
import { ArbeidsforholdFormValues } from '../types/søknad-form-values/ArbeidsforholdFormValues';
import { ArbeidssituasjonAnsattType } from '../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { ArbeidssituasjonSøknadsdata } from '../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { ArbeidstidSøknadsdata } from '../types/søknadsdata/ArbeidstidSøknadsdata';

dayjs.extend(minMax);
dayjs.extend(weekOfYear);

export const erAnsattHosArbeidsgiverISøknadsperiode = (arbeidsforhold: ArbeidsforholdFormValues): boolean => {
    return (
        arbeidsforhold.erAnsatt === YesOrNo.YES ||
        (arbeidsforhold.erAnsatt === YesOrNo.NO && arbeidsforhold.sluttetFørSøknadsperiode === YesOrNo.NO)
    );
};

export const erAnsattISøknadsperiode = (arbeidsforhold: ArbeidsforholdFormValues[]): boolean => {
    return arbeidsforhold.some(erAnsattHosArbeidsgiverISøknadsperiode);
};

export const getPeriodeSomAnsattInnenforPeriode = (periode: DateRange, arbeidsgiver: Arbeidsgiver): DateRange => {
    if (arbeidsgiver.ansattFom === undefined) {
        return {
            from: periode.from,
            to: periode.to,
        };
    }
    return {
        from: dayjs.max([dayjs(periode.from), dayjs(arbeidsgiver.ansattFom)])!.toDate(),
        to: periode.to,
    };
};

export const harArbeidIPerioden = (arbeidssituasjon?: ArbeidssituasjonSøknadsdata): boolean => {
    if (!arbeidssituasjon) {
        return false;
    }
    const erAnsattIPerioden = Array.from(arbeidssituasjon.arbeidsgivere, (a) => a[1]).some(
        (a) => a.type !== ArbeidssituasjonAnsattType.sluttetFørSøknadsperiode,
    );
    const erFrilanserIPerioden = arbeidssituasjon.frilans?.harInntektSomFrilanser === true;
    const erSelvstendigIPerioden = arbeidssituasjon.selvstendig?.erSN === true;
    return erAnsattIPerioden || erFrilanserIPerioden || erSelvstendigIPerioden;
};

export const harFraværFraJobb = (arbeidstid: ArbeidstidSøknadsdata | undefined): boolean => {
    if (!arbeidstid) {
        return false;
    }

    const harFraværSomAnsatt = Array.from(arbeidstid.arbeidsgivere).some((item) => {
        return item[1].type !== ArbeidIPeriodeType.arbeiderVanlig;
    });

    const harFraværSomFrilanser =
        arbeidstid.frilans !== undefined && arbeidstid.frilans?.type !== ArbeidIPeriodeType.arbeiderVanlig;

    const harFraværSomSelvstendig =
        arbeidstid.selvstendig !== undefined && arbeidstid.selvstendig?.type !== ArbeidIPeriodeType.arbeiderVanlig;

    return harFraværSomAnsatt || harFraværSomFrilanser || harFraværSomSelvstendig;
};

export const getArbeidsdagerPeriode = ({ from, to }: DateRange): DateRange | undefined => {
    const startIsoWeekday = dayjs(from).isoWeekday();
    if (startIsoWeekday > 5) {
        return undefined;
    }
    const endIsoWeekday = dayjs(to).isoWeekday();
    if (endIsoWeekday <= 5) {
        return {
            from,
            to,
        };
    }
    return { from, to: dayjs(from).startOf('isoWeek').add(4, 'days').toDate() };
};
