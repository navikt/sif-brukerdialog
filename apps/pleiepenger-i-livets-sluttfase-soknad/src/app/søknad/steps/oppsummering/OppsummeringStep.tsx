import { ErrorSummary, VStack } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { MedlemskapSummary } from '@navikt/sif-common-forms-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { ErrorPage } from '@navikt/sif-common-soknad-ds';
import { ISODateToDate } from '@navikt/sif-common-utils';
import ResetMellomagringButton from '../../../components/reset-mellomlagring-button/ResetMellomlagringButton';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { AppText, useAppIntl } from '../../../i18n';
import { useSøknadContext } from '../../../søknad/context/hooks/useSøknadContext';
import SøknadStep from '../../../søknad/SøknadStep';
import { getSøknadStepConfig, getSøknadStepConfigForStep } from '../../../søknad/søknadStepConfig';
import { StepId } from '../../../types/StepId';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import ArbeidIPeriodenSummary from './arbeid-i-perioden-summary/ArbeidIPeriodenSummary';
import ArbeidssituasjonSummary from './arbeidssituasjon-summary/ArbeidssituasjonSummary';
import LegeerklæringOppsummering from './components/LegeerklæringOppsummering';
import OmSøkerOppsummering from './components/OmSøkerOppsummering';
import PleietrengendePersonSummary from './components/PleietrengendePersonSummary';
import TidsromOppsummering from './components/TidsromOppsummering';
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
    const { text, intl } = useAppIntl();
    const {
        state: { søknadsdata, søker, frilansoppdrag },
    } = useSøknadContext();

    const stepId = StepId.OPPSUMMERING;
    const stepConfig = getSøknadStepConfig(søknadsdata);
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

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

    const pleietrengendeId =
        søknadsdata.opplysningerOmPleietrengende?.type === 'pleietrengendeUtenFnr'
            ? søknadsdata.opplysningerOmPleietrengende.pleietrengendeId
            : [];

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
                                submitButtonLabel={text('step.oppsummering.sendSøknad')}
                                isFinalSubmit={true}
                                submitPending={isSubmitting}
                                backButtonDisabled={isSubmitting}
                                onBack={goBack}>
                                <VStack gap="8">
                                    <OmSøkerOppsummering søker={søker} />

                                    <PleietrengendePersonSummary
                                        flereSøkere={apiData.flereSokere}
                                        pleietrengende={apiData.pleietrengende}
                                        pleietrengendeId={pleietrengendeId}
                                        onEdit={() => navigate(stepConfig[StepId.OPPLYSNINGER_OM_PLEIETRENGENDE].route)}
                                    />

                                    <TidsromOppsummering
                                        apiData={apiData}
                                        dagerMedPleie={søknadsdata.tidsrom!.dagerMedPleie}
                                        onEdit={() => navigate(stepConfig[StepId.TIDSROM].route)}
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

                                    <ArbeidIPeriodenSummary
                                        apiValues={apiData}
                                        dagerMedPleie={søknadsdata.tidsrom?.dagerMedPleie || []}
                                        søknadsperiode={{
                                            from: ISODateToDate(apiData.fraOgMed),
                                            to: ISODateToDate(apiData.tilOgMed),
                                        }}
                                        onEdit={
                                            stepConfig[StepId.ARBEIDSTID]
                                                ? () => navigate(stepConfig[StepId.ARBEIDSTID].route)
                                                : undefined
                                        }
                                    />

                                    <MedlemskapSummary
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
                                                <AppText id="step.oppsummering.bekrefterOpplysninger" />
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
