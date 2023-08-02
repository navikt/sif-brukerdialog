import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { Arbeidsgiver } from '../types';
import { ArbeidsforholdFormValues } from '../types/ArbeidsforholdFormValues';

dayjs.extend(minMax);

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
        from: dayjs.max([dayjs(periode.from), dayjs(arbeidsgiver.ansattFom)]).toDate(),
        to: periode.to,
    };
};
