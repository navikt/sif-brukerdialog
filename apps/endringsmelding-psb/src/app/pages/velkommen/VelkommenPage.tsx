import { BodyShort, Heading } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { getCheckedValidator, getListValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { SøknadRoutes } from '../../types/SøknadRoutes';
import { Arbeidsgiver, ArbeidsgiverType } from '../../types/Arbeidsgiver';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { useIntl } from 'react-intl';

export enum VelkommenFormFields {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    arbeidsgivere = 'arbeidsgivere',
}

export interface VelkommenFormValues {
    [VelkommenFormFields.harForståttRettigheterOgPlikter]: boolean;
    [VelkommenFormFields.arbeidsgivere]: string[];
}

const { FormikWrapper, Form, ConfirmationCheckbox, CheckboxGroup } = getTypedFormComponents<
    VelkommenFormFields,
    VelkommenFormValues
>();

const getArbeidsgiverLabel = (arbeidsgiver: Arbeidsgiver): React.ReactNode => {
    return (
        <BodyShort>
            <strong>{arbeidsgiver.navn}</strong>
            <div>
                {arbeidsgiver.type === ArbeidsgiverType.ORGANISASJON ? `Orgnr. ${arbeidsgiver.id}` : 'Privatperson'}
            </div>
        </BodyShort>
    );
};

const VelkommenPage = () => {
    const intl = useIntl();
    const {
        state: { søker, arbeidsgivere },
        dispatch,
    } = useSøknadContext();

    const navigateTo = useNavigate();

    const startSøknad = () => {
        dispatch(actionsCreator.startSøknad());
        navigateTo(SøknadRoutes.ARBEIDSTID);
    };
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
            </SifGuidePanel>

            <FormikWrapper
                initialValues={{ harForståttRettigheterOgPlikter: false }}
                onSubmit={startSøknad}
                renderForm={() => (
                    <Form
                        includeButtons={true}
                        submitButtonLabel="Start søknad"
                        formErrorHandler={getIntlFormErrorHandler(intl)}>
                        <Block margin="xxl">
                            <Heading level="2" size="medium">
                                Velg arbeidsaktivtet
                            </Heading>
                        </Block>
                        <FormBlock>
                            <CheckboxGroup
                                legend={'For hvilket arbeidsaktivitet gjelder endringen?'}
                                description={
                                    <ExpandableInfo title="Mangler du noen arbeidsforhold?">Mer info</ExpandableInfo>
                                }
                                name={VelkommenFormFields.arbeidsgivere}
                                validate={getListValidator({ required: true })}
                                checkboxes={arbeidsgivere.map((a) => ({
                                    label: getArbeidsgiverLabel(a),
                                    value: a.id,
                                }))}
                            />
                        </FormBlock>
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
