import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getDateValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import { getArbeidStepInitialValues, getArbeidstidSøknadsdataFromFormValues } from './arbeidStepUtils';

export enum ArbeidFormFields {
    'startdato' = 'startdato',
}

export interface ArbeidFormValues {
    [ArbeidFormFields.startdato]?: string;
}

const { FormikWrapper, Form, DatePicker } = getTypedFormComponents<ArbeidFormFields, ArbeidFormValues>();

const ArbeidStep = () => {
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const onValidSubmitHandler = (values: ArbeidFormValues) => {
        const arbeidstidsSøknadsdata = getArbeidstidSøknadsdataFromFormValues(values);
        if (arbeidstidsSøknadsdata) {
            return [actionsCreator.setSøknadArbeid(arbeidstidsSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        StepId.ARBEID,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    return (
        <SøknadStep stepId={StepId.ARBEID}>
            <FormikWrapper
                initialValues={getArbeidStepInitialValues(søknadsdata)}
                onSubmit={handleSubmit}
                renderForm={() => (
                    <Form submitButtonLabel="Gå videre" includeValidationSummary={true} submitPending={isSubmitting}>
                        <DatePicker
                            label="Når skal du starte å arbeide?"
                            name={ArbeidFormFields.startdato}
                            minDate={new Date()}
                            validate={getDateValidator({ required: true, min: new Date() })}
                        />
                    </Form>
                )}
            />
        </SøknadStep>
    );
};

export default ArbeidStep;
