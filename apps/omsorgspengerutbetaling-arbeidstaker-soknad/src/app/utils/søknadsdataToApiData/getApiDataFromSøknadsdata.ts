import { Attachment } from '@navikt/sif-common-core-ds/src/types';
import { getAttachmentsApiData } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { SituasjonSøknadsdata, Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getArbeidsgivereApiDataFromSøknadsdata } from './getArbeidsgivereApiDataFromSøknadsdata';
import { getDataBruktTilUtledning } from './getDataBruktTilUtledning';
import { getDineBarnApiDataFromSøknadsdata } from './getDineBarnApiDataFromSøknadsdata';
import { getMedlemskapApiDataFromSøknadsdata } from './getMedlemskapApiDataFromSøknadsdata';
import { getUtenlansoppholdApiDataFromSøknadsdata } from './getUtenlandsoppholdApiDataFromSøknadsdata';

const getArbeidsforholdDokumenter = (situasjon: SituasjonSøknadsdata): Attachment[] => {
    const dokumenter: Attachment[] = [];
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
            ...getAttachmentsApiData(deltBosted?.vedlegg),
            ...getAttachmentsApiData(legeerklæring?.vedlegg),
            ...getAttachmentsApiData(getArbeidsforholdDokumenter(situasjon)),
        ],
        dataBruktTilUtledningAnnetData: JSON.stringify(getDataBruktTilUtledning(søknadsdata)),
    };
};
