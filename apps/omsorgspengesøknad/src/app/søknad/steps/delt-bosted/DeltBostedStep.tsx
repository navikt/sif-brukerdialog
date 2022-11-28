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
import { getDeltBostedStepInitialValues, getDeltBostedSøknadsdataFromFormValues } from './deltBostedStepUtils';
import DeltBostedForm, { DeltBostedFormFields, DeltBostedFormValues } from './DeltBostedForm';

const { FormikWrapper } = getTypedFormComponents<DeltBostedFormFields, DeltBostedFormValues>();

const DeltBostedStep = () => {
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.DELT_BOSTED;
    const step = getSøknadStepConfig(søknadsdata)[stepId];

    const { goBack } = useStepNavigation(step);

    const { stepFormValues = {}, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: DeltBostedFormValues) => {
        const DeltBostedSøknadsdata = getDeltBostedSøknadsdataFromFormValues(values);
        if (DeltBostedSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadDeltBosted(DeltBostedSøknadsdata)];
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
                initialValues={getDeltBostedStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <DeltBostedForm values={values} goBack={goBack} isSubmitting={isSubmitting} />
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default DeltBostedStep;
