import { dateToISODate } from '@navikt/sif-common-utils';
import { Sak, SøknadApiData, Søknadsdata, ValgteEndringer } from '@types';
import { getArbeidstidApiDataFromSøknadsdata } from './getArbeidstidApiDataFromSøknadsdata';
import { getDataBruktTilUtledningApiData } from './getDataBruktTilUtledning';
import { getLovbestemtFerieApiDataFromSøknadsdata } from './getLovbestemtFerieApiDataFraSøknadsdata';

export const getApiDataFromSøknadsdata = (
    søknadsdata: Søknadsdata,
    sak: Sak,
    valgteEndringer: ValgteEndringer
): SøknadApiData | undefined => {
    const { id, arbeidstid, lovbestemtFerie, ukjentArbeidsforhold } = søknadsdata;

    if (!arbeidstid && !lovbestemtFerie) {
        return undefined;
    }
    return {
        id,
        språk: '',
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
                      sak.ukjenteArbeidsgivere,
                      ukjentArbeidsforhold
                  )
                : undefined,
            dataBruktTilUtledning: getDataBruktTilUtledningApiData(
                valgteEndringer,
                søknadsdata.ukjentArbeidsforhold,
                søknadsdata.arbeidstid
            ),
        },
    };
};
