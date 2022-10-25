import React, { useState } from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadSteg from '../../SøknadSteg';
import { StegID } from '../../søknadStegConfig';
import { getOppsummeringStegInitialValues } from './oppsummeringUtils';
import ArbeidOppsummering from './parts/ArbeidOppsummering';
import BarnOppsummering from './parts/BarnOppsummering';
import OpplæringOppsummering from './parts/OpplæringOppsummering';

enum OppsummeringFormFields {
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
}

export interface OppsummeringFormValues {
    [OppsummeringFormFields.harBekreftetOpplysninger]: boolean;
}

const { FormikWrapper, Form, ConfirmationCheckbox } = getTypedFormComponents<
    OppsummeringFormFields,
    OppsummeringFormValues
>();

const OppsummeringSteg = () => {
    const { state } = useSøknadContext();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
        }, 2000);
    };

    const apiData = getApiDataFromSøknadsdata(state.søknadsdata);

    if (!apiData) {
        return (
            <ErrorPage
                pageTitle="En feil oppstod "
                contentRenderer={() => {
                    return <>Hva gjør vi nå?</>;
                }}
            />
        );
    }

    return (
        <SøknadSteg stegID={StegID.OPPSUMMERING}>
            <BarnOppsummering barn={apiData.barn} />

            <ArbeidOppsummering arbeid={apiData.arbeid} />

            <OpplæringOppsummering opplæring={apiData.opplæring} />

            <FormikWrapper
                initialValues={getOppsummeringStegInitialValues(state.søknadsdata)}
                onSubmit={handleSubmit}
                renderForm={() => {
                    return (
                        <Form
                            submitDisabled={isSubmitting}
                            includeValidationSummary={true}
                            submitButtonLabel="Gå videre"
                            submitPending={isSubmitting}>
                            <ConfirmationCheckbox
                                label="Bekrefter opplysninger"
                                validate={getCheckedValidator()}
                                name={OppsummeringFormFields.harBekreftetOpplysninger}
                            />
                        </Form>
                    );
                }}></FormikWrapper>
        </SøknadSteg>
    );
};

export default OppsummeringSteg;
