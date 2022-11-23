import { GuidePanel, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { SøknadRoutes } from '../../types/SøknadRoutes';
import OmSøknaden from './OmSøknaden';
import getLenker from '../../lenker';
import { useIntl } from 'react-intl';

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
    const intl = useIntl();
    const {
        state: { søker },
        dispatch,
    } = useSøknadContext();

    const navigateTo = useNavigate();

    const startSøknad = () => {
        dispatch(actionsCreator.startSøknad());
        navigateTo(SøknadRoutes.OM_BARNET);
    };
    return (
        <Page title="Velkommen">
            <GuidePanel>
                <Heading level="1" size="large">
                    Hei {søker.fornavn}
                </Heading>
                <p>Velkommen til søknad om ekstra omsorgsdager.</p>
                <p>INTRO</p>
            </GuidePanel>

            <OmSøknaden />

            <FormikWrapper
                initialValues={{ harForståttRettigheterOgPlikter: false }}
                onSubmit={startSøknad}
                renderForm={() => (
                    <Form includeButtons={true} submitButtonLabel="Start søknad">
                        <FormBlock>
                            <ConfirmationCheckbox
                                label="Jeg bekrefter at jeg har lest og forstått"
                                name={VelkommenFormFields.harForståttRettigheterOgPlikter}
                                validate={getCheckedValidator()}>
                                <Heading level="3" size="small">
                                    <strong>Ditt ansvar som søker</strong>
                                </Heading>
                                <ul>
                                    <li>
                                        Jeg forstår at hvis jeg gir uriktige opplysninger, kan det få konsekvenser for
                                        retten min til det jeg søker om
                                    </li>
                                    <li>
                                        Jeg har lest og forstått det som står på{' '}
                                        <Link href={getLenker(intl.locale).rettOgPlikt} target="_blank">
                                            nav.no/rett og plikt
                                        </Link>
                                    </li>
                                </ul>
                            </ConfirmationCheckbox>
                        </FormBlock>
                    </Form>
                )}
            />
        </Page>
    );
};

export default VelkommenPage;
