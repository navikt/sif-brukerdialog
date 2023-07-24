import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdFormValues, ArbeidsforholdSelvstendigFormValues } from '../../types/ArbeidsforholdFormValues';
import { ArbeidsforholdSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { extractArbeidIPeriodeSøknadsdata } from './extractArbeidIPeriodeSøknadsdata';
import { extractNormalarbeidstid } from './extractNormalarbeidstidSøknadsdata';

export const extractArbeidsforholdSøknadsdata = (
    arbeidsforhold: ArbeidsforholdFormValues | ArbeidsforholdSelvstendigFormValues,
    aktivPeriode: DateRange
): ArbeidsforholdSøknadsdata | undefined => {
    const normalarbeidstid = extractNormalarbeidstid(arbeidsforhold.normalarbeidstid);

    if (normalarbeidstid) {
        const arbeidISøknadsperiode = arbeidsforhold.arbeidIPeriode
            ? extractArbeidIPeriodeSøknadsdata(arbeidsforhold.arbeidIPeriode)
            : undefined;

        return {
            aktivPeriode,
            normalarbeidstid,
            arbeidISøknadsperiode,
        };
    }

    return undefined;
};
