import * as React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { StepID } from '../../config/stepConfig';
import { SoknadFormField } from '../../types/SoknadFormData';
import { ApplicationType } from '../../types/ApplicationType';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormStep from '../SoknadFormStep';

const ValgOmsTypeStep: React.FC = () => {
    const intl = useIntl();
    return (
        <SoknadFormStep id={StepID.OMS_TYPE}>
            <FormBlock>
                <SoknadFormComponents.RadioGroup
                    name={SoknadFormField.søknadstype}
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
        </SoknadFormStep>
    );
};

export default ValgOmsTypeStep;
