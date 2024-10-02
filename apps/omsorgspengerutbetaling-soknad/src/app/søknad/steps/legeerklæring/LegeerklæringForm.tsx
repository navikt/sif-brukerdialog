import React from 'react';
import { FormikAttachmentForm } from '@navikt/sif-common-core-ds/src';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import {
    getTotalSizeOfAttachments,
    MAX_TOTAL_ATTACHMENT_SIZE_BYTES,
} from '@navikt/sif-common-core-ds/src/utils/attachmentUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
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

const LegeerklæringForm: React.FunctionComponent<Props> = ({ values, goBack, andreVedlegg = [], isSubmitting }) => {
    const { text, intl } = useAppIntl();

    const hasPendingUploads: boolean = (values.vedlegg || []).find((a: any) => a.pending === true) !== undefined;
    const legeerklæringAttachments = values.vedlegg ? values.vedlegg : [];
    const totalSize = getTotalSizeOfAttachments([...legeerklæringAttachments, ...andreVedlegg]);
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
                    <p>
                        <AppText id={'steg.legeerklæring.counsellorpanel.1'} />
                    </p>
                    <p>
                        <AppText id={'steg.legeerklæring.counsellorpanel.2'} />
                    </p>
                </SifGuidePanel>
            </Block>

            <FormikAttachmentForm
                attachments={legeerklæringAttachments}
                fieldName={LegeerklæringFormFields.vedlegg}
                includeGuide={true}
                labels={{
                    addLabel: text('steg.legeerklæring.vedlegg.knappLabel'),
                }}
                validation={{ required: false }}
                onUnauthorizedOrForbiddenUpload={relocateToLoginPage}
                otherAttachments={andreVedlegg}
                uploadLaterURL={getLenker(intl.locale).ettersending}
            />
        </Form>
    );
};

export default LegeerklæringForm;
