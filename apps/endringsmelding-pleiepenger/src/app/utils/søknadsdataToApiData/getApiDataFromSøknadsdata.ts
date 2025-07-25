import { dateToISODate } from '@navikt/sif-common-utils';
import { Arbeidsgiver, Sak, SøknadApiData, Søknadsdata, ValgteEndringer } from '@types';
import { getArbeidstidApiDataFromSøknadsdata } from './getArbeidstidApiDataFromSøknadsdata';
import { getDataBruktTilUtledningAnnetDataApiData, getDataBruktTilUtledningApiData } from './getDataBruktTilUtledning';
import { getLovbestemtFerieApiDataFromSøknadsdata } from './getLovbestemtFerieApiDataFraSøknadsdata';
import { Locale } from '@navikt/sif-common-core-ds/src/types';

export const getApiDataFromSøknadsdata = (
    søkerNorskIdent: string,
    søknadsdata: Søknadsdata,
    sak: Sak,
    valgteEndringer: ValgteEndringer,
    arbeidsgivere: Arbeidsgiver[],
    locale: Locale,
): SøknadApiData | undefined => {
    const { id, arbeidstid, lovbestemtFerie, ukjentArbeidsforhold } = søknadsdata;

    if (!arbeidstid && !lovbestemtFerie) {
        return undefined;
    }
    return {
        søkerNorskIdent,
        id,
        språk: locale,
        harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true ? true : false,
        harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger === true ? true : false,
        ytelse: {
            type: 'PLEIEPENGER_SYKT_BARN',
            barn: {
                fødselsdato: sak.barn.fødselsdato ? dateToISODate(sak.barn.fødselsdato) : undefined,
                norskIdentitetsnummer: sak.barn.identitetsnummer,
            },
            lovbestemtFerie: lovbestemtFerie ? getLovbestemtFerieApiDataFromSøknadsdata(lovbestemtFerie) : undefined,
            arbeidstid: arbeidstid
                ? getArbeidstidApiDataFromSøknadsdata(
                      sak.søknadsperioder,
                      arbeidstid.arbeidsaktivitet,
                      sak.arbeidsaktiviteter,
                      sak.arbeidsgivereIkkeISak,
                      ukjentArbeidsforhold,
                  )
                : undefined,
            dataBruktTilUtledning: getDataBruktTilUtledningApiData(
                søknadsdata.ukjentArbeidsforhold,
                søknadsdata.arbeidstid,
                arbeidsgivere,
            ),
            annetDataBruktTilUtledning: {
                annetData: JSON.stringify(getDataBruktTilUtledningAnnetDataApiData(valgteEndringer)),
            },
        },
    };
};
