import React from 'react';
import { FormikValuesObserver } from '@navikt/sif-common-formik-ds';
import { StepId } from '../../søknad/config/StepId';
import { useStepFormValuesContext } from '../../søknad/context/StepFormValuesContext';

interface Props {
    stepId: StepId;
    onChange?: () => void;
}

/**
 * Oppdaterer StepFormValuesContext når formik values endrer seg. Brukes til å kontrollere om
 * det er mismatch mellom søknadsdata og formValues, som kan skje hvis bruker navigerer med
 * browser back/forward i stedet for submit, og for å mellomlagre skjemadata for et steg
 * når bruker velger "Tilbake"-knappen.
 */
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
