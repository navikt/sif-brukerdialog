import React from 'react';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getNumberValidator, getStringValidator } from '@navikt/sif-common-formik-ds/lib/validation';
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
import {
    getPleietrengendeStepInitialValues,
    getPleietrengendeSøknadsdataFromFormValues,
} from './pleietrengendeStepUtils';

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
    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const stepId = StepId.PLEIETRENGENDE;
    const stepConfig = getSøknadStepConfig(søknadsdata);
    const step = stepConfig[stepId];

    const { goBack } = useStepNavigation(step);

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
                        <Form
                            includeValidationSummary={true}
                            submitPending={isSubmitting}
                            runDelayedFormValidation={true}
                            onBack={goBack}>
                            <FormBlock>
                                <TextField
                                    label="Navn"
                                    name={PleietrengendeFormFields.navn}
                                    validate={getStringValidator({
                                        required: true,
                                        minLength: 1,
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
                                    label="Alder"
                                    name={PleietrengendeFormFields.alder}
                                    validate={getNumberValidator({
                                        required: true,
                                        max: 40,
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
