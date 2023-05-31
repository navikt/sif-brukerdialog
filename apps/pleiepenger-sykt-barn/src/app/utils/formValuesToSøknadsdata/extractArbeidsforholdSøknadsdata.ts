import { ArbeidsforholdType } from '../../local-sif-common-pleiepenger';
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
    arbeidsforhold: ArbeidsforholdFormValues | ArbeidsforholdSelvstendigFormValues,
    arbeidsforholdType: ArbeidsforholdType
): ArbeidsforholdSøknadsdata | undefined => {
    const normalarbeidstid = extractNormalarbeidstid(arbeidsforhold.normalarbeidstid, arbeidsforholdType);

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
    arbeidsforhold: ArbeidsforholdFrilanserFormValues,
    arbeidsforholdType: ArbeidsforholdType
): ArbeidsforholdSøknadsdata | undefined => {
    const normalarbeidstid = extractNormalarbeidstid(arbeidsforhold.normalarbeidstid, arbeidsforholdType);

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
