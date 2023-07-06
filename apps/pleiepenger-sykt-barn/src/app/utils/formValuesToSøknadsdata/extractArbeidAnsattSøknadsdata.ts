import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { ArbeidsforholdFormValues } from '../../types/ArbeidsforholdFormValues';
import { ArbeidAnsattSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { extractArbeidsforholdSøknadsdata } from './extractArbeidsforholdSøknadsdata';

export const extractArbeidAnsattSøknadsdata = (
    arbeidsforhold: ArbeidsforholdFormValues,
    index: number
): ArbeidAnsattSøknadsdata | undefined => {
    /** Bruker har ikke besvart denne informasjonen enda */
    if (arbeidsforhold.erAnsatt === undefined) {
        return undefined;
    }
    const erAnsatt = arbeidsforhold.erAnsatt === YesOrNo.YES;
    const sluttetFørSøknadsperiode = erAnsatt === false && arbeidsforhold.sluttetFørSøknadsperiode === YesOrNo.YES;

    if (sluttetFørSøknadsperiode) {
        return {
            index,
            type: 'sluttetFørSøknadsperiode',
            erAnsattISøknadsperiode: false,
            arbeidsgiver: arbeidsforhold.arbeidsgiver,
        };
    }
    const arbeidsforholdSøknadsdata = extractArbeidsforholdSøknadsdata(arbeidsforhold);
    if (arbeidsforholdSøknadsdata) {
        if (erAnsatt === false && sluttetFørSøknadsperiode === false) {
            return {
                index,
                type: 'sluttetISøknadsperiode',
                erAnsattISøknadsperiode: true,
                arbeidsgiver: arbeidsforhold.arbeidsgiver,
                arbeidsforhold: arbeidsforholdSøknadsdata,
            };
        }
        return {
            index,
            type: 'pågående',
            erAnsattISøknadsperiode: true,
            arbeidsgiver: arbeidsforhold.arbeidsgiver,
            arbeidsforhold: arbeidsforholdSøknadsdata,
        };
    }
    return undefined;
};
