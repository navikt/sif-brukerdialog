import { Locale } from '@navikt/sif-common-core-ds/lib/types/Locale';
import { mapVirksomhetToVirksomhetApiData } from '@navikt/sif-common-forms-ds/lib';
import { SelvstendigApiData } from '../../types/søknad-api-data/SøknadApiData';
import { ArbeidSelvstendigSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getArbeidsforholdApiDataFromSøknadsdata } from './getArbeidsforholdApiDataFromSøknadsdata';

export const getSelvstendigApiDataFromSøknadsdata = (
    arbeidSelvstendigSøknadsdata: ArbeidSelvstendigSøknadsdata | undefined,
    locale: Locale = 'nb'
): SelvstendigApiData => {
    if (!arbeidSelvstendigSøknadsdata) {
        return { harInntektSomSelvstendig: false };
    }
    switch (arbeidSelvstendigSøknadsdata.type) {
        case 'erIkkeSN':
            return {
                harInntektSomSelvstendig: false,
            };
        case 'erSN':
            const { arbeidsforhold, harFlereVirksomheter, virksomhet } = arbeidSelvstendigSøknadsdata;
            return {
                harInntektSomSelvstendig: true,
                arbeidsforhold: getArbeidsforholdApiDataFromSøknadsdata(arbeidsforhold),
                virksomhet: mapVirksomhetToVirksomhetApiData(locale, virksomhet, harFlereVirksomheter),
            };
    }
};
