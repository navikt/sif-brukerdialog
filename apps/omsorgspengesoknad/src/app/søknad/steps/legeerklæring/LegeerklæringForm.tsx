import React from 'react';
import { useIntl } from 'react-intl';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    attachmentHasBeenUploaded,
    getTotalSizeOfAttachments,
    hasExceededMaxTotalSizeOfAttachments,
    hasPendingAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { getTypedFormComponents, ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { FormLayout } from '@navikt/sif-common-ui';
import api, { ApiEndpoint } from '../../../api/api';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { getAttachmentURLFrontend } from '../../../utils/attachmentUtils';
import { relocateToLoginPage } from '../../../utils/navigationUtils';

interface Props {
    legeerklæringer?: Attachment[];
    isSubmitting?: boolean;
    andreVedlegg?: Attachment[];
    goBack?: () => void;
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

const LegeerklæringForm: React.FunctionComponent<Props> = ({
    legeerklæringer = [],
    andreVedlegg = [],
    isSubmitting,
    goBack,
}) => {
    const intl = useIntl();
    const { text } = useAppIntl();

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={
                hasPendingAttachments(legeerklæringer) ||
                hasExceededMaxTotalSizeOfAttachments([...legeerklæringer, ...andreVedlegg])
            }
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

                <FormikAttachmentForm
                    fieldName={LegeerklæringFormFields.vedlegg}
                    includeGuide={true}
                    attachments={legeerklæringer}
                    otherAttachments={andreVedlegg}
                    uploadLaterURL={getLenker(intl.locale).ettersend}
                    onUnauthorizedOrForbiddenUpload={relocateToLoginPage}
                    uploadFile={(file) => api.uploadFile(ApiEndpoint.vedlegg, file)}
                    deleteFile={api.deleteFile}
                    getAttachmentURLFrontend={getAttachmentURLFrontend}
                    labels={{
                        addLabel: text('steg.legeerklaering.vedlegg.knappLabel'),
                        noAttachmentsText: text('vedleggsliste.ingenLegeerklæringLastetOpp'),
                    }}
                />
            </FormLayout.Questions>
        </Form>
    );
};

export default LegeerklæringForm;
