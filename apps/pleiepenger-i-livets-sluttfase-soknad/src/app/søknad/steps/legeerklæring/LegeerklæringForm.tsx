import { VStack } from '@navikt/ds-react';
import React from 'react';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    getTotalSizeOfAttachments,
    hasPendingAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import api, { ApiEndpoint } from '../../../api/api';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { getAttachmentURLFrontend } from '../../../utils/attachmentUtils';
import { relocateToLoginPage } from '../../../utils/navigationUtils';

interface Props {
    legeerklæringer?: Attachment[];
    andreVedlegg: Attachment[];
    goBack?: () => void;
    isSubmitting?: boolean;
}

export enum LegeerklæringFormFields {
    vedlegg = 'vedlegg',
}

export interface LegeerklæringFormValues {
    [LegeerklæringFormFields.vedlegg]: Attachment[];
}

const { Form } = getTypedFormComponents<LegeerklæringFormFields, LegeerklæringFormValues>();

const LegeerklæringForm: React.FunctionComponent<Props> = ({
    legeerklæringer = [],
    andreVedlegg = [],
    goBack,
    isSubmitting,
}) => {
    const { text, intl } = useAppIntl();

    const hasPendingUploads: boolean = hasPendingAttachments(legeerklæringer);
    const totalSize = getTotalSizeOfAttachments([...legeerklæringer, ...andreVedlegg]);
    const totalSizeOfAttachmentsOver24Mb = totalSize > MAX_TOTAL_ATTACHMENT_SIZE_BYTES;

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={hasPendingUploads || totalSizeOfAttachmentsOver24Mb}
            runDelayedFormValidation={true}
            onBack={goBack}>
            <VStack gap="6">
                <SifGuidePanel>
                    <p>
                        <AppText id={'step.legeerklæring.counsellorPanel.info'} />
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
                    validation={{ required: false }}
                    labels={{
                        addLabel: text('step.legeerklæring.vedlegg.knappLabel'),
                        noAttachmentsText: text('vedleggsliste.ingenLegeerklæringLastetOpp'),
                    }}
                />
            </VStack>
        </Form>
    );
};

export default LegeerklæringForm;
