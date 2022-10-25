import { Button, ErrorSummary } from '@navikt/ds-react';
import React, { useEffect, useRef } from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import ButtonRow from '@navikt/sif-common-core-ds/lib/components/button-row/ButtonRow';
import { usePrevious } from '@navikt/sif-common-core-ds/lib/hooks/usePrevious';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadSteg from '../../SøknadSteg';
import { StegID } from '../../søknadStegConfig';
import { getOppsummeringStegInitialValues } from './oppsummeringUtils';
import ArbeidOppsummering from './parts/ArbeidOppsummering';
import PleietrengendeOppsummering from './parts/PleietrengendeOppsummering';
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

    const { sendSøknad, isSubmitting, sendSøknadError, resetSendSøknad } = useSendSøknad();
    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    const apiData = getApiDataFromSøknadsdata(state.søknadsdata);

    if (!apiData) {
        return (
            <ErrorPage
                pageTitle="ApiData er ikke gyldig"
                contentRenderer={() => {
                    return <>Hva gjør vi nå?</>;
                }}
            />
        );
    }

    return (
        <SøknadSteg stegID={StegID.OPPSUMMERING}>
            <PleietrengendeOppsummering pleietrengende={apiData.pleietrengende} />
            <ArbeidOppsummering arbeid={apiData.arbeid} />
            <OpplæringOppsummering opplæring={apiData.opplæring} />
            <FormikWrapper
                initialValues={getOppsummeringStegInitialValues(state.søknadsdata)}
                onSubmit={() => {
                    sendSøknad(apiData);
                }}
                renderForm={() => {
                    return (
                        <>
                            <Form
                                includeButtons={false}
                                submitDisabled={isSubmitting}
                                includeValidationSummary={true}
                                submitButtonLabel="Send søknad"
                                submitPending={isSubmitting}>
                                <ConfirmationCheckbox
                                    label="Bekrefter opplysninger"
                                    validate={getCheckedValidator()}
                                    name={OppsummeringFormFields.harBekreftetOpplysninger}
                                />
                                <FormBlock>
                                    <ButtonRow align="left">
                                        <Button
                                            type="submit"
                                            onClick={() => {
                                                resetSendSøknad();
                                            }}>
                                            Send søknad
                                        </Button>
                                    </ButtonRow>
                                </FormBlock>
                            </Form>
                            {sendSøknadError && (
                                <FormBlock>
                                    <ErrorSummary ref={sendSøknadErrorSummary}>{sendSøknadError.message}</ErrorSummary>
                                </FormBlock>
                            )}
                        </>
                    );
                }}></FormikWrapper>
        </SøknadSteg>
    );
};

export default OppsummeringSteg;
