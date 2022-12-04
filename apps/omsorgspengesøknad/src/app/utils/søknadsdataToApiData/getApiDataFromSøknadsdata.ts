import { attachmentIsUploadedAndIsValidFileFormat } from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import { Attachment } from '../../components/formik-file-uploader/useFormikFileUploader';
import { getSøknadStepConfigForStep } from '../../søknad/søknadStepConfig';
import { StepId } from '../../types/StepId';
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

    const inkluderDeltBosted = getSøknadStepConfigForStep(søknadsdata, StepId.DELT_BOSTED) !== undefined;

    return {
        språk: 'nb',
        harForståttRettigheterOgPlikter: søknadsdata.harForståttRettigheterOgPlikter === true,
        harBekreftetOpplysninger: søknadsdata.harForståttRettigheterOgPlikter === true,
        ...getOmBarnetApiDataFromSøknadsdata(omBarnet),
        legeerklæring: getVedleggApiData(søknadsdata.legeerklæring?.vedlegg),
        samværsavtale: inkluderDeltBosted ? getVedleggApiData(søknadsdata.deltBosted?.vedlegg) : undefined,
        // samværsavtale:
        //     sammeAdresse === YesOrNo.NO &&
        //     søkersRelasjonTilBarnet !== SøkersRelasjonTilBarnet.FOSTERFORELDER &&
        //     samværsavtale &&
        //     samværsavtale.length > 0
        //         ? samværsavtale
        //               .filter((attachment) => !attachmentUploadHasFailed(attachment))
        //               .map(({ url }) => getAttachmentURLBackend(url))
        //         : undefined,
    };
};
