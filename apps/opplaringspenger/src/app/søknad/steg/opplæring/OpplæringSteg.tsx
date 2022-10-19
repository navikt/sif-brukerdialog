import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadSteg';
import { StegID } from '../../søknadStegConfig';

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
        state: { søknadsdata: søknad },
    } = useSøknadContext();

    if (!søknad) {
        return <>!Søknad</>;
    }

    return (
        <SøknadStep stegID={StegID.OPPLÆRING}>
            <OpplæringFormComponents.FormikWrapper
                initialValues={{}}
                onSubmit={(values) => {
                    const { beskrivelse } = values;
                    if (beskrivelse) {
                        dispatch(actionsCreator.setSøknadOpplæring({ beskrivelse }));
                    }
                }}
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
