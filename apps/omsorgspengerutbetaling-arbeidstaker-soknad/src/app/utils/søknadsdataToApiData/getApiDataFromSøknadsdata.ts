import { attachmentIsUploadedAndIsValidFileFormat } from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { Attachment } from '../../components/formik-file-uploader/useFormikFileUploader';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { SituasjonSøknadsdata, Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getAttachmentURLBackend } from '../attachmentUtilsAuthToken';
import { getMedlemskapApiDataFromSøknadsdata } from './getMedlemskapApiDataFromSøknadsdata';
import { getUtenlansoppholdApiDataFromSøknadsdata } from './getUtenlandsoppholdApiDataFromSøknadsdata';
import { getArbeidsgivereApiDataFromSøknadsdata } from './getArbeidsgivereApiDataFromSøknadsdata';
import { getFosterbarnApiDataFromSøknadsdata } from './getFosterbarnApiDataFromSøknadsdata';
import { getDataBruktTilUtledning } from './getDataBruktTilUtledning';

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
    const { id, fosterbarn, situasjon, fravær, legeerklæring, medlemskap } = søknadsdata;
    if (!id || !fosterbarn || !situasjon || !fravær || !medlemskap || !legeerklæring) {
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
        fosterbarn: getFosterbarnApiDataFromSøknadsdata(fosterbarn),
        arbeidsgivere: getArbeidsgivereApiDataFromSøknadsdata(situasjon, fravær),
        opphold: getUtenlansoppholdApiDataFromSøknadsdata(språk, fravær),
        bosteder: getMedlemskapApiDataFromSøknadsdata(språk, medlemskap),
        vedlegg: [...getVedleggApiData(legeerklæring?.vedlegg), ...getArbeidsforholdDokumenter(situasjon)],
        dataBruktTilUtledningAnnetData: JSON.stringify(getDataBruktTilUtledning(søknadsdata)),
    };
};
