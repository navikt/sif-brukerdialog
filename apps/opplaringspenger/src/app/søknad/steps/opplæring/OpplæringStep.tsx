import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import { StepId } from '../../../types/StepId';
import { getOpplæringStepInitialValues } from './opplæringStepUtils';

export enum OpplæringFormFields {
    'beskrivelse' = 'beskrivelse',
}

export interface OpplæringFormValues {
    [OpplæringFormFields.beskrivelse]: string;
}

const OpplæringFormComponents = getTypedFormComponents<OpplæringFormFields, OpplæringFormValues>();

const OpplæringStep = () => {
    const {
        dispatch,
        state: { søknadsdata },
    } = useSøknadContext();

    const onValidSubmitHandler = (values: Partial<OpplæringFormValues>) => {
        const { beskrivelse } = values;
        if (beskrivelse) {
            dispatch(actionsCreator.setSøknadOpplæring({ beskrivelse }));
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.OPPSUMMERING,
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
