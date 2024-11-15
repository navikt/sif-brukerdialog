import React from 'react';
import { useVedleggHelper } from '@navikt/sif-common-core-ds';
import { FormikFileUpload } from '@navikt/sif-common-core-ds/src';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { getVedleggValidator } from '@navikt/sif-common-core-ds/src/components/formik-file-upload/getVedleggValidator';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { AppText, useAppIntl } from '../../../i18n';

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

const LegeerklæringForm: React.FunctionComponent<Props> = ({ values, goBack, isSubmitting }) => {
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

            <FormikFileUpload
                fieldName={LegeerklæringFormFields.vedlegg}
                initialFiles={legeerklæringer}
                label={text('steg.legeerklæring.vedlegg.knappLabel')}
                validate={getVedleggValidator({ useDefaultMessages: true })}
                // uploadLaterURL={getLenker(intl.locale).ettersending}
            />
        </Form>
    );
};

export default LegeerklæringForm;
