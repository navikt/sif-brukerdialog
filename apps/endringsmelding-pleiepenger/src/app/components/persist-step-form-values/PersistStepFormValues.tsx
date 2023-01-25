import React from 'react';
import FormikValuesObserver from '@navikt/sif-common-formik-ds/lib/components/helpers/formik-values-observer/FormikValuesObserver';
import { useStepFormValuesContext } from '../../søknad/context/StepFormValuesContext';
import { StepId } from '../../søknad/config/StepId';

interface Props {
    stepId: StepId;
}

const PersistStepFormValues: React.FunctionComponent<Props> = ({ stepId }) => {
    const { setStepFormValues } = useStepFormValuesContext();
    return (
        <FormikValuesObserver
            onChange={(formValues) => {
                setStepFormValues(stepId, { [stepId]: formValues });
            }}
        />
    );
};

export default PersistStepFormValues;
