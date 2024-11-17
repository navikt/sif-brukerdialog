import { VStack } from '@navikt/ds-react';
import React from 'react';
import { FormikFileUpload, getVedleggValidator, useVedleggHelper } from '@navikt/sif-common-core-ds';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';

interface Props {
    legeerklæringer?: Vedlegg[];
    andreVedlegg: Vedlegg[];
    goBack?: () => void;
    isSubmitting?: boolean;
}

export enum LegeerklæringFormFields {
    vedlegg = 'vedlegg',
}

export interface LegeerklæringFormValues {
    [LegeerklæringFormFields.vedlegg]: Vedlegg[];
}

const { Form } = getTypedFormComponents<LegeerklæringFormFields, LegeerklæringFormValues>();

const LegeerklæringForm: React.FunctionComponent<Props> = ({
    legeerklæringer = [],
    andreVedlegg = [],
    goBack,
    isSubmitting,
}) => {
    const { text, intl } = useAppIntl();
    const { hasPendingUploads } = useVedleggHelper(legeerklæringer, andreVedlegg);
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
                    <p>
                        <AppText id={'step.legeerklæring.counsellorPanel.info'} />
                    </p>
                </SifGuidePanel>
                <FormikFileUpload
                    label={text('step.legeerklæring.vedlegg.knappLabel')}
                    fieldName={LegeerklæringFormFields.vedlegg}
                    initialFiles={legeerklæringer}
                    otherFiles={andreVedlegg}
                    showPictureScanningGuide={true}
                    uploadLaterURL={getLenker(intl.locale).ettersend}
                    validate={getVedleggValidator(
                        {
                            useDefaultMessages: true,
                        },
                        andreVedlegg,
                    )}
                />
            </VStack>
        </Form>
    );
};

export default LegeerklæringForm;
