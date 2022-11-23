import { Heading, Ingress } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { SøknadRoutes } from '../../types/SøknadRoutes';

export enum VelkommenFormFields {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
}

export interface VelkommenFormValues {
    [VelkommenFormFields.harForståttRettigheterOgPlikter]: boolean;
}

const { FormikWrapper, Form, ConfirmationCheckbox } = getTypedFormComponents<
    VelkommenFormFields,
    VelkommenFormValues
>();

const VelkommenPage = () => {
    const {
        state: { søker },
        dispatch,
    } = useSøknadContext();

    const navigateTo = useNavigate();

    const startSøknad = () => {
        dispatch(actionsCreator.startSøknad());
        navigateTo(SøknadRoutes.PLEIETRENGENDE);
    };
    return (
        <Page title="Velkommen">
            <Heading level="1" size="large">
                Velkommen {søker.fornavn}
                <FormikWrapper
                    initialValues={{ harForståttRettigheterOgPlikter: false }}
                    onSubmit={startSøknad}
                    renderForm={() => (
                        <Form includeButtons={true} submitButtonLabel="Start søknad">
                            <FormBlock>
                                <Ingress>Introduksjonstekst</Ingress>
                            </FormBlock>
                            <FormBlock>
                                <ConfirmationCheckbox
                                    label="Jeg forstår og bekrefter"
                                    name={VelkommenFormFields.harForståttRettigheterOgPlikter}
                                    validate={getCheckedValidator()}
                                />
                            </FormBlock>
                        </Form>
                    )}
                />
            </Heading>
        </Page>
    );
};

export default VelkommenPage;
