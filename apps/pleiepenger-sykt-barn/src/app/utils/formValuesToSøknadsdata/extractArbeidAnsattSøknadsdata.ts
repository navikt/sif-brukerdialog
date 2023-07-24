import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdFormValues } from '../../types/ArbeidsforholdFormValues';
import { ArbeidAnsattSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getPeriodeSomAnsattInnenforPeriode } from '../ansattUtils';
import { extractArbeidsforholdSøknadsdata } from './extractArbeidsforholdSøknadsdata';

export const extractArbeidAnsattSøknadsdata = (
    arbeidsforhold: ArbeidsforholdFormValues,
    index: number,
    søknadsperiode: DateRange
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
    const aktivPeriode = getPeriodeSomAnsattInnenforPeriode(søknadsperiode, arbeidsforhold.arbeidsgiver);
    const arbeidsforholdSøknadsdata = extractArbeidsforholdSøknadsdata(arbeidsforhold, aktivPeriode);

    if (arbeidsforholdSøknadsdata) {
        if (erAnsatt === false && sluttetFørSøknadsperiode === false) {
            return {
                index,
                type: 'sluttetISøknadsperiode',
                erAnsattISøknadsperiode: true,
                arbeidsgiver: arbeidsforhold.arbeidsgiver,
                arbeidsforhold: arbeidsforholdSøknadsdata,
                periodeSomAnsattISøknadsperiode: aktivPeriode,
            };
        }
        return {
            index,
            type: 'pågående',
            erAnsattISøknadsperiode: true,
            arbeidsgiver: arbeidsforhold.arbeidsgiver,
            arbeidsforhold: arbeidsforholdSøknadsdata,
            periodeSomAnsattISøknadsperiode: aktivPeriode,
        };
    }
    return undefined;
};
