import React from 'react';
import { FormikAttachmentForm, getAttachmentsValidator } from '@navikt/sif-common-core-ds/src';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { relocateToLoginPage } from '../../../utils/navigationUtils';
import { useAttachmentsHelper } from '@navikt/sif-common-core-ds';

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

    const attachments = values.vedlegg ? values.vedlegg : [];
    const { hasPendingUploads } = useAttachmentsHelper(attachments, andreVedlegg);

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={hasPendingUploads}
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
                attachments={attachments}
                fieldName={LegeerklæringFormFields.vedlegg}
                labels={{
                    addLabel: text('step.legeerklæring.uploadBtn'),
                    noAttachmentsText: text('vedleggsliste.ingenLegeerklæringLastetOpp'),
                }}
                uploadLaterURL={getLenker(intl.locale).ettersending}
                validate={getAttachmentsValidator({ useDefaultMessages: true }, andreVedlegg)}
                onUnauthorizedOrForbiddenUpload={relocateToLoginPage}
                otherAttachments={andreVedlegg}
            />
        </Form>
    );
};

export default LegeerklæringForm;
