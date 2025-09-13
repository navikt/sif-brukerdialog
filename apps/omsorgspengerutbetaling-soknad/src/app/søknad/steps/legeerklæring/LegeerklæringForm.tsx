import { useVedleggHelper } from '@navikt/sif-common-core-ds';
import { FormikFileUpload } from '@navikt/sif-common-core-ds/src';
import { getVedleggValidator } from '@navikt/sif-common-core-ds/src/components/formik-file-upload/getVedleggValidator';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { getIntlFormErrorHandler, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';

interface Props {
    values: Partial<LegeerklæringFormValues>;
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

const LegeerklæringForm = ({ values, goBack, isSubmitting }: Props) => {
    const { text, intl } = useAppIntl();

    const legeerklæringer = values[LegeerklæringFormFields.vedlegg] || [];

    const { hasPendingUploads } = useVedleggHelper(legeerklæringer);

    return (
        <Form
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
            includeValidationSummary={true}
            submitPending={isSubmitting}
            submitDisabled={hasPendingUploads}
            runDelayedFormValidation={true}
            onBack={goBack}>
            <FormLayout.Guide>
                <p>
                    <AppText id="steg.legeerklæring.counsellorpanel.1" />
                </p>
                <p>
                    <AppText id="steg.legeerklæring.counsellorpanel.2" />
                </p>
            </FormLayout.Guide>

            <FormikFileUpload
                fieldName={LegeerklæringFormFields.vedlegg}
                initialFiles={legeerklæringer}
                label={text('steg.legeerklæring.vedlegg.knappLabel')}
                validate={getVedleggValidator({ useDefaultMessages: true })}
                uploadLaterURL={getLenker(intl.locale).ettersending}
                showPictureScanningGuide={true}
            />
        </Form>
    );
};

export default LegeerklæringForm;
