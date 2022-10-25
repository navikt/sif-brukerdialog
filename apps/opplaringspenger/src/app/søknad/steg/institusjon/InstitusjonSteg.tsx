import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { InstitusjonSøknadsdata } from '../../../types/Søknadsdata';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadSteg from '../../SøknadSteg';
import { StegID } from '../../søknadStegConfig';
import { getInstitusjonStegInitialValues } from './institusjonStegUtils';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';

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

const InstitusjonSteg = () => {
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
        debugger;
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
        SøknadRoutes.ARBEID,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    return (
        <SøknadSteg stegID={StegID.INSTITUSJON}>
            <FormikWrapper
                initialValues={getInstitusjonStegInitialValues(søknadsdata.institusjon)}
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
                                            erAnnenInstitusjon === false ? getRequiredFieldValidator() : undefined
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
        </SøknadSteg>
    );
};

export default InstitusjonSteg;
