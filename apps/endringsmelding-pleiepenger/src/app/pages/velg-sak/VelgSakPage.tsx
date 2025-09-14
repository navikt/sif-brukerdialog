import { useSøknadContext } from '@hooks';
import { BodyShort, Heading } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { getIntlFormErrorHandler, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { dateFormatter } from '@navikt/sif-common-utils';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { getSakFromK9Sak, getSisteSøknadsperiodeIK9Sak } from '@utils';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { getSøknadStepRoute, SøknadRoutes } from '../../søknad/config/SøknadRoutes';
import { StepId } from '../../søknad/config/StepId';
import actionsCreator from '../../søknad/context/action/actionCreator';

enum FormFields {
    barnAktørId = 'barnAktørId',
}

interface FormValues {
    barnAktørId: string;
}

const { FormikWrapper, Form, RadioGroup } = getTypedFormComponents<FormFields, FormValues, ValidationError>();

const VelgSakPage = () => {
    const intl = useIntl();
    const {
        state: { søker, k9saker, arbeidsgivere, tillattEndringsperiode },
        dispatch,
    } = useSøknadContext();
    const navigate = useNavigate();

    const velgSak = (values: Partial<FormValues>) => {
        const k9Sak = k9saker.find((sak) => sak.barn.aktørId === values.barnAktørId);

        if (k9Sak) {
            const sak = getSakFromK9Sak(k9Sak, arbeidsgivere, tillattEndringsperiode);
            if (sak) {
                dispatch(actionsCreator.setSak(sak));
                dispatch(actionsCreator.setSøknadRoute(SøknadRoutes.VELKOMMEN));
                setTimeout(() => {
                    navigate(getSøknadStepRoute(StepId.VELKOMMEN));
                });
            } else {
                /** TODO - håndtere dette */
                alert('Kunne ikke hente ut sak');
            }
        }
    };

    return (
        <Page title="Velkommen">
            <FormLayout.Guide>
                <Heading level="1" size="large" spacing={true}>
                    Hei {søker.fornavn}
                </Heading>
                <p>
                    Vi ser at du har pleiepengesaker for flere barn. Du kan kun endre én sak om gangen, så du må velge
                    hvilken sak du ønsker å sende inn endring på.
                </p>
            </FormLayout.Guide>

            <FormikWrapper
                onSubmit={(values) => velgSak(values)}
                initialValues={{}}
                renderForm={() => {
                    return (
                        <Form submitButtonLabel="Velg" formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}>
                            <RadioGroup
                                legend="Velg barn/sak"
                                name={FormFields.barnAktørId}
                                validate={getRequiredFieldValidator()}
                                radios={k9saker.map((sak) => {
                                    const sisteSøknadperiodeISak = getSisteSøknadsperiodeIK9Sak(sak);
                                    return {
                                        label: (
                                            <BodyShort as="div">
                                                <Heading size="xsmall" as="div">
                                                    {formatName(
                                                        sak.barn.fornavn,
                                                        sak.barn.etternavn,
                                                        sak.barn.mellomnavn,
                                                    )}
                                                    - ({dateFormatter.dayDateMonthYear(sak.barn.fødselsdato)})
                                                </Heading>
                                                <p style={{ marginTop: '.5rem' }}>
                                                    Siste dag med pleiepenger:{' '}
                                                    {dateFormatter.dayCompactDate(sisteSøknadperiodeISak.to)}
                                                </p>
                                            </BodyShort>
                                        ),
                                        value: sak.barn.aktørId,
                                    };
                                })}
                            />
                        </Form>
                    );
                }}
            />
        </Page>
    );
};

export default VelgSakPage;
