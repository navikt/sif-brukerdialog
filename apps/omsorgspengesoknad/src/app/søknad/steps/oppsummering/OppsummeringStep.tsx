import { ErrorSummary, VStack } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getIntlFormErrorHandler, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { useEffectOnce, usePrevious } from '@navikt/sif-common-hooks';
import { isApiAxiosError } from '@navikt/sif-common-query';
import { getInvalidParametersFromAxiosError } from '@navikt/sif-common-soknad-ds';
import { getCheckedValidator } from '@navikt/sif-validation';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
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
import { useValiderFritekst } from '../../../hooks/useValiderFritekst';
import LoadingSpinner from '@navikt/sif-common-core-ds/src/atoms/loading-spinner/LoadingSpinner';

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
        sendSøknadError && isApiAxiosError(sendSøknadError)
            ? getInvalidParametersFromAxiosError(sendSøknadError.originalError)
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

    const {
        validateFritekst,
        isPending: fritekstIsPending,
        invalidParameters: fritekstInvalidParameters,
    } = useValiderFritekst();

    // Valider høyereRisikoForFraværBeskrivelse for å se om det har ugyldige tegn
    useEffect(() => {
        if (apiData?.høyereRisikoForFraværBeskrivelse) {
            validateFritekst(apiData.høyereRisikoForFraværBeskrivelse);
        }
    }, [apiData?.høyereRisikoForFraværBeskrivelse, validateFritekst]);

    if (!apiData) {
        return <ApiDataErrorPage />;
    }

    return (
        <SøknadStep stepId={StepId.OPPSUMMERING}>
            {fritekstIsPending ? (
                <LoadingSpinner size="3xlarge" style="block" />
            ) : (
                <VStack gap="8">
                    {fritekstInvalidParameters && (
                        <ApiDataValideringsfeilAlert
                            invalidParameter={fritekstInvalidParameters}
                            gjelderBeskrivelseFritekst={true}
                        />
                    )}

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
                                            fritekstIsPending ||
                                            fritekstInvalidParameters !== undefined
                                        }
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
                                            <ConfirmationCheckbox
                                                disabled={isSubmitting}
                                                label={<AppText id="steg.oppsummering.bekrefterOpplysninger" />}
                                                validate={getCheckedValidator()}
                                                name={OppsummeringFormFields.harBekreftetOpplysninger}
                                            />
                                        </VStack>
                                    </Form>

                                    {sendSøknadError && !invalidParameters && (
                                        <FormBlock>
                                            <ErrorSummary ref={sendSøknadErrorSummary}>
                                                <ErrorSummaryItem>{sendSøknadError.message}</ErrorSummaryItem>
                                            </ErrorSummary>
                                        </FormBlock>
                                    )}
                                    {sendSøknadError && invalidParameters && (
                                        <FormBlock>
                                            <ApiDataValideringsfeilAlert invalidParameter={invalidParameters} />
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
