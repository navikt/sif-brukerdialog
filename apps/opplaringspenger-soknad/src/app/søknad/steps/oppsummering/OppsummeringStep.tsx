import { ErrorSummary, VStack } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { getIntlFormErrorHandler, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { ErrorPage } from '@navikt/sif-common-soknad-ds';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { getCheckedValidator } from '@navikt/sif-validation';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import ResetMellomagringButton from '../../../components/reset-mellomlagring-button/ResetMellomlagringButton';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { useSøknadContext } from '../../../søknad/context/hooks/useSøknadContext';
import SøknadStep from '../../../søknad/SøknadStep';
import { getSøknadStepConfig, getSøknadStepConfigForStep } from '../../../søknad/søknadStepConfig';
import { StepId } from '../../../types/StepId';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import ArbeidIPeriodenSummary from './arbeid-i-perioden-summary/ArbeidIPeriodenSummary';
import ArbeidssituasjonSummary from './arbeidssituasjon-summary/ArbeidssituasjonSummary';
import KursOppsummering from './components/KursOppsummering';
import LegeerklæringOppsummering from './components/LegeerklæringOppsummering';
import MedlemskapOppsummering from './components/MedlemskapOppsummering';
import OmSøkerOppsummering from './components/OmSøkerOppsummering';
import FraværIPeriodenSummary from './fravær-i-perioden-summary/FraværIPeriodenSummary';
import OmBarnetSummary from './om-barnet-summary/OmBarnetSummary';
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
        state: { søknadsdata, søker, frilansoppdrag, registrerteBarn, institusjoner, spørOmFraværFraJobb = false },
    } = useSøknadContext();

    const stepId = StepId.OPPSUMMERING;
    const stepConfig = getSøknadStepConfig(søknadsdata);
    const step = getSøknadStepConfigForStep(stepId, søknadsdata);

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

    const apiData = getApiDataFromSøknadsdata(
        søker.fødselsnummer,
        søknadsdata,
        registrerteBarn,
        institusjoner,
        locale,
        spørOmFraværFraJobb,
    );

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
                    const valgteDatoer = søknadsdata.kurs?.søknadsdatoer || [];
                    return (
                        <VStack gap="space-32" data-testid="oppsummering">
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                submitDisabled={isSubmitting || hasInvalidSteps}
                                includeValidationSummary={true}
                                submitButtonLabel={text('steg.oppsummering.sendSøknad')}
                                isFinalSubmit={true}
                                submitPending={isSubmitting}
                                backButtonDisabled={isSubmitting}
                                onBack={goBack}>
                                <VStack gap="space-32">
                                    <OmSøkerOppsummering søker={søker} />

                                    <OmBarnetSummary
                                        søknadsdata={søknadsdata.omBarnet!}
                                        apiData={apiData.barn}
                                        onEdit={() => navigate(stepConfig[StepId.OM_BARNET].route)}
                                    />

                                    <KursOppsummering
                                        kurs={apiData.kurs}
                                        ferieuttakIPerioden={apiData.ferieuttakIPerioden}
                                        utenlandsoppholdIPerioden={apiData.utenlandsoppholdIPerioden}
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
                                    {spørOmFraværFraJobb ? (
                                        <FraværIPeriodenSummary
                                            apiValues={apiData}
                                            valgteDatoer={valgteDatoer}
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
                                    ) : (
                                        <ArbeidIPeriodenSummary
                                            apiValues={apiData}
                                            valgteDatoer={valgteDatoer}
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
                                    )}

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
                                <ErrorSummary ref={sendSøknadErrorSummary}>
                                    <ErrorSummaryItem>{sendSøknadError.message}</ErrorSummaryItem>
                                </ErrorSummary>
                            )}
                        </VStack>
                    );
                }}></FormikWrapper>
        </SøknadStep>
    );
};

export default OppsummeringStep;
