import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import { getOpplæringStepInitialValues, getOpplæringSøknadsdataFromFormValues } from './opplæringStepUtils';

export enum OpplæringFormFields {
    'beskrivelse' = 'beskrivelse',
}

export interface OpplæringFormValues {
    [OpplæringFormFields.beskrivelse]: string;
}

const OpplæringFormComponents = getTypedFormComponents<OpplæringFormFields, OpplæringFormValues>();

const OpplæringStep = () => {
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const onValidSubmitHandler = (values: OpplæringFormValues) => {
        const opplæringSøknadsdata = getOpplæringSøknadsdataFromFormValues(values);
        if (opplæringSøknadsdata) {
            return [actionsCreator.setSøknadOpplæring(opplæringSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        StepId.OPPLÆRING,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        }
    );

    return (
        <SøknadStep stepId={StepId.OPPLÆRING}>
            <OpplæringFormComponents.FormikWrapper
                initialValues={getOpplæringStepInitialValues(søknadsdata)}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                renderForm={() => (
                    <OpplæringFormComponents.Form>
                        <OpplæringFormComponents.Textarea
                            label="Beskriv opplæringen"
                            name={OpplæringFormFields.beskrivelse}
                            validate={getRequiredFieldValidator()}
                        />
                    </OpplæringFormComponents.Form>
                )}
            />
        </SøknadStep>
    );
};

export default OpplæringStep;
