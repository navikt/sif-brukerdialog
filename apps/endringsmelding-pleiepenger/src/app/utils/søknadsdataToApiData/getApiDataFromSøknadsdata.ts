import { getCommitShaFromEnv } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { EndringType } from '../../types/EndringType';
import { Sak } from '../../types/Sak';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getArbeidstidApiDataFromSøknadsdata } from './getArbeidstidApiDataFromSøknadsdata';
import { getLovbestemtFerieApiDataFromSøknadsdata } from './getLovbestemtFerieApiDataFraSøknadsdata';

export const getApiDataFromSøknadsdata = (
    søknadsdata: Søknadsdata,
    sak: Sak,
    hvaSkalEndres: EndringType[]
): SøknadApiData | undefined => {
    const { id, arbeidstid, lovbestemtFerie } = søknadsdata;
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
            arbeidstid: arbeidstid ? getArbeidstidApiDataFromSøknadsdata(arbeidstid, sak.arbeidAktiviteter) : undefined,
            dataBruktTilUtledning: {
                soknadDialogCommitSha: getCommitShaFromEnv() || '',
                valgteEndringer: hvaSkalEndres,
            },
        },
    };
};
