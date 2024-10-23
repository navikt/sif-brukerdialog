import { FormikAttachmentForm, getAttachmentsValidator, useAttachmentsHelper } from '@navikt/sif-common-core-ds';

import React from 'react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { AppText, useAppIntl } from '../../../i18n';
import { relocateToLoginPage } from '../../../utils/navigationUtils';
import getLenker from '../../../lenker';

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

const LegeerklæringForm: React.FunctionComponent<Props> = ({ values, goBack, andreVedlegg = [], isSubmitting }) => {
    const { text, intl } = useAppIntl();
    const legeerklæringer = values.vedlegg ? values.vedlegg : [];
    const { hasPendingUploads } = useAttachmentsHelper(legeerklæringer, andreVedlegg);

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={hasPendingUploads}
            runDelayedFormValidation={true}
            onBack={goBack}>
            <SifGuidePanel>
                <p>
                    <AppText id={'steg.legeerklæring.counsellorPanel.info'} />
                </p>
            </SifGuidePanel>

            <FormikAttachmentForm
                fieldName={LegeerklæringFormFields.vedlegg}
                attachments={legeerklæringer}
                otherAttachments={andreVedlegg}
                uploadLaterURL={getLenker(intl.locale).ettersend}
                onUnauthorizedOrForbiddenUpload={relocateToLoginPage}
                validate={getAttachmentsValidator(
                    {
                        required: false,
                        useDefaultMessages: true,
                    },
                    andreVedlegg,
                )}
                labels={{
                    addLabel: text('steg.legeerklæring.vedlegg.knappLabel'),
                    noAttachmentsText: text('vedleggsliste.ingenLegeerklæringLastetOpp'),
                }}
            />
        </Form>
    );
};

export default LegeerklæringForm;
