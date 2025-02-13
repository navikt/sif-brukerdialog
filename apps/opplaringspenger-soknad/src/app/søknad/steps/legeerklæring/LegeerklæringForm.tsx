import React from 'react';
import { FormikFileUpload, getVedleggValidator, useVedleggHelper } from '@navikt/sif-common-core-ds';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { AppText, useAppIntl } from '../../../i18n';
import getLenker from '../../../lenker';
import { List, VStack } from '@navikt/ds-react';

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
            <VStack gap="8">
                <SifGuidePanel>
                    <p>
                        <AppText id={'steg.legeerklæring.counsellorPanel.info.1'} />
                    </p>
                    <p>
                        <AppText id={'steg.legeerklæring.counsellorPanel.info.2.tittel'} />
                    </p>
                    <List>
                        <List.Item>
                            <AppText id={'steg.legeerklæring.counsellorPanel.info.2.1'} />
                        </List.Item>
                        <List.Item>
                            <AppText id={'steg.legeerklæring.counsellorPanel.info.2.2'} />
                        </List.Item>
                    </List>
                    <p>
                        <AppText id={'steg.legeerklæring.counsellorPanel.info.3'} />
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
                    label={text('steg.legeerklæring.vedlegg.label')}
                    showPictureScanningGuide={true}
                />
            </VStack>
        </Form>
    );
};

export default LegeerklæringForm;
