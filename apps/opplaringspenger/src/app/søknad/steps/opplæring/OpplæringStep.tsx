import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import { getOpplæringStepInitialValues, getOpplæringSøknadsdataFromFormValues } from './opplæringStepUtils';
import { getSøknadStepConfig } from '../../søknadStepConfig';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';

export enum OpplæringFormFields {
    'beskrivelse' = 'beskrivelse',
}

export interface OpplæringFormValues {
    [OpplæringFormFields.beskrivelse]: string;
}

const { FormikWrapper, Form, Textarea } = getTypedFormComponents<OpplæringFormFields, OpplæringFormValues>();

const OpplæringStep = () => {
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.OPPLÆRING;
    const step = getSøknadStepConfig(søknadsdata)[stepId];

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: OpplæringFormValues) => {
        const opplæringSøknadsdata = getOpplæringSøknadsdataFromFormValues(values);
        if (opplæringSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadOpplæring(opplæringSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        StepId.OPPLÆRING,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    return (
        <SøknadStep stepId={StepId.OPPLÆRING}>
            <FormikWrapper
                initialValues={getOpplæringStepInitialValues(søknadsdata, stepFormValues.opplaring)}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                renderForm={() => (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form onBack={goBack}>
                            <Textarea
                                label="Beskriv opplæringen"
                                name={OpplæringFormFields.beskrivelse}
                                validate={getRequiredFieldValidator()}
                            />
                        </Form>
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default OpplæringStep;
