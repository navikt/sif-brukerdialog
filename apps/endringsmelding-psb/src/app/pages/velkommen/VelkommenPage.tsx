import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { SøknadRoutes } from '../../søknad/config/SøknadRoutes';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import SakInfo from './SakInfo';
import { Sak } from '../../types/Sak';

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
        state: { søker, k9saker, sak },
        dispatch,
    } = useSøknadContext();

    const startSøknad = (sak: Sak) => {
        dispatch(actionsCreator.startSøknad(sak));
        dispatch(actionsCreator.setSøknadRoute(SøknadRoutes.AKTIVITET));
    };

    if (k9saker.length === 0) {
        return (
            <Page title="Velkommen">
                <SifGuidePanel>
                    <Heading level="1" size="large">
                        Velkommen {søker.fornavn}
                    </Heading>
                    <p>Vi kan ikke finne en aktiv sak på deg</p>
                </SifGuidePanel>
            </Page>
        );
    }
    if (k9saker.length > 1) {
        return (
            <Page title="Velkommen">
                <SifGuidePanel>
                    <Heading level="1" size="large">
                        Velkommen {søker.fornavn}
                    </Heading>
                    <p>Du har flere enn én sak ... info</p>
                </SifGuidePanel>
            </Page>
        );
    }

    if (sak === undefined) {
        return <>OkiDoki - hva skjedde her</>;
    }

    return (
        <Page title="Velkommen">
            <SifGuidePanel>
                <Heading level="1" size="large">
                    Velkommen {søker.fornavn}
                </Heading>
                <p>
                    Du kan melde om endringer i arbeid opptil 3 måneder tilbake i tid, og ett år frem i tid. Vil du
                    melde fra om endringer utenfor denne tidsrammen, eller du har behov for å melde fra om andre
                    endringer, send inn en melding via Skriv til oss.
                </p>
                <FormBlock>
                    <SakInfo sak={sak} />
                </FormBlock>
            </SifGuidePanel>

            <FormikWrapper
                initialValues={{ harForståttRettigheterOgPlikter: false }}
                onSubmit={() => startSøknad(sak)}
                renderForm={() => (
                    <Form
                        includeButtons={true}
                        submitButtonLabel="Start endring"
                        formErrorHandler={getIntlFormErrorHandler(intl)}>
                        <FormBlock>
                            <ConfirmationCheckbox
                                label="Jeg forstår og bekrefter"
                                name={VelkommenFormFields.harForståttRettigheterOgPlikter}
                                validate={getCheckedValidator()}>
                                <div>
                                    <strong>Takk for at du er ærlig!</strong>
                                </div>
                                <ul>
                                    <li>
                                        Jeg forstår at hvis jeg gir uriktige eller holder tilbake opplysninger kan det
                                        få konsekvenser for retten min til pleiepenger.
                                    </li>
                                    <li>Jeg har lest og forstått det som står på nav.no/rettogplikt</li>
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
