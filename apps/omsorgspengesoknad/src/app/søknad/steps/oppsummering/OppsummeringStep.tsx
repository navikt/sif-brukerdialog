import { ErrorSummary, VStack } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';
import { getIntlFormErrorHandler, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { useEffectOnce, usePrevious } from '@navikt/sif-common-hooks';
import { getInvalidParametersFromAxiosError } from '@navikt/sif-common-soknad-ds';
import { getCheckedValidator } from '@navikt/sif-validation';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { useValiderFritekst } from '../../../hooks/useValiderFritekst';
import { AppText, useAppIntl } from '../../../i18n';
import { StepId } from '../../../types/StepId';
import { getSøknadStepRoute } from '../../../utils/søknadRoutesUtils';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfig, getSøknadStepConfigForStep, includeDeltBostedStep } from '../../søknadStepConfig';
import ApiDataValideringsfeilAlert from './alerts/ApiDataValideringsfeilAlert';
import { getOppsummeringStepInitialValues } from './oppsummeringStepUtils';
import ApiDataErrorPage from './parts/ApiDataErrorPage';
import OmBarnetOppsummering from './parts/OmBarnetOppsummering';
import OmSøkerOppsummering from './parts/OmSøkerOppsummering';
import VedleggOppsummering from './parts/VedleggOppsummering';
import { isAxiosError } from 'axios';

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
    const { text, intl, locale } = useAppIntl();

    const {
        state: { søknadsdata, søker },
    } = useSøknadContext();

    const stepId = StepId.OPPSUMMERING;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);
    const { clearStepFormValues, stepFormValues } = useStepFormValuesContext();

    const { invalidSteps } = useSøknadsdataStatus(stepId, getSøknadStepConfig(søknadsdata));
    const hasInvalidSteps = invalidSteps.length > 0;

    const { goBack } = useStepNavigation(step);
    const navigate = useNavigate();

    const { sendSøknad, isSubmitting, sendSøknadError } = useSendSøknad();
    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);

    // Sjekk om det er feil på parametre som er sendt til API-et i feilmeldingen fra backend
    const invalidParameters =
        sendSøknadError && isAxiosError(sendSøknadError)
            ? getInvalidParametersFromAxiosError(sendSøknadError)
            : undefined;

    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    useEffectOnce(() => {
        const inkluderDeltBosted = includeDeltBostedStep(søknadsdata.omBarnet);
        if (inkluderDeltBosted === false && stepFormValues.deltBosted) {
            clearStepFormValues(StepId.DELT_BOSTED);
        }
    });

    const apiData = getApiDataFromSøknadsdata(søknadsdata, locale);

    const { isPending: validerFritekstIsPending, invalidParameters: fritekstInvalidParameters } = useValiderFritekst(
        apiData?.høyereRisikoForFraværBeskrivelse,
    );

    if (!apiData) {
        return <ApiDataErrorPage />;
    }

    return (
        <SøknadStep stepId={StepId.OPPSUMMERING}>
            {validerFritekstIsPending ? (
                <LoadingSpinner size="3xlarge" style="block" />
            ) : (
                <VStack gap="8">
                    <FormikWrapper
                        initialValues={getOppsummeringStepInitialValues(søknadsdata)}
                        onSubmit={(values) => {
                            if (apiData) {
                                sendSøknad({
                                    ...apiData,
                                    harBekreftetOpplysninger:
                                        values[OppsummeringFormFields.harBekreftetOpplysninger] === true,
                                });
                            }
                        }}
                        renderForm={() => {
                            return (
                                <>
                                    <Form
                                        formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                        submitDisabled={
                                            isSubmitting ||
                                            hasInvalidSteps ||
                                            validerFritekstIsPending ||
                                            fritekstInvalidParameters !== undefined
                                        }
                                        includeButtons={fritekstInvalidParameters === undefined}
                                        includeValidationSummary={true}
                                        submitButtonLabel={text('step.oppsummering.sendSøknad')}
                                        isFinalSubmit={true}
                                        submitPending={isSubmitting}
                                        backButtonDisabled={isSubmitting}
                                        onBack={goBack}>
                                        <VStack gap="8">
                                            <OmSøkerOppsummering søker={søker} />
                                            <OmBarnetOppsummering
                                                apiData={apiData}
                                                onEdit={() => {
                                                    navigate(getSøknadStepRoute(StepId.OM_BARNET));
                                                }}
                                            />
                                            <VedleggOppsummering
                                                apiData={apiData}
                                                legeerklæringSøknadsdata={søknadsdata.legeerklaering}
                                                samværsavtaleSøknadsdata={søknadsdata.deltBosted}
                                            />
                                            {fritekstInvalidParameters ? (
                                                <ApiDataValideringsfeilAlert
                                                    invalidParameter={fritekstInvalidParameters}
                                                    gjelderBeskrivelseFritekst={true}
                                                />
                                            ) : (
                                                <ConfirmationCheckbox
                                                    disabled={isSubmitting}
                                                    label={<AppText id="steg.oppsummering.bekrefterOpplysninger" />}
                                                    validate={getCheckedValidator()}
                                                    name={OppsummeringFormFields.harBekreftetOpplysninger}
                                                />
                                            )}
                                        </VStack>
                                        {sendSøknadError && invalidParameters && (
                                            <FormBlock>
                                                <ApiDataValideringsfeilAlert invalidParameter={invalidParameters} />
                                            </FormBlock>
                                        )}
                                    </Form>

                                    {sendSøknadError && !invalidParameters && (
                                        <FormBlock>
                                            <ErrorSummary ref={sendSøknadErrorSummary}>
                                                <ErrorSummaryItem>{sendSøknadError.message}</ErrorSummaryItem>
                                            </ErrorSummary>
                                        </FormBlock>
                                    )}
                                </>
                            );
                        }}
                    />
                </VStack>
            )}
        </SøknadStep>
    );
};

export default OppsummeringStep;
