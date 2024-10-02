import React from 'react';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds/src';
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
                        <AppText id={'step.legeerklæring.counsellorpanel.1'} />
                    </p>
                    <p>
                        <AppText id={'step.legeerklæring.counsellorpanel.2'} />
                    </p>
                </SifGuidePanel>
            </Block>

            <FormikAttachmentForm
                fieldName={LegeerklæringFormFields.vedlegg}
                attachments={attachments}
                includeGuide={true}
                labels={{
                    addLabel: text('step.legeerklæring.uploadBtn'),
                    noAttachmentsText: text('vedleggsliste.ingenLegeerklæringLastetOpp'),
                }}
                validation={{ required: false }}
                uploadLaterURL={getLenker(intl.locale).ettersending}
                onUnauthorizedOrForbiddenUpload={relocateToLoginPage}
                otherAttachments={andreVedlegg}
            />
        </Form>
    );
};

export default LegeerklæringForm;
