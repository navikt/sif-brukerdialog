import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfig } from '../../søknadStepConfig';
import { getInstitusjonStepInitialValues, getInstitusjonSøknadsdata } from './institusjonStepUtils';

export enum InstitusjonFormFields {
    'institusjonId' = 'institusjonId',
    'erAnnenInstitusjon' = 'erAnnenInstitusjon',
    'annen_navn' = 'annen_navn',
}

export interface InstitusjonFormValues {
    [InstitusjonFormFields.institusjonId]?: string;
    [InstitusjonFormFields.erAnnenInstitusjon]?: boolean;
    [InstitusjonFormFields.annen_navn]?: string;
}

const { FormikWrapper, Form, Select, Checkbox, TextField } = getTypedFormComponents<
    InstitusjonFormFields,
    InstitusjonFormValues
>();

const InstitusjonStep = () => {
    const {
        state: { institusjoner, søknadsdata },
    } = useSøknadContext();
    const harInstitusjoner = institusjoner.length > 0;

    const stepId = StepId.INSTITUSJON;
    const step = getSøknadStepConfig(søknadsdata)[stepId];

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const { goBack } = useStepNavigation(step);

    const onValidSubmitHandler = (values: InstitusjonFormValues) => {
        const søknadsdata = getInstitusjonSøknadsdata(values);
        if (søknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadInstitusjon(søknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        StepId.INSTITUSJON,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    return (
        <SøknadStep stepId={StepId.INSTITUSJON}>
            <FormikWrapper
                initialValues={getInstitusjonStepInitialValues(søknadsdata.institusjon, stepFormValues?.institusjon)}
                onSubmit={handleSubmit}
                renderForm={({ values: { erAnnenInstitusjon } }) => {
                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form includeValidationSummary={true} submitPending={isSubmitting} onBack={goBack}>
                                {harInstitusjoner && (
                                    <>
                                        <Select
                                            name={InstitusjonFormFields.institusjonId}
                                            label="Velg institusjon"
                                            disabled={erAnnenInstitusjon}
                                            validate={
                                                erAnnenInstitusjon !== true ? getRequiredFieldValidator() : undefined
                                            }>
                                            <option value="">Velg institusjon</option>
                                            {institusjoner.map((i) => {
                                                return (
                                                    <option key={i.id} id={i.id}>
                                                        {i.navn}
                                                    </option>
                                                );
                                            })}
                                        </Select>
                                        <Checkbox
                                            name={InstitusjonFormFields.erAnnenInstitusjon}
                                            label="Institusjon er ikke på listen"
                                        />
                                    </>
                                )}
                                {harInstitusjoner === false ||
                                    (erAnnenInstitusjon === true && (
                                        <TextField
                                            name={InstitusjonFormFields.annen_navn}
                                            label="Navn på institusjon"
                                            validate={erAnnenInstitusjon ? getRequiredFieldValidator() : undefined}
                                        />
                                    ))}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default InstitusjonStep;
