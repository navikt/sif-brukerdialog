import React from 'react';
import { useStepFormValuesContext } from '../../søknad/context/StepFormValuesContext';
import { StepId } from '../../types/StepId';
import FormikValuesObserver from '../formik-values-observer/FormikValuesObserver';

interface Props {
    stepId: StepId;
}

const PersistStepFormValues: React.FunctionComponent<Props> = ({ stepId }) => {
    const { setStepFormValues: setStepFormValues } = useStepFormValuesContext();
    return (
        <FormikValuesObserver
            onChange={(formValues) => {
                setStepFormValues(stepId, { [stepId]: formValues });
            }}
        />
    );
};

export default PersistStepFormValues;
