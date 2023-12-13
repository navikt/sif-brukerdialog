import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { mapVirksomhetToVirksomhetApiData } from '@navikt/sif-common-forms-ds/lib';
import { SelvstendigApiData } from '../../types/søknad-api-data/SøknadApiData';
import { ArbeidssituasjonSelvstendigSøknadsdata } from '../../types/søknadsdata/ArbeidssituasjonSelvstendigSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidsforholdApiDataFromSøknadsdata';
import { getNormalarbeidstidApiDataFromSøknadsdata } from './getNormalarbeidstidApiDataFromSøknadsdata';

export const getSelvstendigApiDataFromSøknadsdata = (
    arbeidssituasjon: ArbeidssituasjonSelvstendigSøknadsdata | undefined,
    arbeidIPeriode: ArbeidIPeriodeSøknadsdata | undefined,
    locale: Locale = 'nb',
): SelvstendigApiData => {
    if (!arbeidssituasjon) {
        throw 'getSelvstendigApiDataFromSøknadsdata: arbeidssituasjon is undefined';
    }

    if (arbeidssituasjon.erSN === false) {
        return { harInntektSomSelvstendig: false };
    }

    if (!arbeidIPeriode) {
        throw 'getSelvstendigApiDataFromSøknadsdata: arbeidstid is undefined';
    }

    const { harFlereVirksomheter, normalarbeidstid, virksomhet } = arbeidssituasjon;
    return {
        harInntektSomSelvstendig: true,
        arbeidsforhold: {
            normalarbeidstid: getNormalarbeidstidApiDataFromSøknadsdata(normalarbeidstid),
            arbeidIPeriode: getArbeidIPeriodeApiDataFromSøknadsdata(arbeidIPeriode),
        },
        virksomhet: mapVirksomhetToVirksomhetApiData(locale, virksomhet, harFlereVirksomheter),
    };
};
