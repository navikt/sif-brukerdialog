import React from 'react';
import { useIntl } from 'react-intl';
import FileUploadErrors from '@navikt/sif-common-core-ds/src/components/file-upload-errors/FileUploadErrors';
import FormikFileUploader from '@navikt/sif-common-core-ds/src/components/formik-file-uploader/FormikFileUploader';
import PictureScanningGuide from '@navikt/sif-common-core-ds/src/components/picture-scanning-guide/PictureScanningGuide';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    attachmentHasBeenUploaded,
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { getTypedFormComponents, ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { validateAll } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';
import api, { ApiEndpoint } from '../../../api/api';
import AdvarselSamletDokumentstørrelse from '../../../components/alerts/AdvarselSamletDokumentstørrelse';
import { AppText, useAppIntl } from '../../../i18n';
import { getAttachmentURLFrontend } from '../../../utils/attachmentUtils';
import { relocateToLoginPage } from '../../../utils/navigationUtils';
import { validateAttachments, ValidateAttachmentsErrors } from '../../../utils/validateAttachments';
import LegeerklæringAvtaleAttachmentList from './LegeerklæringAttachmentList';
import { FormLayout } from '@navikt/sif-common-ui';
import { VStack } from '@navikt/ds-react';

interface Props {
    values: Partial<LegeerklæringFormValues>;
    goBack?: () => void;
    isSubmitting?: boolean;
    andreVedlegg?: Attachment[];
}

export enum LegeerklæringFormFields {
    vedlegg = 'vedlegg',
}

export interface LegeerklæringFormValues {
    [LegeerklæringFormFields.vedlegg]: Attachment[];
}

const { Form } = getTypedFormComponents<LegeerklæringFormFields, LegeerklæringFormValues>();

export const validateDocuments = (attachments: Attachment[]): ValidationResult<ValidationError> => {
    const uploadedAttachments = attachments.filter((attachment) => attachmentHasBeenUploaded(attachment));
    const totalSizeInBytes: number = getTotalSizeOfAttachments(attachments);
    if (totalSizeInBytes > MAX_TOTAL_ATTACHMENT_SIZE_BYTES) {
        return '{ key: AppFieldValidationErrors.samlet_storrelse_for_hoy, keepKeyUnaltered: true }';
    }
    if (uploadedAttachments.length === 0) {
        return '{ key: AppFieldValidationErrors.ingen_dokumenter, keepKeyUnaltered: true }';
    }
    if (uploadedAttachments.length > 100) {
        return '{ key: AppFieldValidationErrors.for_mange_dokumenter, keepKeyUnaltered: true }';
    }
    return undefined;
};

const LegeerklæringForm: React.FunctionComponent<Props> = ({ values, goBack, andreVedlegg = [], isSubmitting }) => {
    const intl = useIntl();
    const { text } = useAppIntl();

    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = React.useState<File[]>([]);

    const hasPendingUploads: boolean = (values.vedlegg || []).find((a: any) => a.pending === true) !== undefined;
    const legeerklæringAttachments = values.vedlegg ? values.vedlegg : [];
    const totalSize = getTotalSizeOfAttachments([...legeerklæringAttachments, ...andreVedlegg]);
    const totalSizeOfAttachmentsOver24Mb = totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={hasPendingUploads || totalSizeOfAttachmentsOver24Mb}
            runDelayedFormValidation={true}
            onBack={goBack}>
            <FormLayout.Questions>
                <SifGuidePanel>
                    <p>
                        <AppText id={'steg.legeerklaering.counsellorpanel.1'} />
                    </p>
                    <p>
                        <AppText id={'steg.legeerklaering.counsellorpanel.2'} />
                    </p>
                </SifGuidePanel>

                <PictureScanningGuide />

                <VStack gap="2">
                    {totalSize <= MAX_TOTAL_ATTACHMENT_SIZE_BYTES ? (
                        <FormikFileUploader
                            attachments={legeerklæringAttachments}
                            name={LegeerklæringFormFields.vedlegg}
                            buttonLabel={text('steg.legeerklaering.vedlegg.knappLabel')}
                            uploadFile={(file) => api.uploadFile(ApiEndpoint.vedlegg, file)}
                            getAttachmentURLFrontend={getAttachmentURLFrontend}
                            onErrorUploadingAttachments={setFilesThatDidntGetUploaded}
                            onFileInputClick={() => {
                                setFilesThatDidntGetUploaded([]);
                            }}
                            validate={(attachments: Attachment[] = []) => {
                                return validateAll<ValidateAttachmentsErrors | ValidationError>([
                                    () => validateAttachments([...attachments, ...andreVedlegg]),
                                ]);
                            }}
                            onUnauthorizedOrForbiddenUpload={relocateToLoginPage}
                        />
                    ) : (
                        <AdvarselSamletDokumentstørrelse />
                    )}

                    <FileUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />

                    <LegeerklæringAvtaleAttachmentList
                        wrapNoAttachmentsInBlock={true}
                        includeDeletionFunctionality={true}
                    />
                </VStack>
            </FormLayout.Questions>
        </Form>
    );
};

export default LegeerklæringForm;
