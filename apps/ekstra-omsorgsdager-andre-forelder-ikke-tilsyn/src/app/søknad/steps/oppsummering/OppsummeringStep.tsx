import { ErrorSummary, VStack } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { useEffect, useRef } from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-validation';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { ErrorPage } from '@navikt/sif-common-soknad-ds';
import ResetMellomagringButton from '../../../components/reset-mellomlagring-button/ResetMellomlagringButton';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { AppText, useAppIntl } from '../../../i18n';
import { useSøknadContext } from '../../../søknad/context/hooks/useSøknadContext';
import { getSøknadStepConfig, getSøknadStepConfigForStep } from '../../../søknad/søknadStepConfig';
import { StepId } from '../../../types/StepId';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import SøknadStep from '../../SøknadStep';
import OmAnnenForelderOppsummering from './AnnenForelderOppsummering';
import AnnenForelderSituasjonOppsummering from './AnnenForelderSituasjonOppsummering';
import OmBarnaOppsummering from './OmBarnaOppsummering';
import OmSøkerOppsummering from './OmSøkerOppsummering';
import { getOppsummeringStepInitialValues } from './oppsummeringStepUtils';

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
        state: { søknadsdata, søker, registrerteBarn },
    } = useSøknadContext();

    const stepId = StepId.OPPSUMMERING;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { invalidSteps } = useSøknadsdataStatus(stepId, getSøknadStepConfig());
    const hasInvalidSteps = invalidSteps.length > 0;

    const { goBack, gotoStep } = useStepNavigation(step);

    const { sendSøknad, isSubmitting, sendSøknadError } = useSendSøknad();
    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    const apiData = getApiDataFromSøknadsdata(søker.fødselsnummer, søknadsdata, registrerteBarn, locale);

    if (!apiData) {
        return (
            <ErrorPage
                contentRenderer={() => {
                    return (
                        <>
                            <p>
                                <AppText id="apiDataValidation.undefined" />
                            </p>
                            <p>
                                <AppText id="resetMellomlagring.text.1" />
                            </p>
                            <ResetMellomagringButton label={text('resetMellomlagring.startPåNytt')} />
                        </>
                    );
                }}
            />
        );
    }

    return (
        <SøknadStep stepId={StepId.OPPSUMMERING}>
            <FormikWrapper
                initialValues={getOppsummeringStepInitialValues(søknadsdata)}
                onSubmit={(values) => {
                    if (apiData) {
                        sendSøknad({
                            ...apiData,
                            harBekreftetOpplysninger: values[OppsummeringFormFields.harBekreftetOpplysninger] === true,
                        });
                    }
                }}
                renderForm={() => {
                    return (
                        <>
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                submitDisabled={isSubmitting || hasInvalidSteps}
                                includeValidationSummary={true}
                                submitButtonLabel={text('step.oppsummering.sendSøknad')}
                                isFinalSubmit={true}
                                submitPending={isSubmitting}
                                backButtonDisabled={isSubmitting}
                                onBack={goBack}>
                                <VStack gap="8">
                                    <OmSøkerOppsummering søker={søker} />
                                    <OmAnnenForelderOppsummering
                                        annenForelder={apiData.annenForelder}
                                        onEdit={() => gotoStep(StepId.OM_ANNEN_FORELDER)}
                                    />
                                    <AnnenForelderSituasjonOppsummering
                                        annenForelder={apiData.annenForelder}
                                        onEdit={() => gotoStep(StepId.ANNEN_FORELDER_SITUASJON)}
                                    />
                                    <OmBarnaOppsummering barn={apiData.barn} onEdit={() => gotoStep(StepId.OM_BARNA)} />

                                    <ConfirmationCheckbox
                                        disabled={isSubmitting}
                                        label={<AppText id="step.oppsummering.bekrefterOpplysninger" />}
                                        validate={getCheckedValidator()}
                                        name={OppsummeringFormFields.harBekreftetOpplysninger}
                                    />
                                </VStack>
                            </Form>
                            {sendSøknadError && (
                                <FormBlock>
                                    <ErrorSummary ref={sendSøknadErrorSummary}>
                                        <ErrorSummaryItem>{sendSøknadError.message}</ErrorSummaryItem>
                                    </ErrorSummary>
                                </FormBlock>
                            )}
                        </>
                    );
                }}></FormikWrapper>
        </SøknadStep>
    );
};

export default OppsummeringStep;
