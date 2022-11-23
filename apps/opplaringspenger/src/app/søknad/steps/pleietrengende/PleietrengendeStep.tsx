import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/lib/validation';
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

export enum PleietrengendeFormFields {
    'fødselsnummer' = 'fødselsnummer',
}

export interface PleietrengendeFormValues {
    [PleietrengendeFormFields.fødselsnummer]: string;
}

const { FormikWrapper, Form, TextField } = getTypedFormComponents<PleietrengendeFormFields, PleietrengendeFormValues>();

const PleietrengendeStep = () => {
    const {
        state: { søker, søknadsdata },
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
                            <TextField
                                label="Fødselsnummer"
                                name={PleietrengendeFormFields.fødselsnummer}
                                validate={getFødselsnummerValidator({
                                    required: true,
                                    disallowedValues: [søker.fødselsnummer],
                                })}
                                type="tel"
                                maxLength={11}
                                width="s"
                                description={
                                    <ExpandableInfo title="Hva gjør jeg når jeg ikke har fødselsnummer til den pleietrengende">
                                        Hey
                                    </ExpandableInfo>
                                }
                            />
                        </Form>
                    </>
                )}
            />
        </SøknadStep>
    );
};

export default PleietrengendeStep;
