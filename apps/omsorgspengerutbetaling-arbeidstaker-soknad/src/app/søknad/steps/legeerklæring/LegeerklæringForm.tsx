import React from 'react';
import { useVedleggHelper } from '@navikt/sif-common-core-ds';
import { FormikFileUpload } from '@navikt/sif-common-core-ds/src';
import { getVedleggValidator } from '@navikt/sif-common-core-ds/src/components/formik-file-upload/getVedleggValidator';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { VStack } from '@navikt/ds-react';

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
            <VStack gap="6">
                <SifGuidePanel>
                    <p style={{ marginTop: 0 }}>
                        <AppText id={'step.legeerklæring.counsellorpanel.1'} />
                    </p>
                    <p>
                        <AppText id={'step.legeerklæring.counsellorpanel.2'} />
                    </p>
                </SifGuidePanel>
                <FormikFileUpload
                    label={text('step.legeerklæring.vedleggsliste.tittel')}
                    initialFiles={vedlegg}
                    fieldName={LegeerklæringFormFields.vedlegg}
                    validate={getVedleggValidator({ useDefaultMessages: true }, andreVedlegg)}
                    uploadLaterURL={getLenker(intl.locale).ettersending}
                    showPictureScanningGuide={true}
                />
            </VStack>
        </Form>
    );
};

export default LegeerklæringForm;
