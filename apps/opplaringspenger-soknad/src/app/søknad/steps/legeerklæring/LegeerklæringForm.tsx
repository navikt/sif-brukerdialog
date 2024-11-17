import React from 'react';
import { FormikFileUpload, getVedleggValidator, useVedleggHelper } from '@navikt/sif-common-core-ds';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';

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
    const legeerklæringer = values.vedlegg ? values.vedlegg : [];
    const { hasPendingUploads } = useVedleggHelper(legeerklæringer, andreVedlegg);

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

            <FormikFileUpload
                fieldName={LegeerklæringFormFields.vedlegg}
                initialFiles={legeerklæringer}
                otherFiles={andreVedlegg}
                uploadLaterURL={getLenker(intl.locale).ettersend}
                validate={getVedleggValidator(
                    {
                        required: false,
                        useDefaultMessages: true,
                    },
                    andreVedlegg,
                )}
                label={text('steg.legeerklæring.vedlegg.knappLabel')}
                showPictureScanningGuide={true}
            />
        </Form>
    );
};

export default LegeerklæringForm;
