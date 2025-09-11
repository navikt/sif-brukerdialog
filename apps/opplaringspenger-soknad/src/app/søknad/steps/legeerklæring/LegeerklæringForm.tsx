import { List } from '@navikt/ds-react';
import React from 'react';
import { FormikFileUpload, getVedleggValidator, useVedleggHelper, YesOrNo } from '@navikt/sif-common-core-ds';
import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';
import { getIntlFormErrorHandler, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-validation';
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
    skalEttersendeVedlegg = 'skalEttersendeVedlegg',
    vedleggSomSkalEttersendes = 'vedleggSomSkalEttersendes',
}

export enum VedleggType {
    LEGEERKLÆRING = 'LEGEERKLÆRING',
    KURSINFORMASJON = 'KURSINFORMASJON',
    ANNET = 'ANNET',
}

export interface LegeerklæringFormValues {
    [LegeerklæringFormFields.vedlegg]: Vedlegg[];
    [LegeerklæringFormFields.skalEttersendeVedlegg]: YesOrNo;
    [LegeerklæringFormFields.vedleggSomSkalEttersendes]: VedleggType[];
}

const { Form, YesOrNoQuestion, CheckboxGroup } = getTypedFormComponents<
    LegeerklæringFormFields,
    LegeerklæringFormValues
>();

const LegeerklæringForm: React.FunctionComponent<Props> = ({ values, goBack, andreVedlegg = [], isSubmitting }) => {
    const { text, intl } = useAppIntl();
    const legeerklæringer = values.vedlegg ? values.vedlegg : [];
    const { hasPendingUploads } = useVedleggHelper(legeerklæringer, andreVedlegg);

    const skalEttersendeVedlegg = values.skalEttersendeVedlegg === YesOrNo.YES;

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
                    <AppText id="steg.legeerklæring.counsellorPanel.info.1" />
                </p>
                <p>
                    <AppText id="steg.legeerklæring.counsellorPanel.info.2.tittel" />
                </p>
                <List>
                    <List.Item>
                        <AppText id="steg.legeerklæring.counsellorPanel.info.2.1" />
                    </List.Item>
                    <List.Item>
                        <AppText id="steg.legeerklæring.counsellorPanel.info.2.2" />
                    </List.Item>
                </List>
                <p>
                    <AppText id="steg.legeerklæring.counsellorPanel.info.3" />
                </p>
            </FormLayout.Guide>

            <FormLayout.Questions>
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

                <YesOrNoQuestion
                    name={LegeerklæringFormFields.skalEttersendeVedlegg}
                    legend="Skal du ettersende vedlegg?"
                    validate={getYesOrNoValidator()}
                />

                {skalEttersendeVedlegg && (
                    <CheckboxGroup
                        name={LegeerklæringFormFields.vedleggSomSkalEttersendes}
                        checkboxes={[
                            {
                                label: text(`vedleggType.${VedleggType.LEGEERKLÆRING}`),
                                value: VedleggType.LEGEERKLÆRING,
                            },
                            {
                                label: text(`vedleggType.${VedleggType.KURSINFORMASJON}`),
                                value: VedleggType.KURSINFORMASJON,
                            },
                            { label: text(`vedleggType.${VedleggType.ANNET}`), value: VedleggType.ANNET },
                        ]}
                        legend="Hvilke vedlegg skal du ettersende?"
                        validate={getListValidator({ required: true })}
                    />
                )}
            </FormLayout.Questions>
        </Form>
    );
};

export default LegeerklæringForm;
