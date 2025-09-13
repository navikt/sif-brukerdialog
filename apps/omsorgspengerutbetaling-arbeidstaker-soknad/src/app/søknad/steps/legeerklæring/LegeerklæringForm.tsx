import React from 'react';
import { useVedleggHelper } from '@navikt/sif-common-core-ds';
import { FormikFileUpload } from '@navikt/sif-common-core-ds/src';
import { getVedleggValidator } from '@navikt/sif-common-core-ds/src/components/formik-file-upload/getVedleggValidator';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { getIntlFormErrorHandler, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { FormLayout } from '@navikt/sif-common-ui';

interface Props {
    values: Partial<LegeerklæringFormValues>;
    goBack?: () => void;
    isSubmitting?: boolean;
    andreVedlegg?: Vedlegg[];
}

export enum LegeerklæringFormFields {
    vedlegg = 'vedlegg',
}

export interface LegeerklæringFormValues {
    [LegeerklæringFormFields.vedlegg]: Vedlegg[];
}

const { Form } = getTypedFormComponents<LegeerklæringFormFields, LegeerklæringFormValues>();

const LegeerklæringForm: React.FunctionComponent<Props> = ({ values, goBack, andreVedlegg = [], isSubmitting }) => {
    const { text, intl } = useAppIntl();

    const vedlegg = values.vedlegg ? values.vedlegg : [];
    const { hasPendingUploads } = useVedleggHelper(vedlegg, andreVedlegg);

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={hasPendingUploads}
            runDelayedFormValidation={true}
            onBack={goBack}>
            <FormLayout.Guide>
                <p style={{ marginTop: 0 }}>
                    <AppText id="step.legeerklæring.counsellorpanel.1" />
                </p>
                <p>
                    <AppText id="step.legeerklæring.counsellorpanel.2" />
                </p>
            </FormLayout.Guide>
            <FormikFileUpload
                label={text('step.legeerklæring.vedleggsliste.tittel')}
                initialFiles={vedlegg}
                fieldName={LegeerklæringFormFields.vedlegg}
                validate={getVedleggValidator({ useDefaultMessages: true }, andreVedlegg)}
                uploadLaterURL={getLenker(intl.locale).ettersending}
                showPictureScanningGuide={true}
            />
        </Form>
    );
};

export default LegeerklæringForm;
