import { Alert, ErrorSummary } from '@navikt/ds-react';
import React, { useEffect, useRef } from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { usePrevious } from '@navikt/sif-common-core-ds/lib/hooks/usePrevious';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfig } from '../../søknadStepConfig';
import { getOppsummeringStepInitialValues } from './oppsummeringStepUtils';
import PleietrengendeOppsummering from './parts/PleietrengendeOppsummering';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';

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
    const stepConfig = getSøknadStepConfig(søknadsdata);
    const step = stepConfig[stepId];
    const { hasInvalidSteps, invalidSteps } = useSøknadsdataStatus(stepId, stepConfig);

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

    return (
        <SøknadStep stepId={StepId.OPPSUMMERING}>
            {!apiData ? (
                <FormBlock paddingBottom="xl">
                    <Alert variant="error">Ugyldig apiData?</Alert>
                </FormBlock>
            ) : (
                <>
                    <PleietrengendeOppsummering pleietrengende={apiData.pleietrengende} />
                </>
            )}
            <FormikWrapper
                initialValues={getOppsummeringStepInitialValues(søknadsdata)}
                onSubmit={() => {
                    apiData ? sendSøknad(apiData) : undefined;
                }}
                renderForm={() => {
                    return (
                        <>
                            <pre>{JSON.stringify({ isSubmitting, hasInvalidSteps, invalidSteps }, null, 2)}</pre>
                            <Form
                                submitDisabled={isSubmitting || hasInvalidSteps}
                                includeValidationSummary={true}
                                submitButtonLabel="Send søknad"
                                submitPending={isSubmitting}
                                onValidSubmit={() => {
                                    resetSendSøknad();
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
