import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getDateValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { lagreSøknadState } from '../../../api/endpoints/mellomlagringEndpoint';
import { SøknadContextState } from '../../../types/SøknadContextState';
import actionsCreator from '../../context/action/actionCreator';
import { useOnValidSubmit } from '../../context/hooks/useOnValidSubmit';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { SøknadRoutes } from '../../SøknadRoutes';
import SøknadStep from '../../SøknadSteg';
import { StegID } from '../../søknadStegConfig';

export enum ArbeidFormFields {
    'startdato' = 'startdato',
}

export interface ArbeidFormValues {
    [ArbeidFormFields.startdato]: string;
}

const ArbeidFormComponents = getTypedFormComponents<ArbeidFormFields, ArbeidFormValues>();

const ArbeidSteg = () => {
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const onValidSubmitHandler = (values: Partial<ArbeidFormValues>) => {
        const { startdato } = values;
        if (startdato) {
            return [actionsCreator.setSøknadArbeid({ startdato })];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.OPPLÆRING,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    if (!søknadsdata) {
        return <>!Søknad</>;
    }

    return (
        <SøknadStep stegID={StegID.ARBEID}>
            <ArbeidFormComponents.FormikWrapper
                initialValues={{}}
                onSubmit={handleSubmit}
                renderForm={() => (
                    <ArbeidFormComponents.Form
                        submitButtonLabel="Gå videre"
                        includeValidationSummary={true}
                        submitPending={isSubmitting}>
                        <ArbeidFormComponents.DatePicker
                            label="Når skal du starte å arbeide?"
                            name={ArbeidFormFields.startdato}
                            minDate={new Date()}
                            validate={getDateValidator({ min: new Date() })}
                        />
                    </ArbeidFormComponents.Form>
                )}
            />
        </SøknadStep>
    );
};

export default ArbeidSteg;
