import { Alert, Link } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import FileUploadErrors from '@navikt/sif-common-core-ds/src/components/file-upload-errors/FileUploadErrors';
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
import { ApiEndpoint } from '../../../api/api';
import FormikFileUploader from '../../../components/formik-file-uploader/FormikFileUploader';
import { AppText, useAppIntl } from '../../../i18n';
import { relocateToLoginPage } from '../../../utils/navigationUtils';
import { validateAttachments, ValidateAttachmentsErrors } from '../../../utils/validateAttachments';
import DeltBostedAvtaleAttachmentList from './DeltBostedAttachmentList';
import getLenker from '../../../lenker';

interface Props {
    values: Partial<DeltBostedFormValues>;
    goBack?: () => void;
    isSubmitting?: boolean;
    andreVedlegg?: Attachment[];
}

export enum DeltBostedFormFields {
    vedlegg = 'vedlegg',
}

export interface DeltBostedFormValues {
    [DeltBostedFormFields.vedlegg]: Attachment[];
}

const { Form } = getTypedFormComponents<DeltBostedFormFields, DeltBostedFormValues>();

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

const DeltBostedForm: React.FunctionComponent<Props> = ({ values, goBack, andreVedlegg = [], isSubmitting }) => {
    const { text, intl } = useAppIntl();
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = React.useState<File[]>([]);

    const hasPendingUploads: boolean = (values.vedlegg || []).find((a: any) => a.pending === true) !== undefined;
    const attachments = values.vedlegg ? values.vedlegg : [];
    const totalSize = getTotalSizeOfAttachments([...attachments, ...andreVedlegg]);
    const totalSizeOfAttachmentsOver24Mb = totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={hasPendingUploads || totalSizeOfAttachmentsOver24Mb}
            runDelayedFormValidation={true}
            onBack={goBack}>
            <Block padBottom="xl">
                <SifGuidePanel>
                    <p style={{ marginTop: 0 }}>
                        <AppText id={'step.deltBosted.info.1'} />
                    </p>
                    <p>
                        <AppText
                            id={'step.deltBosted.info.2'}
                            values={{
                                Lenke: (children) => (
                                    <Link target={'_blank'} href={getLenker(intl.locale).deltFastBosted}>
                                        {children}
                                    </Link>
                                ),
                            }}
                        />
                    </p>
                    <p>
                        <AppText id={'step.deltBosted.info.3'} />
                    </p>
                    <p>
                        <AppText id={'step.deltBosted.info.4'} />
                    </p>
                </SifGuidePanel>
            </Block>
            <Block margin={'l'}>
                <PictureScanningGuide />
            </Block>
            {totalSize <= MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <FormBlock>
                    <FormikFileUploader
                        attachments={attachments}
                        name={DeltBostedFormFields.vedlegg}
                        buttonLabel={text('step.deltBosted.uploadBtn')}
                        apiEndpoint={ApiEndpoint.vedlegg}
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
                </FormBlock>
            )}

            {totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <Block margin={'l'}>
                    <Alert variant="warning">
                        <AppText id={'dokumenter.advarsel.totalstørrelse.1'} />
                        <Link
                            target={'_blank'}
                            rel={'noopener noreferrer'}
                            href={
                                'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-35.01/ettersendelse'
                            }>
                            <AppText id="dokumenter.advarsel.totalstørrelse.2" />
                        </Link>
                    </Alert>
                </Block>
            )}
            <Block margin={'l'}>
                <FileUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />
            </Block>
            <div data-testid="delt-bosted-liste">
                <DeltBostedAvtaleAttachmentList wrapNoAttachmentsInBlock={true} includeDeletionFunctionality={true} />
            </div>
        </Form>
    );
};

export default DeltBostedForm;
