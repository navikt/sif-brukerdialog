import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
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
import { getSakSøknadsdata } from '../../utils/getSakSøknadsdataFromSak';

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
        state: { søker, saker, arbeidsgivere },
        dispatch,
    } = useSøknadContext();

    const navigateTo = useNavigate();

    const startSøknad = () => {
        const sakSøknadsdata = getSakSøknadsdata(sak, arbeidsgivere);
        dispatch(actionsCreator.startSøknad(sakSøknadsdata));
        navigateTo(SøknadRoutes.AKTIVITET);
    };

    if (saker.length === 0) {
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
    if (saker.length > 1) {
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

    const sak = saker[0];
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
                onSubmit={startSøknad}
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
