import React from 'react';
import { useIntl } from 'react-intl';
import { FormikAttachmentForm, getAttachmentsValidator } from '@navikt/sif-common-core-ds/src';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { FormLayout } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { relocateToLoginPage } from '../../../utils/navigationUtils';
import { useAttachmentsHelper } from '@navikt/sif-common-core-ds';

interface Props {
    samværsavtaler?: Attachment[];
    isSubmitting?: boolean;
    andreVedlegg?: Attachment[];
    goBack?: () => void;
}

export enum DeltBostedFormFields {
    samværsavtale = 'samværsavtale',
}

export interface DeltBostedFormValues {
    [DeltBostedFormFields.samværsavtale]: Attachment[];
}

const { Form } = getTypedFormComponents<DeltBostedFormFields, DeltBostedFormValues>();

const DeltBostedForm: React.FunctionComponent<Props> = ({
    samværsavtaler = [],
    goBack,
    andreVedlegg = [],
    isSubmitting,
}) => {
    const intl = useIntl();
    const { text } = useAppIntl();

    const { hasPendingUploads } = useAttachmentsHelper(samværsavtaler, andreVedlegg);

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={hasPendingUploads}
            runDelayedFormValidation={true}
            onBack={goBack}>
            <FormLayout.Questions>
                <SifGuidePanel>
                    <p>
                        <AppText id={'steg.deltBosted.intro'} />
                    </p>
                </SifGuidePanel>

                <FormikAttachmentForm
                    fieldName={DeltBostedFormFields.samværsavtale}
                    attachments={samværsavtaler}
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
                        addLabel: text('steg.deltBosted.vedlegg.knappLabel'),
                        noAttachmentsText: text('vedleggsliste.ingenBostedsavtaleLastetOpp'),
                    }}
                />
            </FormLayout.Questions>
        </Form>
    );
};

export default DeltBostedForm;
