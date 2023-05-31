import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { ArbeidsforholdFormValues } from '../types/ArbeidsforholdFormValues';

export const erAnsattHosArbeidsgiverISøknadsperiode = (arbeidsforhold: ArbeidsforholdFormValues): boolean => {
    return (
        arbeidsforhold.erAnsatt === YesOrNo.YES ||
        (arbeidsforhold.erAnsatt === YesOrNo.NO && arbeidsforhold.sluttetFørSøknadsperiode === YesOrNo.NO)
    );
};

export const erAnsattISøknadsperiode = (arbeidsforhold: ArbeidsforholdFormValues[]): boolean => {
    return arbeidsforhold.some(erAnsattHosArbeidsgiverISøknadsperiode);
};
