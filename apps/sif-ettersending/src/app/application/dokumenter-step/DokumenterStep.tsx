import { Alert, BodyLong, GuidePanel } from '@navikt/ds-react';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/components/layout/block/Block';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import {
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core/lib/utils/attachmentUtils';
import intlHelper from '@navikt/sif-common-core-ds/utils/intlUtils';
import { useFormikContext } from 'formik';
import FormikFileUploader from '../../components/formik-file-uploader/FormikFileUploader';
import UploadedDocumentsList from '../../components/uploaded-documents-list/UploadedDocumentsList';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import PictureScanningGuide from '@navikt/sif-common-core-ds/content/picture-scanning-guide/PictureScanningGuide';
import { ApplicationFormData, ApplicationFormField } from '../../types/ApplicationFormData';
import { navigateToLoginPage } from '../../utils/navigationUtils';
import { validateDocuments } from '../../validation/fieldValidations';
import ApplicationStep from '../ApplicationStep';
import FileUploadErrors from '@navikt/sif-common-core-ds/components/file-upload-errors/FileUploadErrors';

const DokumenterStep = ({ onValidSubmit, søknadstype }: StepConfigProps) => {
    const intl = useIntl();
    const { values } = useFormikContext<ApplicationFormData>();
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = React.useState<File[]>([]);
    const hasPendingUploads: boolean = (values.dokumenter || []).find((a) => a.pending === true) !== undefined;
    const totalSize = getTotalSizeOfAttachments(values.dokumenter);
    const sizeOver24Mb = totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;

    const { logUserLoggedOut } = useAmplitudeInstance();

    const userLoggedOut = async () => {
        await logUserLoggedOut('Ved opplasting av vedlegg');
        navigateToLoginPage(søknadstype);
    };

    return (
        <ApplicationStep
            id={StepID.DOKUMENTER}
            onValidFormSubmit={onValidSubmit}
            useValidationErrorSummary={true}
            buttonDisabled={hasPendingUploads || sizeOver24Mb}>
            <GuidePanel>
                <BodyLong as="div">
                    <p>
                        <FormattedMessage id={'steg.dokumenter.infopanel.1'} />
                    </p>
                    <p>
                        <FormattedMessage id={'steg.dokumenter.infopanel.2'} />
                    </p>
                    <p>
                        <FormattedMessage id={'steg.dokumenter.infopanel.3'} />
                    </p>
                </BodyLong>
            </GuidePanel>

            <Block margin="l">
                <PictureScanningGuide />
            </Block>

            {totalSize <= MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <FormBlock>
                    <FormikFileUploader
                        søknadstype={søknadstype}
                        groupName={ApplicationFormField.dokumenterGruppe}
                        name={ApplicationFormField.dokumenter}
                        buttonLabel={intlHelper(intl, 'steg.dokumenter.vedlegg')}
                        onErrorUploadingAttachments={setFilesThatDidntGetUploaded}
                        onFileInputClick={() => {
                            setFilesThatDidntGetUploaded([]);
                        }}
                        onUnauthorizedOrForbiddenUpload={userLoggedOut}
                        validate={validateDocuments}
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
                <FileUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />
            </Block>
            <Block margin="l">
                <UploadedDocumentsList wrapNoAttachmentsInBox={true} includeDeletionFunctionality={true} />
            </Block>
        </ApplicationStep>
    );
};

export default DokumenterStep;
