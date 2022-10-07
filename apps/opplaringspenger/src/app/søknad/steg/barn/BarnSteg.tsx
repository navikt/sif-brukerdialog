import { Heading } from '@navikt/ds-react';
import React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getDateValidator, getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import actions from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadSteg from '../../SøknadSteg';
import { SøknadStegID } from '../../søknadStepsConfig';

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
    const {
        dispatch,
        state: { søknad },
    } = useSøknadContext();

    if (!søknad) {
        return <>!Søknad</>;
    }

    return (
        <SøknadSteg stegID={SøknadStegID.BARN}>
            <Heading level="1" size="xlarge">
                Barn
            </Heading>
            <BarnFormComponents.FormikWrapper
                initialValues={{}}
                onSubmit={(values) => {
                    const { etternavn, fornavn, fødselsdato } = values;
                    if (etternavn && fornavn && fødselsdato) {
                        dispatch(actions.setSøknadBarn({ etternavn, fornavn, fødselsdato }));
                        dispatch(actions.setSøknadSteg(SøknadStegID.ARBEID));
                    }
                }}
                renderForm={() => (
                    <BarnFormComponents.Form>
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
                            validate={getDateValidator({ max: new Date() })}
                        />
                    </BarnFormComponents.Form>
                )}
            />
        </SøknadSteg>
    );
};

export default BarnSteg;
