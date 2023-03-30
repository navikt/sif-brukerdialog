import React from 'react';
import FormikValuesObserver from '@navikt/sif-common-formik-ds/lib/components/helpers/formik-values-observer/FormikValuesObserver';
import { useStepFormValuesContext } from '../../søknad/context/StepFormValuesContext';
import { StepId } from '../../søknad/config/StepId';

interface Props {
    stepId: StepId;
    onChange?: () => void;
}

const PersistStepFormValues: React.FunctionComponent<Props> = ({ stepId, onChange }) => {
    const { setStepFormValues } = useStepFormValuesContext();
    return (
        <FormikValuesObserver
            onChange={(formValues) => {
                setStepFormValues(stepId, { [stepId]: formValues });
                if (onChange) {
                    onChange();
                }
            }}
        />
    );
};

export default PersistStepFormValues;
