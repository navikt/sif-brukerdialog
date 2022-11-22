import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getNumberValidator, getStringValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import { StepId } from '../../../types/StepId';
import {
    getPleietrengendeStepInitialValues,
    getPleietrengendeSøknadsdataFromFormValues,
} from './pleietrengendeStepUtils';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import { getSøknadStepConfig } from '../../søknadStepConfig';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';

export enum PleietrengendeFormFields {
    'navn' = 'navn',
    'alder' = 'alder',
}

export interface PleietrengendeFormValues {
    [PleietrengendeFormFields.navn]: string;
    [PleietrengendeFormFields.alder]: string;
}

const { FormikWrapper, Form, TextField } = getTypedFormComponents<PleietrengendeFormFields, PleietrengendeFormValues>();

const PleietrengendeStep = () => {
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.PLEIETRENGENDE;
    const step = getSøknadStepConfig(søknadsdata)[stepId];

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values: PleietrengendeFormValues) => {
        const pleietrengendeSøknadsdata = getPleietrengendeSøknadsdataFromFormValues(values);
        if (pleietrengendeSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadPleietrengende(pleietrengendeSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        StepId.PLEIETRENGENDE,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    return (
        <SøknadStep stepId={StepId.PLEIETRENGENDE}>
            <FormikWrapper
                initialValues={getPleietrengendeStepInitialValues(søknadsdata, stepFormValues?.pleietrengende)}
                onSubmit={handleSubmit}
                renderForm={() => (
                    <>
                        <PersistStepFormValues stepId={stepId} />
                        <Form includeValidationSummary={true} submitPending={isSubmitting} onBack={goBack}>
                            <FormBlock>
                                <TextField
                                    label="Navn"
                                    name={PleietrengendeFormFields.navn}
                                    validate={getStringValidator({
                                        required: true,
                                        minLength: 5,
                                        maxLength: 30,
                                    })}
                                    maxLength={30}
                                    width="m"
                                    description={
                                        <ExpandableInfo title="Hva gjør jeg når jeg er usikker">
                                            Mer info
                                        </ExpandableInfo>
                                    }
                                />
                            </FormBlock>
                            <FormBlock>
                                <TextField
                                    label="Navn"
                                    name={PleietrengendeFormFields.alder}
                                    validate={getNumberValidator({
                                        required: true,
                                        max: 18,
                                        min: 0,
                                    })}
                                    type="tel"
                                    maxLength={2}
                                    width="xs"
                                    description={
                                        <ExpandableInfo title="Hva gjør jeg når barnet er 18 år?">
                                            Mer info
                                        </ExpandableInfo>
                                    }
                                />
                            </FormBlock>
                        </Form>
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default PleietrengendeStep;
