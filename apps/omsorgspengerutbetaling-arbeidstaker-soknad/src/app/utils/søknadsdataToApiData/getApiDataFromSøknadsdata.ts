import { attachmentIsUploadedAndIsValidFileFormat } from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { Attachment } from '../../components/formik-file-uploader/useFormikFileUploader';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { SituasjonSøknadsdata, Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getAttachmentURLBackend } from '../attachmentUtilsAuthToken';
import { getMedlemskapApiDataFromSøknadsdata } from './getMedlemskapApiDataFromSøknadsdata';
import { getUtenlansoppholdApiDataFromSøknadsdata } from './getUtenlandsoppholdApiDataFromSøknadsdata';
import { getArbeidsgivereApiDataFromSøknadsdata } from './getArbeidsgivereApiDataFromSøknadsdata';
import { getDataBruktTilUtledning } from './getDataBruktTilUtledning';
import { getDineBarnApiDataFromSøknadsdata } from './getDineBarnApiDataFromSøknadsdata';

const getVedleggApiData = (vedlegg?: Attachment[]): string[] => {
    if (!vedlegg || vedlegg.length === 0) {
        return [];
    }
    return vedlegg.filter(attachmentIsUploadedAndIsValidFileFormat).map(({ url }) => getAttachmentURLBackend(url));
};

const getArbeidsforholdDokumenter = (situasjon: SituasjonSøknadsdata): string[] => {
    const dokumenter: Attachment[] = [];

    Object.values(situasjon).forEach((forhold) => {
        if (forhold.type === 'harHattFraværUtenLønnKonfliktMedArbeidsgiver') {
            dokumenter.push(...forhold.dokumenter);
        }
    });

    return getVedleggApiData(dokumenter);
};

export const getApiDataFromSøknadsdata = (søknadsdata: Søknadsdata): SøknadApiData | undefined => {
    const { id, dineBarn, situasjon, fravær, legeerklæring, medlemskap } = søknadsdata;
    if (!id || !dineBarn || !situasjon || !fravær || !medlemskap || !legeerklæring) {
        return undefined;
    }
    const språk = 'nb';

    return {
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
        vedlegg: [...getVedleggApiData(legeerklæring?.vedlegg), ...getArbeidsforholdDokumenter(situasjon)],
        dataBruktTilUtledningAnnetData: JSON.stringify(getDataBruktTilUtledning(søknadsdata)),
    };
};
