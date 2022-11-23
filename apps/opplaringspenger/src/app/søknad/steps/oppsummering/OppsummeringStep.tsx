import { ErrorSummary } from '@navikt/ds-react';
import React, { useEffect, useRef } from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { usePrevious } from '@navikt/sif-common-core-ds/lib/hooks/usePrevious';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { StepId } from '../../../types/StepId';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfig } from '../../søknadStepConfig';
import { getOppsummeringStepInitialValues } from './oppsummeringStepUtils';
import ArbeidOppsummering from './parts/ArbeidOppsummering';
import OpplæringOppsummering from './parts/OpplæringOppsummering';
import PleietrengendeOppsummering from './parts/PleietrengendeOppsummering';

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

const OppsummeringStep = () => {
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.OPPSUMMERING;
    const step = getSøknadStepConfig(søknadsdata)[stepId];

    const { goBack } = useStepNavigation(step);

    const { sendSøknad, isSubmitting, sendSøknadError, resetSendSøknad } = useSendSøknad();
    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    const apiData = getApiDataFromSøknadsdata(søknadsdata);

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
        <SøknadStep stepId={StepId.OPPSUMMERING}>
            <PleietrengendeOppsummering pleietrengende={apiData.pleietrengende} />
            <ArbeidOppsummering arbeid={apiData.arbeid} />
            <OpplæringOppsummering opplæring={apiData.opplæring} />
            <FormikWrapper
                initialValues={getOppsummeringStepInitialValues(søknadsdata)}
                onSubmit={() => {
                    sendSøknad(apiData);
                }}
                renderForm={() => {
                    return (
                        <>
                            <Form
                                submitDisabled={isSubmitting}
                                includeValidationSummary={true}
                                submitButtonLabel="Send søknad"
                                submitPending={isSubmitting}
                                onValidSubmit={() => {
                                    resetSendSøknad();
                                    // eslint-disable-next-line no-console
                                    console.log('whoa');
                                }}
                                onBack={goBack}>
                                <ConfirmationCheckbox
                                    label="Bekrefter opplysninger"
                                    validate={getCheckedValidator()}
                                    name={OppsummeringFormFields.harBekreftetOpplysninger}
                                />
                            </Form>
                            {sendSøknadError && (
                                <FormBlock>
                                    <ErrorSummary ref={sendSøknadErrorSummary}>{sendSøknadError.message}</ErrorSummary>
                                </FormBlock>
                            )}
                        </>
                    );
                }}></FormikWrapper>
        </SøknadStep>
    );
};

export default OppsummeringStep;
