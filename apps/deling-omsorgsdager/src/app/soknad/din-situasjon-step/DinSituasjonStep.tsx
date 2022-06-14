import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { getListValidator, getNumberValidator, getYesOrNoValidator } from '@navikt/sif-common-formik/lib/validation';
import FormQuestion from '@navikt/sif-common-soknad/lib/form-question/FormQuestion';
import { useFormikContext } from 'formik';
import Lenke from 'nav-frontend-lenker';
import StepIntroduction from '../../components/step-introduction/StepIntroduction';
import getLenker from '../../lenker';
import { Arbeidssituasjon, DinSituasjonFormData, SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';

const cleanupDinSituasjonStep = (values: SoknadFormData): SoknadFormData => {
    const cleanedValues = { ...values };
    if (values.harBruktOmsorgsdagerEtter1Juli === YesOrNo.NO) {
        cleanedValues.antallDagerBruktEtter1Juli = undefined;
    }
    return cleanedValues;
};

const DinSituasjonStep: React.FunctionComponent = () => {
    const intl = useIntl();
    const { values } = useFormikContext<DinSituasjonFormData>();

    const { harBruktOmsorgsdagerEtter1Juli } = values;
    const stepId = StepID.DIN_SITUASJON;

    const { erYrkesaktiv } = values;
    const kanFortsette = erYrkesaktiv === YesOrNo.YES;

    const arbeiderINorgeStopMessage = (
        <>
            {intlHelper(intl, 'step.din_situasjon.form.arbeiderINorge.stopMessage')}
            <ul>
                <li>{intlHelper(intl, 'arbeidstaker')}</li>
                <li>{intlHelper(intl, 'selvstendigNæringsdrivende')}</li>
                <li>{intlHelper(intl, 'frilanser')}</li>
            </ul>
        </>
    );

    return (
        <SoknadFormStep
            id={stepId}
            onStepCleanup={cleanupDinSituasjonStep}
            showSubmitButton={erYrkesaktiv !== YesOrNo.NO}>
            <StepIntroduction>
                <p>
                    <FormattedMessage id="step.din_situasjon.veileder.intro.1" />
                </p>
                <p>
                    <FormattedMessage id="step.din_situasjon.veileder.intro.2" />
                    <Lenke href={getLenker(intl.locale).medlemskapIFolketrygden} target="_blank">
                        {intlHelper(intl, 'nav.no')}
                    </Lenke>
                </p>
            </StepIntroduction>
            <FormQuestion
                name={SoknadFormField.erYrkesaktiv}
                legend={intlHelper(intl, 'step.din_situasjon.form.yrkesaktiv.spm')}
                validate={getYesOrNoValidator()}
                showStop={erYrkesaktiv === YesOrNo.NO}
                stopMessage={arbeiderINorgeStopMessage}
            />

            {kanFortsette === true && (
                <>
                    <FormBlock>
                        <SoknadFormComponents.CheckboxPanelGroup
                            legend={intlHelper(intl, 'step.din_situasjon.form.arbeidssituasjon.spm')}
                            name={SoknadFormField.arbeidssituasjon}
                            checkboxes={[
                                {
                                    value: Arbeidssituasjon.arbeidstaker,
                                    label: intlHelper(intl, `arbeidssituasjon.${Arbeidssituasjon.arbeidstaker}`),
                                },
                                {
                                    value: Arbeidssituasjon.selvstendigNæringsdrivende,
                                    label: intlHelper(
                                        intl,
                                        `arbeidssituasjon.${Arbeidssituasjon.selvstendigNæringsdrivende}`
                                    ),
                                },
                                {
                                    value: Arbeidssituasjon.frilanser,
                                    label: intlHelper(intl, `arbeidssituasjon.${Arbeidssituasjon.frilanser}`),
                                },
                            ]}
                            validate={getListValidator({ required: true })}
                        />
                    </FormBlock>
                    <FormBlock>
                        <SoknadFormComponents.YesOrNoQuestion
                            name={SoknadFormField.arbeiderINorge}
                            legend={intlHelper(intl, 'step.din_situasjon.form.arbeiderINorge.spm')}
                            validate={getYesOrNoValidator()}
                        />
                    </FormBlock>

                    <FormBlock>
                        <SoknadFormComponents.YesOrNoQuestion
                            name={SoknadFormField.harBruktOmsorgsdagerEtter1Juli}
                            legend={intlHelper(intl, 'step.din_situasjon.form.harBruktOmsorgsdagerI2021.spm')}
                            validate={getYesOrNoValidator()}
                        />
                    </FormBlock>

                    {harBruktOmsorgsdagerEtter1Juli === YesOrNo.YES && (
                        <FormBlock>
                            <SoknadFormComponents.NumberInput
                                name={SoknadFormField.antallDagerBruktEtter1Juli}
                                label={intlHelper(intl, 'step.din_situasjon.form.antallDagerBruktEtter1Januar.spm')}
                                validate={getNumberValidator({ required: true, min: 1 })}
                                style={{ maxWidth: '4rem' }}
                                maxLength={2}
                            />
                        </FormBlock>
                    )}
                </>
            )}
        </SoknadFormStep>
    );
};

export default DinSituasjonStep;
