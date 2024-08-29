import { useEffect, useRef } from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { ErrorPage } from '@navikt/sif-common-soknad-ds';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { useSøknadContext } from '../../../søknad/context/hooks/useSøknadContext';
import { getSøknadStepConfig, getSøknadStepConfigForStep } from '../../../søknad/søknadStepConfig';
import { StepId } from '../../../types/StepId';
import OmSøkerOppsummering from './components/OmSøkerOppsummering';
import { usePrevious } from '@navikt/sif-common-hooks';
import ResetMellomagringButton from '../../../components/reset-mellomlagring-button/ResetMellomlagringButton';
import SøknadStep from '../../../søknad/SøknadStep';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { ErrorSummary, VStack } from '@navikt/ds-react';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { getOppsummeringStepInitialValues } from './oppsummeringStepUtils';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import LegeerklæringOppsummering from './components/LegeerklæringOppsummering';
import MedlemskapOppsummering from './components/MedlemskapOppsummering';
import KursOppsummering from './components/KursOppsummering';
import ArbeidssituasjonSummary from './arbeidssituasjon-summary/ArbeidssituasjonSummary';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { AppText, useAppIntl } from '../../../i18n';
import { useNavigate } from 'react-router-dom';

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
    const { text, intl } = useAppIntl();
    const {
        state: { søknadsdata, søker, frilansoppdrag },
    } = useSøknadContext();

    const stepId = StepId.OPPSUMMERING;
    const stepConfig = getSøknadStepConfig();
    const step = getSøknadStepConfigForStep(stepId);

    const { invalidSteps } = useSøknadsdataStatus(stepId, stepConfig);
    const hasInvalidSteps = invalidSteps.length > 0;

    const { goBack } = useStepNavigation(step);

    const { sendSøknad, isSubmitting, sendSøknadError } = useSendSøknad();
    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    const apiData = getApiDataFromSøknadsdata(søker.fødselsnummer, søknadsdata);

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
                        sendSøknad(
                            {
                                ...apiData,
                                harBekreftetOpplysninger:
                                    values[OppsummeringFormFields.harBekreftetOpplysninger] === true,
                            },
                            søker,
                        );
                    }
                }}
                renderForm={() => {
                    return (
                        <div data-testid="oppsummering">
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                submitDisabled={isSubmitting || hasInvalidSteps}
                                includeValidationSummary={true}
                                submitButtonLabel={text('steg.oppsummering.sendSøknad')}
                                isFinalSubmit={true}
                                submitPending={isSubmitting}
                                backButtonDisabled={isSubmitting}
                                onBack={goBack}>
                                <VStack gap="8">
                                    <OmSøkerOppsummering søker={søker} />

                                    <KursOppsummering
                                        apiData={apiData}
                                        onEdit={() => navigate(stepConfig[StepId.KURS].route)}
                                    />

                                    <ArbeidssituasjonSummary
                                        apiData={apiData}
                                        søknadsperiode={{
                                            from: ISODateToDate(apiData.fraOgMed),
                                            to: ISODateToDate(apiData.tilOgMed),
                                        }}
                                        frilansoppdrag={frilansoppdrag}
                                        onEdit={() => navigate(stepConfig[StepId.ARBEIDSSITUASJON].route)}
                                    />

                                    <MedlemskapOppsummering
                                        medlemskap={apiData.medlemskap}
                                        onEdit={() => navigate(stepConfig[StepId.MEDLEMSKAP].route)}
                                    />

                                    <LegeerklæringOppsummering
                                        apiData={apiData}
                                        legeerklæringSøknadsdata={søknadsdata.legeerklæring}
                                        onEdit={() => navigate(stepConfig[StepId.LEGEERKLÆRING].route)}
                                    />

                                    <ConfirmationCheckbox
                                        disabled={isSubmitting}
                                        label={
                                            <span data-testid="bekreft-label">
                                                <AppText id="steg.oppsummering.bekrefterOpplysninger" />
                                            </span>
                                        }
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
                        </div>
                    );
                }}></FormikWrapper>
        </SøknadStep>
    );
};

export default OppsummeringStep;
