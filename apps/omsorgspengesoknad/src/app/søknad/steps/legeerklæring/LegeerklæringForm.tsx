import React from 'react';
import { useIntl } from 'react-intl';
import { FormikFileUpload, useVedleggHelper } from '@navikt/sif-common-core-ds';
import { getVedleggValidator } from '@navikt/sif-common-core-ds/src/components/formik-file-upload/getVedleggValidator';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';

interface Props {
    legeerklæringer?: Vedlegg[];
    isSubmitting?: boolean;
    andreVedlegg?: Vedlegg[];
    goBack?: () => void;
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
    isSubmitting,
    goBack,
}) => {
    const intl = useIntl();
    const { text } = useAppIntl();
    const { hasPendingUploads } = useVedleggHelper(legeerklæringer, andreVedlegg);

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
                        <AppText id={'steg.legeerklaering.counsellorpanel.1'} />
                    </p>
                    <p>
                        <AppText id={'steg.legeerklaering.counsellorpanel.2'} />
                    </p>
                </SifGuidePanel>

                <FormikFileUpload
                    fieldName={LegeerklæringFormFields.vedlegg}
                    label={text('steg.legeerklaering.vedlegg.knappLabel')}
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
                    showPictureScanningGuide={true}
                />
            </FormLayout.Questions>
        </Form>
    );
};

export default LegeerklæringForm;
