import { Alert, Link } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FileUploadErrors from '@navikt/sif-common-core-ds/lib/components/file-upload-errors/FileUploadErrors';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import PictureScanningGuide from '@navikt/sif-common-core-ds/lib/components/picture-scanning-guide/PictureScanningGuide';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/lib/types/Attachment';
import {
    attachmentHasBeenUploaded,
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/lib/utils/attachmentUtils';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents, ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/lib';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { validateAll } from '@navikt/sif-common-formik-ds/lib/validation/validationUtils';
import { ApiEndpoint } from '../../../api/api';
import FormikFileUploader from '../../../components/formik-file-uploader/FormikFileUploader';
import { relocateToLoginPage } from '../../../utils/navigationUtils';
import { validateAttachments, ValidateAttachmentsErrors } from '../../../utils/validateAttachments';
import getLenker from '../../../lenker';
import SmittevernDokumenterAttachmentList from './SmittevernDokumenterAttachmentList';

interface Props {
    values: Partial<SmittevernDokumenterFormValues>;
    goBack?: () => void;
    isSubmitting?: boolean;
    andreVedlegg?: Attachment[];
}

export enum SmittevernDokumenterFormFields {
    vedlegg = 'vedlegg',
}

export interface SmittevernDokumenterFormValues {
    [SmittevernDokumenterFormFields.vedlegg]: Attachment[];
}

const { Form } = getTypedFormComponents<SmittevernDokumenterFormFields, SmittevernDokumenterFormValues>();

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

const SmittevernDokumenterForm: React.FC<Props> = ({ values, goBack, andreVedlegg = [], isSubmitting }) => {
    const intl = useIntl();
    const [filesThatDidntGetUploaded, setFilesThatDidntGetUploaded] = React.useState<File[]>([]);

    const hasPendingUploads: boolean = (values.vedlegg || []).find((a: any) => a.pending === true) !== undefined;
    const smittevernDokumenterAttachments = values.vedlegg ? values.vedlegg : [];
    const totalSize = getTotalSizeOfAttachments([...smittevernDokumenterAttachments, ...andreVedlegg]);
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
                    <Block padBottom={'l'}>
                        <FormattedMessage id="steg.vedlegg_smittevernhensyn.info.1" />
                    </Block>
                    <Block padBottom={'l'}>
                        <FormattedMessage id="steg.vedlegg_smittevernhensyn.info.2" />{' '}
                        <Link href={getLenker(intl.locale).veiledningEttersendelse} target="_blank">
                            <FormattedMessage id="steg.vedlegg_smittevernhensyn.info.3" />
                        </Link>
                        <FormattedMessage id="steg.vedlegg_smittevernhensyn.info.4" />
                    </Block>
                </SifGuidePanel>
            </Block>
            <Block margin={'l'}>
                <PictureScanningGuide />
            </Block>
            {totalSize <= MAX_TOTAL_ATTACHMENT_SIZE_BYTES && (
                <FormBlock>
                    <FormikFileUploader
                        attachments={smittevernDokumenterAttachments}
                        name={SmittevernDokumenterFormFields.vedlegg}
                        buttonLabel={intlHelper(intl, 'steg.vedlegg_smittevernhensyn.knappLabel')}
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
                        <FormattedMessage id={'dokumenter.advarsel.totalstørrelse.1'} />
                        <Link
                            target={'_blank'}
                            rel={'noopener noreferrer'}
                            href={
                                'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-35.01/ettersendelse'
                            }>
                            <FormattedMessage id={'dokumenter.advarsel.totalstørrelse.2'} />
                        </Link>
                    </Alert>
                </Block>
            )}
            <Block margin={'l'}>
                <FileUploadErrors filesThatDidntGetUploaded={filesThatDidntGetUploaded} />
            </Block>
            <div data-testid="smittevernDokumenter-liste">
                <SmittevernDokumenterAttachmentList
                    wrapNoAttachmentsInBlock={true}
                    includeDeletionFunctionality={true}
                />
            </div>
        </Form>
    );
};

export default SmittevernDokumenterForm;
