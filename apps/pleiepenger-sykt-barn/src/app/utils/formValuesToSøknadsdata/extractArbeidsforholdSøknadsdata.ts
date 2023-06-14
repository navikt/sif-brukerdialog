import {
    ArbeidsforholdFormValues,
    ArbeidsforholdFrilanserFormValues,
    ArbeidsforholdSelvstendigFormValues,
} from '../../types/ArbeidsforholdFormValues';
import { ArbeidsforholdSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import {
    extractArbeidIPeriodeFrilanserSøknadsdata,
    extractArbeidIPeriodeSøknadsdata,
} from './extractArbeidIPeriodeSøknadsdata';
import { extractNormalarbeidstid } from './extractNormalarbeidstidSøknadsdata';

export const extractArbeidsforholdSøknadsdata = (
    arbeidsforhold: ArbeidsforholdFormValues | ArbeidsforholdSelvstendigFormValues
): ArbeidsforholdSøknadsdata | undefined => {
    const normalarbeidstid = extractNormalarbeidstid(arbeidsforhold.normalarbeidstid);

    if (normalarbeidstid) {
        const arbeidISøknadsperiode = arbeidsforhold.arbeidIPeriode
            ? extractArbeidIPeriodeSøknadsdata(arbeidsforhold.arbeidIPeriode)
            : undefined;

        return {
            normalarbeidstid,
            arbeidISøknadsperiode,
        };
    }

    return undefined;
};

export const extractArbeidsforholdFrilansSøknadsdata = (
    arbeidsforhold: ArbeidsforholdFrilanserFormValues
): ArbeidsforholdSøknadsdata | undefined => {
    const normalarbeidstid = extractNormalarbeidstid(arbeidsforhold.normalarbeidstid);

    if (normalarbeidstid) {
        const arbeidISøknadsperiode = arbeidsforhold.arbeidIPeriode
            ? extractArbeidIPeriodeFrilanserSøknadsdata(arbeidsforhold.arbeidIPeriode)
            : undefined;

        return {
            normalarbeidstid,
            arbeidISøknadsperiode,
        };
    }

    return undefined;
};
