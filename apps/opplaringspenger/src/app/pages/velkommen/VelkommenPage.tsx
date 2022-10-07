import { Button, Heading } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import TypedFormikForm from '@navikt/sif-common-formik-ds/lib/components/typed-formik-form/TypedFormikForm';
import TypedFormikWrapper from '@navikt/sif-common-formik-ds/lib/components/typed-formik-wrapper/TypedFormikWrapper';
import React from 'react';
import actions from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';

const VelkommenPage = () => {
    const {
        state: { søker },
        dispatch,
    } = useSøknadContext();

    const startSøknad = () => {
        dispatch(actions.startSøknad());
    };
    return (
        <Page title="Velkommen">
            <Heading level="1" size="large">
                Velkommen {søker.fornavn}
                <TypedFormikWrapper
                    initialValues={{}}
                    onSubmit={startSøknad}
                    renderForm={() => (
                        <TypedFormikForm includeButtons={false}>
                            <Button type="submit">Start</Button>
                        </TypedFormikForm>
                    )}></TypedFormikWrapper>
            </Heading>
        </Page>
    );
};

export default VelkommenPage;
