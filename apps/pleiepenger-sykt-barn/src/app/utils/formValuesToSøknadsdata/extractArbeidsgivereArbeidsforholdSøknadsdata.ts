import { ArbeidsforholdFormValues } from '../../types/ArbeidsforholdFormValues';
import { ArbeidsgivereSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { extractArbeidAnsattSøknadsdata } from './extractArbeidAnsattSøknadsdata';

export const extractArbeidsgivereArbeidsforholdSøknadsdata = (
    ansatt_arbeidsforhold: ArbeidsforholdFormValues[] = []
): ArbeidsgivereSøknadsdata | undefined => {
    const arbeidsgivereSøknadsdataMap: ArbeidsgivereSøknadsdata = new Map();
    ansatt_arbeidsforhold.forEach((ansattForhold) => {
        const ansattArbeidsforhold = extractArbeidAnsattSøknadsdata(ansattForhold);
        if (ansattArbeidsforhold) {
            arbeidsgivereSøknadsdataMap.set(ansattForhold.arbeidsgiver.id, ansattArbeidsforhold);
        }
    });

    return arbeidsgivereSøknadsdataMap.size > 0 ? arbeidsgivereSøknadsdataMap : undefined;
};
