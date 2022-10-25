import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getDateValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { ISODateToDate } from '@navikt/sif-common-utils/lib';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadSteg';
import { StegID } from '../../søknadStegConfig';
import { getArbeidStegInitialValues } from './arbeidStegUtils';

export enum ArbeidFormFields {
    'startdato' = 'startdato',
}

export interface ArbeidFormValues {
    [ArbeidFormFields.startdato]?: string;
}

const ArbeidFormComponents = getTypedFormComponents<ArbeidFormFields, ArbeidFormValues>();

const ArbeidSteg = () => {
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const onValidSubmitHandler = (values: Partial<ArbeidFormValues>) => {
        const { startdato } = values;
        return [
            actionsCreator.setSøknadArbeid({
                startdato: startdato ? ISODateToDate(startdato) : undefined,
            }),
        ];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.OPPLÆRING,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    return (
        <SøknadStep stegID={StegID.ARBEID}>
            <ArbeidFormComponents.FormikWrapper
                initialValues={getArbeidStegInitialValues(søknadsdata)}
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
