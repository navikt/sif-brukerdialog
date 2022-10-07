import { Heading } from '@navikt/ds-react';
import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getDateValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import actions from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadSteg';
import { SøknadStegID } from '../../søknadStepsConfig';

export enum ArbeidFormFields {
    'startdato' = 'startdato',
}

export interface ArbeidFormValues {
    [ArbeidFormFields.startdato]: string;
}

const ArbeidFormComponents = getTypedFormComponents<ArbeidFormFields, ArbeidFormValues>();

const ArbeidSteg = () => {
    const {
        dispatch,
        state: { søknad },
    } = useSøknadContext();

    if (!søknad) {
        return <>!Søknad</>;
    }

    return (
        <SøknadStep stegID={SøknadStegID.ARBEID}>
            <Heading level="1" size="xlarge">
                Arbeidssituasjon
            </Heading>
            <ArbeidFormComponents.FormikWrapper
                initialValues={{}}
                onSubmit={(values) => {
                    const { startdato } = values;
                    if (startdato) {
                        dispatch(actions.setSøknadArbeid({ startdato }));
                        dispatch(actions.setSøknadSteg(SøknadStegID.ARBEID));
                    }
                }}
                renderForm={() => (
                    <ArbeidFormComponents.Form>
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
