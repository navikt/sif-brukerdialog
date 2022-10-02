import React from 'react';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import { Heading } from '@navikt/ds-react';

import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import actions from '../../context/action/actionCreator';

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

const BarnStep = () => {
    const {
        dispatch,
        state: { søknad },
    } = useSøknadContext();

    if (!søknad) {
        return null;
    }

    return (
        <Page title="Barn">
            <Heading level="1" size="xlarge">
                Barn
            </Heading>
            <BarnFormComponents.FormikWrapper
                initialValues={{}}
                onSubmit={(values) => {
                    const { etternavn, fornavn, fødselsdato } = values;
                    if (etternavn && fornavn && fødselsdato) {
                        dispatch(actions.setSøknadBarn({ etternavn, fornavn, fødselsdato }));
                    }
                }}
                renderForm={() => <>abc</>}
            />
        </Page>
    );
};

export default BarnStep;
