import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdFormValues } from '../../types/ArbeidsforholdFormValues';
import { ArbeidsgivereSøknadsdata_depr } from '../../types/søknadsdata/Søknadsdata';
import { extractArbeidAnsattSøknadsdata } from './extractArbeidAnsattSøknadsdata';

export const extractArbeidsgivereArbeidsforholdSøknadsdata = (
    ansatt_arbeidsforhold: ArbeidsforholdFormValues[] = [],
    søknadsperiode: DateRange
): ArbeidsgivereSøknadsdata_depr | undefined => {
    const arbeidsgivereSøknadsdataMap: ArbeidsgivereSøknadsdata_depr = new Map();
    ansatt_arbeidsforhold.forEach((ansattForhold, index) => {
        const ansattArbeidsforhold = extractArbeidAnsattSøknadsdata(ansattForhold, index, søknadsperiode);
        if (ansattArbeidsforhold) {
            arbeidsgivereSøknadsdataMap.set(ansattForhold.arbeidsgiver.id, ansattArbeidsforhold);
        }
    });

    return arbeidsgivereSøknadsdataMap.size > 0 ? arbeidsgivereSøknadsdataMap : undefined;
};
