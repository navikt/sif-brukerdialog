import { Alert } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonGeneralEvents, useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import FileDropUploadErrors from '@navikt/sif-common-core-ds/lib/components/file-upload-errors/FileDropUploadErrors';
import FormikFileUploader from '@navikt/sif-common-core-ds/lib/components/formik-file-uploader/FormikFileUploader';
import PictureScanningGuide from '@navikt/sif-common-core-ds/lib/components/picture-scanning-guide/PictureScanningGuide';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import {
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { useFormikContext } from 'formik';
import UploadedDocumentsList from '../../components/uploaded-documents-list/UploadedDocumentsList';
import { Person } from '../../types/Person';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import { navigateToLoginPage } from '../../utils/navigationUtils';
import { validateDocuments } from '../../validation/fieldValidations';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import SøknadTempStorage from '../soknadTempStorage';
import { getAttachmentURLFrontend } from '../../utils/attachmentUtilsAuthToken';
import api from '../../api/api';
import { ApiEndpoint } from '../../types/ApiEndpoint';

interface Props {
    søknadstype: Søknadstype;
    søker: Person;
    soknadId: string;
}

const DokumenterStep: React.FC<Props> = ({ søknadstype, søker, soknadId }: Props) => {
    const intl = useIntl();
    const { values, setFieldValue } = useFormikContext<SoknadFormData>();
    const dokumenter: Attachment[] = React.useMemo(() => {
        return values ? values[SoknadFormField.dokumenter] : [];
    }, [values]);
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = React.useState<File[]>([]);
    const hasPendingUploads: boolean = dokumenter.find((a) => a.pending === true) !== undefined;

    const totalSize = getTotalSizeOfAttachments(values.dokumenter);
    const sizeOver24Mb = totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;
    const ref = React.useRef({ dokumenter });

    const { logUserLoggedOut, logEvent } = useAmplitudeInstance();

    const userLoggedOut = async () => {
        await logUserLoggedOut('Ved opplasting av vedlegg');
        navigateToLoginPage(søknadstype);
    };

    React.useEffect(() => {
        const hasPendingAttachments = dokumenter.find((a) => a.pending === true);
        if (hasPendingAttachments) {
            return;
        }
        if (dokumenter.length !== ref.current.dokumenter.length) {
            const formValues = { ...values, dokumenter: dokumenter };
            setFieldValue(SoknadFormField.dokumenter, dokumenter);
            SøknadTempStorage.update(
                soknadId,
                formValues,
                StepID.DOKUMENTER,
                {
                    søker,
                },
                søknadstype,
            );
        }
        ref.current = {
            dokumenter,
        };
    }, [dokumenter, setFieldValue, soknadId, søker, søknadstype, values]);

    return (
        <SoknadFormStep
            id={StepID.DOKUMENTER}
            søknadstype={søknadstype}
            buttonDisabled={hasPendingUploads || sizeOver24Mb}>
            <SifGuidePanel>
                <p>
                    <FormattedMessage id={'steg.dokumenter.infopanel.1'} />
                </p>
                <p>
                    <FormattedMessage id={'steg.dokumenter.infopanel.2'} />
                </p>
                <p>
                    <FormattedMessage id={'steg.dokumenter.infopanel.3'} />
                </p>
            </SifGuidePanel>

            <Block margin="l">
                <PictureScanningGuide />
            </Block>

            {totalSize <= MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <FormBlock>
                    <FormikFileUploader
                        name={SoknadFormField.dokumenter}
                        buttonLabel={intlHelper(intl, 'steg.dokumenter.vedlegg')}
                        onErrorUploadingAttachments={setFilesThatDidntGetUploaded}
                        onFileInputClick={() => {
                            setFilesThatDidntGetUploaded([]);
                        }}
                        attachments={dokumenter}
                        uploadFile={(file) => api.uploadFile(ApiEndpoint.VEDLEGG, file)}
                        getAttachmentURLFrontend={getAttachmentURLFrontend}
                        onUnauthorizedOrForbiddenUpload={userLoggedOut}
                        validate={validateDocuments}
                        onFilesUploaded={(antall, antallFeilet) => {
                            logEvent(SIFCommonGeneralEvents.vedleggLastetOpp, { antall, antallFeilet });
                        }}
                    />
                </FormBlock>
            )}

            {totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <Block margin="l">
                    <Alert variant="warning">
                        <FormattedMessage id={'steg.dokumenter.advarsel.totalstørrelse'} />
                    </Alert>
                </Block>
            )}

            <Block margin="m">
                <FileDropUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />
            </Block>
            <Block margin="l">
                <UploadedDocumentsList
                    wrapNoAttachmentsInBox={true}
                    includeDeletionFunctionality={true}
                    onFileDeleted={() => {
                        logEvent(SIFCommonGeneralEvents.vedleggSlettet);
                    }}
                />
            </Block>
        </SoknadFormStep>
    );
};

export default DokumenterStep;
