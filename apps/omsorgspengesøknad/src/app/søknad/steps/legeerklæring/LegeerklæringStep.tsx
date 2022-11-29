import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfig } from '../../søknadStepConfig';
import { getLegeerklæringStepInitialValues, getLegeerklæringSøknadsdataFromFormValues } from './legeerklæringStepUtils';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { useIntl } from 'react-intl';

export enum LegeerklæringFormFields {}

export interface LegeerklæringFormValues {
    vedlegg: any;
}

const { FormikWrapper, Form } = getTypedFormComponents<LegeerklæringFormFields, LegeerklæringFormValues>();

const LegeerklæringStep = () => {
    const intl = useIntl();
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.LEGEERKLÆRING;
    const step = getSøknadStepConfig(søknadsdata)[stepId];

    const { goBack } = useStepNavigation(step);

    const { stepFormValues = {}, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: LegeerklæringFormValues) => {
        const LegeerklæringSøknadsdata = getLegeerklæringSøknadsdataFromFormValues(values);
        if (LegeerklæringSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadLegeerklæring(LegeerklæringSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getLegeerklæringStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={() => (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form
                            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            Ikke satt opp
                        </Form>
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default LegeerklæringStep;
