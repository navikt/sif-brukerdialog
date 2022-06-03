import * as React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { StepConfigProps, StepID } from '../../config/stepConfig';
import { ApplicationFormField } from '../../types/ApplicationFormData';
import { ApplicationType } from '../../types/ApplicationType';
import ApplicationFormComponents from '../ApplicationFormComponents';
import ApplicationStep from '../ApplicationStep';

const ValgOmsTypeStep = ({ onValidSubmit }: StepConfigProps) => {
    const intl = useIntl();
    return (
        <ApplicationStep id={StepID.OMS_TYPE} onValidFormSubmit={onValidSubmit} useValidationErrorSummary={true}>
            <FormBlock>
                <ApplicationFormComponents.RadioGroup
                    name={ApplicationFormField.søknadstype}
                    legend={intlHelper(intl, 'step.omsorgspenger_type.søknadstype.spm')}
                    validate={getRequiredFieldValidator()}
                    radios={[
                        {
                            value: ApplicationType.ekstraomsorgsdager,
                            label: intlHelper(intl, 'step.omsorgspenger_type.radio.label.ekstraomsorgsdager'),
                        },
                        {
                            value: ApplicationType.utbetaling,
                            label: intlHelper(intl, 'step.omsorgspenger_type.radio.label.utbetaling'),
                        },
                        {
                            value: ApplicationType.utbetalingarbeidstaker,
                            label: intlHelper(intl, 'step.omsorgspenger_type.radio.label.utbetalingarbeidstaker'),
                        },
                        {
                            value: ApplicationType.regnetsomalene,
                            label: intlHelper(intl, 'step.omsorgspenger_type.radio.label.regnetsomalene'),
                        },
                        {
                            value: ApplicationType.deling,
                            label: intlHelper(intl, 'step.omsorgspenger_type.radio.label.deling'),
                        },
                    ]}
                />
            </FormBlock>
        </ApplicationStep>
    );
};

export default ValgOmsTypeStep;
