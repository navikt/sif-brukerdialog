import { attachmentIsUploadedAndIsValidFileFormat } from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { Attachment } from '../../components/formik-file-uploader/useFormikFileUploader';
import { includeDeltBostedStep } from '../../søknad/søknadStepConfig';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getAttachmentURLBackend } from '../attachmentUtilsAuthToken';
import { getOmBarnetApiDataFromSøknadsdata } from './getOmBarnetApiDataFromSøknadsdata';

const getVedleggApiData = (vedlegg?: Attachment[]): string[] => {
    if (!vedlegg || vedlegg.length === 0) {
        return [];
    }
    return vedlegg.filter(attachmentIsUploadedAndIsValidFileFormat).map(({ url }) => getAttachmentURLBackend(url));
};

export const getApiDataFromSøknadsdata = (søknadsdata: Søknadsdata): SøknadApiData | undefined => {
    const { omBarnet } = søknadsdata;
    if (!omBarnet) {
        return undefined;
    }

    const inkluderDeltBosted = includeDeltBostedStep(søknadsdata.omBarnet);

    return {
        språk: 'nb',
        harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true,
        harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger === true,
        ...getOmBarnetApiDataFromSøknadsdata(omBarnet),
        legeerklæring: getVedleggApiData(søknadsdata.legeerklaering?.vedlegg),
        samværsavtale: inkluderDeltBosted ? getVedleggApiData(søknadsdata.deltBosted?.vedlegg) : undefined,
    };
};
