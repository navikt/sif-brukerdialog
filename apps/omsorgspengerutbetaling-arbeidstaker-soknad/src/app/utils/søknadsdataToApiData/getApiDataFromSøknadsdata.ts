import { getVedleggApiData } from '@navikt/sif-common-core-ds/src';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { SituasjonSøknadsdata, Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getArbeidsgivereApiDataFromSøknadsdata } from './getArbeidsgivereApiDataFromSøknadsdata';
import { getDataBruktTilUtledning } from './getDataBruktTilUtledning';
import { getDineBarnApiDataFromSøknadsdata } from './getDineBarnApiDataFromSøknadsdata';
import { getMedlemskapApiDataFromSøknadsdata } from './getMedlemskapApiDataFromSøknadsdata';
import { getUtenlansoppholdApiDataFromSøknadsdata } from './getUtenlandsoppholdApiDataFromSøknadsdata';

const getArbeidsforholdDokumenter = (situasjon: SituasjonSøknadsdata): Vedlegg[] => {
    const dokumenter: Vedlegg[] = [];
    Object.values(situasjon).forEach((forhold) => {
        if (forhold.type === 'harHattFraværUtenLønnKonfliktMedArbeidsgiver') {
            dokumenter.push(...forhold.dokumenter);
        }
    });
    return dokumenter;
};

export const getApiDataFromSøknadsdata = (
    søkerNorskIdent: string,
    søknadsdata: Søknadsdata,
): SøknadApiData | undefined => {
    const { id, dineBarn, deltBosted, situasjon, fravær, legeerklæring, medlemskap } = søknadsdata;
    if (!id || !dineBarn || !situasjon || !fravær || !medlemskap || !legeerklæring) {
        return undefined;
    }
    const språk = 'nb';

    return {
        søkerNorskIdent,
        id,
        språk,
        bekreftelser: {
            harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true,
            harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger === true,
        },
        dineBarn: getDineBarnApiDataFromSøknadsdata(dineBarn),
        arbeidsgivere: getArbeidsgivereApiDataFromSøknadsdata(situasjon, fravær),
        opphold: getUtenlansoppholdApiDataFromSøknadsdata(språk, fravær),
        bosteder: getMedlemskapApiDataFromSøknadsdata(språk, medlemskap),
        vedlegg: [
            ...getVedleggApiData(deltBosted?.vedlegg),
            ...getVedleggApiData(legeerklæring?.vedlegg),
            ...getVedleggApiData(getArbeidsforholdDokumenter(situasjon)),
        ],
        dataBruktTilUtledningAnnetData: JSON.stringify(getDataBruktTilUtledning(søknadsdata)),
    };
};
