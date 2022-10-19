import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getDateValidator, getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadSteg from '../../SøknadSteg';
import { StegID } from '../../søknadStegConfig';
import { useOnValidSubmit } from '../../context/hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { lagreSøknadState } from '../../../api/endpoints/mellomlagringEndpoint';
import { getBarnStegInitialValues } from './barnStegUtils';

export enum BarnFormFields {
    'fødselsdato' = 'fødselsdato',
    'fornavn' = 'fornavn',
    'etternavn' = 'etternavn',
}

export interface BarnFormValues {
    [BarnFormFields.fornavn]: string;
    [BarnFormFields.etternavn]: string;
    [BarnFormFields.fødselsdato]: string;
}

const BarnFormComponents = getTypedFormComponents<BarnFormFields, BarnFormValues>();

const BarnSteg = () => {
    const { state } = useSøknadContext();

    const onValidSubmitHandler = (values: Partial<BarnFormValues>) => {
        const { etternavn, fornavn, fødselsdato } = values;
        if (etternavn && fornavn && fødselsdato) {
            return [actionsCreator.setSøknadBarn({ etternavn, fornavn, fødselsdato })];
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

    if (!state.søknadsdata) {
        return <>!Søknad</>;
    }

    return (
        <SøknadSteg stegID={StegID.BARN}>
            <BarnFormComponents.FormikWrapper
                initialValues={getBarnStegInitialValues(state.søknadsdata)}
                onSubmit={handleSubmit}
                renderForm={() => (
                    <BarnFormComponents.Form
                        includeValidationSummary={true}
                        submitButtonLabel="Gå videre"
                        submitPending={isSubmitting}>
                        <BarnFormComponents.TextField
                            label="Etternavn"
                            name={BarnFormFields.etternavn}
                            validate={getRequiredFieldValidator()}
                        />
                        <BarnFormComponents.TextField
                            label="Fornavn"
                            name={BarnFormFields.fornavn}
                            validate={getRequiredFieldValidator()}
                        />
                        <BarnFormComponents.DatePicker
                            label="Fødselsdato"
                            name={BarnFormFields.fødselsdato}
                            maxDate={new Date()}
                            validate={getDateValidator({ max: new Date() })}
                        />
                    </BarnFormComponents.Form>
                )}
            />
        </SøknadSteg>
    );
};

export default BarnSteg;
