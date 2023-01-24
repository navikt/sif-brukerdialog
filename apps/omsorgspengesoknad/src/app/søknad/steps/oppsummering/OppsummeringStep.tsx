import { ErrorSummary } from '@navikt/ds-react';
import React, { useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { usePrevious } from '@navikt/sif-common-core-ds/lib/hooks/usePrevious';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import ErrorPage from '@navikt/sif-common-soknad-ds/lib/soknad-common-pages/ErrorPage';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { StepId } from '../../../types/StepId';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfig, getSøknadStepConfigForStep, includeDeltBostedStep } from '../../søknadStepConfig';
import OmBarnetOppsummering from './OmBarnetOppsummering';
import OmSøkerOppsummering from './OmSøkerOppsummering';
import { getOppsummeringStepInitialValues } from './oppsummeringStepUtils';
import VedleggOppsummering from './VedleggOppsummering';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
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
    const intl = useIntl();
    const {
        state: { søknadsdata, søker, registrerteBarn },
    } = useSøknadContext();

    const stepId = StepId.OPPSUMMERING;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);
    const { clearStepFormValues, stepFormValues } = useStepFormValuesContext();

    const { invalidSteps } = useSøknadsdataStatus(stepId, getSøknadStepConfig(søknadsdata));
    const hasInvalidSteps = invalidSteps.length > 0;

    const { goBack } = useStepNavigation(step);

    const { sendSøknad, isSubmitting, sendSøknadError } = useSendSøknad();
    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    useEffectOnce(() => {
        const inkluderDeltBosted = includeDeltBostedStep(søknadsdata);
        if (inkluderDeltBosted === false && stepFormValues.deltBosted) {
            clearStepFormValues(StepId.DELT_BOSTED);
        }
    });

    const apiData = getApiDataFromSøknadsdata(søknadsdata);

    if (!apiData) {
        return (
            <ErrorPage
                contentRenderer={() => {
                    return <>Ugyldig informasjon</>;
                }}
            />
        );
    }

    return (
        <SøknadStep stepId={StepId.OPPSUMMERING}>
            <FormikWrapper
                initialValues={getOppsummeringStepInitialValues(søknadsdata)}
                onSubmit={() => {
                    sendSøknad(apiData);
                }}
                renderForm={() => {
                    return (
                        <div data-testid="oppsummering">
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                submitDisabled={isSubmitting || hasInvalidSteps}
                                includeValidationSummary={true}
                                submitButtonLabel="Send søknad"
                                submitPending={isSubmitting}
                                backButtonDisabled={isSubmitting}
                                onBack={goBack}>
                                <OmSøkerOppsummering søker={søker} />
                                <OmBarnetOppsummering apiData={apiData} registrerteBarn={registrerteBarn} />
                                <VedleggOppsummering
                                    apiData={apiData}
                                    legeerklæringSøknadsdata={søknadsdata.legeerklæring}
                                    samværsavtaleSøknadsdata={søknadsdata.deltBosted}
                                />
                                <ConfirmationCheckbox
                                    disabled={isSubmitting}
                                    label={
                                        <span data-testid="bekreft-label">
                                            <FormattedMessage id="steg.oppsummering.bekrefterOpplysninger" />
                                        </span>
                                    }
                                    validate={getCheckedValidator()}
                                    name={OppsummeringFormFields.harBekreftetOpplysninger}
                                />
                            </Form>
                            {sendSøknadError && (
                                <FormBlock>
                                    <ErrorSummary ref={sendSøknadErrorSummary}>{sendSøknadError.message}</ErrorSummary>
                                </FormBlock>
                            )}
                        </div>
                    );
                }}></FormikWrapper>
        </SøknadStep>
    );
};

export default OppsummeringStep;
