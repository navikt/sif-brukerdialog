import { Link } from '@navikt/ds-react';
import React from 'react';
import { deleteVedlegg, getAttachmentURLFrontend, uploadVedlegg } from '@navikt/sif-common';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    attachmentHasBeenUploaded,
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { getTypedFormComponents, ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { relocateToLoginPage } from '../../../utils/navigationUtils';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds/src';

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
            <FormikAttachmentForm
                fieldName={DeltBostedFormFields.vedlegg}
                attachments={attachments}
                includeGuide={true}
                deleteFile={deleteVedlegg}
                labels={{
                    addLabel: text('step.deltBosted.uploadBtn'),
                    noAttachmentsText: text('vedleggsliste.ingenAvtaleLastetOpp'),
                }}
                uploadFile={uploadVedlegg}
                uploadLaterURL={getLenker(intl.locale).ettersending}
                getAttachmentURLFrontend={getAttachmentURLFrontend}
                onUnauthorizedOrForbiddenUpload={relocateToLoginPage}
                otherAttachments={andreVedlegg}
            />
        </Form>
    );
};

export default DeltBostedForm;
