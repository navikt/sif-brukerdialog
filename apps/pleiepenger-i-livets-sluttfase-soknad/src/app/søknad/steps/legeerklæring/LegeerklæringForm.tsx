import { VStack } from '@navikt/ds-react';
import React from 'react';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import useAttachmentsHelper from '@navikt/sif-common-core-ds/src/hooks/useAttachmentsHelper';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
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
    const { hasPendingUploads, maxTotalSizeExceeded } = useAttachmentsHelper(legeerklæringer, andreVedlegg);
    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={hasPendingUploads || maxTotalSizeExceeded}
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
