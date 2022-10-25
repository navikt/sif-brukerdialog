import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { SøknadRoutes } from '../../../types/SøknadRoutes';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadSteg';
import { StegID } from '../../søknadStegConfig';
import { getOpplæringStegInitialValues } from './opplæringStegUtils';

export enum OpplæringFormFields {
    'beskrivelse' = 'beskrivelse',
}

export interface OpplæringFormValues {
    [OpplæringFormFields.beskrivelse]: string;
}

const OpplæringFormComponents = getTypedFormComponents<OpplæringFormFields, OpplæringFormValues>();

const OpplæringSteg = () => {
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
        <SøknadStep stegID={StegID.OPPLÆRING}>
            <OpplæringFormComponents.FormikWrapper
                initialValues={getOpplæringStegInitialValues(søknadsdata)}
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

export default OpplæringSteg;
