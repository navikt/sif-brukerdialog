import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { InstitusjonSøknadsdata } from '../../../types/Søknadsdata';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import { getInstitusjonStepInitialValues } from './institusjonStepUtils';

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

    const getInstitusjonSøknadsdata = ({
        annen_navn,
        erAnnenInstitusjon,
        institusjonId,
    }: InstitusjonFormValues): InstitusjonSøknadsdata | undefined => {
        if (erAnnenInstitusjon && annen_navn) {
            return {
                type: 'egendefinert',
                navn: annen_navn,
            };
        }
        if (institusjonId) {
            return {
                type: 'registrert',
                institusjonId,
            };
        }
        return undefined;
    };

    const onValidSubmitHandler = (values: Partial<InstitusjonFormValues>) => {
        const søknadsdata = getInstitusjonSøknadsdata(values);
        if (søknadsdata) {
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
                initialValues={getInstitusjonStepInitialValues(søknadsdata.institusjon)}
                onSubmit={handleSubmit}
                renderForm={({ values: { erAnnenInstitusjon } }) => {
                    return (
                        <Form
                            includeValidationSummary={true}
                            submitButtonLabel="Gå videre"
                            submitPending={isSubmitting}>
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
                    );
                }}
            />
        </SøknadStep>
    );
};

export default InstitusjonStep;
