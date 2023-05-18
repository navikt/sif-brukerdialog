import { getCommitShaFromEnv } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { dateToISODate } from '@navikt/sif-common-utils';
import { EndringType, Sak, SøknadApiData, Søknadsdata } from '@types';
import { getArbeidstidApiDataFromSøknadsdata } from './getArbeidstidApiDataFromSøknadsdata';
import { getLovbestemtFerieApiDataFromSøknadsdata } from './getLovbestemtFerieApiDataFraSøknadsdata';

export const getApiDataFromSøknadsdata = (
    søknadsdata: Søknadsdata,
    sak: Sak,
    hvaSkalEndres: EndringType[]
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
            dataBruktTilUtledning: {
                soknadDialogCommitSha: getCommitShaFromEnv() || '',
                valgteEndringer: hvaSkalEndres,
                ukjentArbeidsforhold: søknadsdata.ukjentArbeidsforhold?.arbeidsforhold,
            },
        },
    };
};
