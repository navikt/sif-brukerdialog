import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { StepId } from '../../søknad/config/StepId';
import { getSøknadStepRoute, SøknadRoutes } from '../../søknad/config/SøknadRoutes';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { getSakFromK9Sak } from '../../utils/getSakFromK9Sak';

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
    useLogSidevisning('velgSak');

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
            <SifGuidePanel>
                <Heading level="1" size="large">
                    Hei {søker.fornavn}
                </Heading>
                <p>Du har flere saker og må velge hvilken sak du ønsker å endre:</p>
            </SifGuidePanel>
            <FormBlock>
                <FormikWrapper
                    onSubmit={(values) => velgSak(values)}
                    initialValues={{}}
                    renderForm={() => {
                        return (
                            <Form
                                submitButtonLabel="Velg"
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}>
                                <RadioGroup
                                    legend="Velg sak"
                                    name={FormFields.barnAktørId}
                                    validate={getRequiredFieldValidator()}
                                    radios={k9saker.map((sak) => ({
                                        label: formatName(sak.barn.fornavn, sak.barn.etternavn, sak.barn.mellomnavn),
                                        value: sak.barn.aktørId,
                                    }))}
                                />
                            </Form>
                        );
                    }}
                />
            </FormBlock>
        </Page>
    );
};

export default VelgSakPage;
