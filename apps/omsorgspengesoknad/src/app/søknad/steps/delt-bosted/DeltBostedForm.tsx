import React from 'react';
import { useIntl } from 'react-intl';
import { FormikFileUpload, getVedleggValidator, useVedleggHelper } from '@navikt/sif-common-core-ds';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { FormLayout } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';

interface Props {
    samværsavtaler?: Vedlegg[];
    isSubmitting?: boolean;
    andreVedlegg?: Vedlegg[];
    goBack?: () => void;
}

export enum DeltBostedFormFields {
    samværsavtale = 'samværsavtale',
}

export interface DeltBostedFormValues {
    [DeltBostedFormFields.samværsavtale]: Vedlegg[];
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

    const { hasPendingUploads } = useVedleggHelper(samværsavtaler, andreVedlegg);

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

                <FormikFileUpload
                    fieldName={DeltBostedFormFields.samværsavtale}
                    label={text('steg.deltBosted.vedlegg.knappLabel')}
                    initialFiles={samværsavtaler}
                    otherFiles={andreVedlegg}
                    uploadLaterURL={getLenker(intl.locale).ettersend}
                    validate={getVedleggValidator(
                        {
                            required: false,
                            useDefaultMessages: true,
                        },
                        andreVedlegg,
                    )}
                />
            </FormLayout.Questions>
        </Form>
    );
};

export default DeltBostedForm;
