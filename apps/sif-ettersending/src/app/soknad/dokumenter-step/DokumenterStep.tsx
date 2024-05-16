import { Alert } from '@navikt/ds-react';
import React from 'react';

import { SIFCommonGeneralEvents, useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import FileDropUploadErrors from '@navikt/sif-common-core-ds/src/components/file-upload-errors/FileDropUploadErrors';
import FormikFileUploader from '@navikt/sif-common-core-ds/src/components/formik-file-uploader/FormikFileUploader';
import PictureScanningGuide from '@navikt/sif-common-core-ds/src/components/picture-scanning-guide/PictureScanningGuide';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { useFormikContext } from 'formik';
import api from '../../api/api';
import UploadedDocumentsList from '../../components/uploaded-documents-list/UploadedDocumentsList';
import { AppText, useAppIntl } from '../../i18n';
import { ApiEndpoint } from '../../types/ApiEndpoint';
import { Person } from '../../types/Person';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import { getAttachmentURLFrontend } from '../../utils/attachmentUtilsAuthToken';
import { navigateToLoginPage } from '../../utils/navigationUtils';
import { validateDocuments } from '../../validation/fieldValidations';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import SøknadTempStorage from '../soknadTempStorage';

interface Props {
    søknadstype: Søknadstype;
    søker: Person;
    soknadId: string;
}

const DokumenterStep: React.FC<Props> = ({ søknadstype, søker, soknadId }: Props) => {
    const { text } = useAppIntl();
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
                    <AppText id={'steg.dokumenter.infopanel.1'} />
                </p>
                <p>
                    <AppText id={'steg.dokumenter.infopanel.2'} />
                </p>
                <p>
                    <AppText id={'steg.dokumenter.infopanel.3'} />
                </p>
            </SifGuidePanel>

            <Block margin="l">
                <PictureScanningGuide />
            </Block>

            {totalSize <= MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <FormBlock>
                    <FormikFileUploader
                        name={SoknadFormField.dokumenter}
                        buttonLabel={text('steg.dokumenter.vedlegg')}
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
                        <AppText id={'steg.dokumenter.advarsel.totalstørrelse'} />
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
