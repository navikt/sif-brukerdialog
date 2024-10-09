import React from 'react';
import { useIntl } from 'react-intl';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import useAttachmentsHelper from '@navikt/sif-common-core-ds/src/hooks/useAttachmentsHelper';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { FormLayout } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
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

const LegeerklæringForm: React.FunctionComponent<Props> = ({
    legeerklæringer = [],
    andreVedlegg = [],
    isSubmitting,
    goBack,
}) => {
    const intl = useIntl();
    const { text } = useAppIntl();
    const { hasPendingUploads, maxTotalSizeExceeded } = useAttachmentsHelper(legeerklæringer, andreVedlegg);

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={hasPendingUploads || maxTotalSizeExceeded}
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
                    validation={{ required: true }}
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
