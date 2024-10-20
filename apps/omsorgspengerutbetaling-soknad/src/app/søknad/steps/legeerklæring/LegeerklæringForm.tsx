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

    const legeerklæringer = values[LegeerklæringFormFields.vedlegg] || [];

    const { hasPendingUploads } = useAttachmentsHelper(legeerklæringer, andreVedlegg);

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
                    <p>
                        <AppText id={'steg.legeerklæring.counsellorpanel.1'} />
                    </p>
                    <p>
                        <AppText id={'steg.legeerklæring.counsellorpanel.2'} />
                    </p>
                </SifGuidePanel>
            </Block>

            <FormikAttachmentForm
                fieldName={LegeerklæringFormFields.vedlegg}
                attachments={legeerklæringer}
                labels={{
                    addLabel: text('steg.legeerklæring.vedlegg.knappLabel'),
                }}
                onUnauthorizedOrForbiddenUpload={relocateToLoginPage}
                otherAttachments={andreVedlegg}
                validate={getAttachmentsValidator({ useDefaultMessages: true })}
                uploadLaterURL={getLenker(intl.locale).ettersending}
            />
        </Form>
    );
};

export default LegeerklæringForm;
