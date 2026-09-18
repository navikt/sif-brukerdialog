import { useSendSøknad, useSøknadContext, useSøknadsdataStatus } from '@app/hooks';
import { useStepConfig } from '@app/hooks/useStepConfig';
import { AppText, useAppIntl } from '@app/i18n';
import { StepId } from '@app/søknad/config/StepId';
import SøknadStep from '@app/søknad/SøknadStep';
import { getApiDataFromSøknadsdata, harUkjentArbeidsforholdMenHarIkkeBesvartArbeidstid } from '@app/utils';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Button, ErrorSummary, Heading, InlineMessage, Link, VStack } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { getIntlFormErrorHandler, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { ActionLink, FormLayout } from '@navikt/sif-common-ui';
import { getCheckedValidator } from '@navikt/sif-validation';
import { useSkyraReloader } from '@sif/surveys';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { getSøknadStepRoute } from '../../config/SøknadRoutes';
import actionsCreator from '../../context/action/actionCreator';
import ArbeidstidOppsummering from './arbeidstid/ArbeidstidOppsummering';
import LovbestemtFerieOppsummering from './lovbestemt-ferie/LovbestemtFerieOppsummering';
import NyttArbeidsforholdSummary from './nytt-arbeidsforhold/NyttArbeidsforholdSummary';
import { getOppsummeringStepInitialValues, oppsummeringStepUtils } from './oppsummeringStepUtils';
import TilsynsordningOppsummering from './tilsynsordning/TilsynsordningOppsummering';

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
    useSkyraReloader();
    const stepId = StepId.OPPSUMMERING;
    const navigate = useNavigate();
    const { text, intl, locale } = useAppIntl();
    const {
        dispatch,
        state: { søknadsdata, sak, arbeidsgivere, valgteEndringer, søker, tillattEndringsperiode, singleStepMode },
    } = useSøknadContext();

    const { goBack, stepConfig } = useStepConfig(stepId);
    const { hasInvalidSteps } = useSøknadsdataStatus(stepId, stepConfig, arbeidsgivere);
    const { sendSøknad, isSubmitting, sendSøknadError } = useSendSøknad();

    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    useEffect(() => {
        dispatch(actionsCreator.setSøknadRoute(getSøknadStepRoute(StepId.OPPSUMMERING)));
        dispatch(actionsCreator.requestLagreSøknad());
    }, []);
    const apiData = getApiDataFromSøknadsdata(
        søker.fødselsnummer,
        søknadsdata,
        sak,
        valgteEndringer,
        arbeidsgivere,
        locale,
        tillattEndringsperiode,
    );

    if (!apiData) {
        return <Alert variant="error">ApiData er undefined</Alert>;
    }

    const {
        arbeidstid,
        lovbestemtFerie,
        tilsynsordning,
        dataBruktTilUtledning: { ukjenteArbeidsforhold },
    } = apiData.ytelse;

    const arbeidstidErEndret = oppsummeringStepUtils.harEndringerIArbeidstid(arbeidstid);
    const harGyldigArbeidstid = oppsummeringStepUtils.erArbeidstidEndringerGyldig(arbeidstid);
    const lovbestemtFerieErEndret = oppsummeringStepUtils.harEndringerILovbestemtFerieApiData(lovbestemtFerie);
    const tilsynsordningErEndret = oppsummeringStepUtils.harEndringerITilsynsordningApiData(
        apiData.ytelse.tilsynsordning,
    );

    const harIngenEndringer =
        arbeidstidErEndret === false && lovbestemtFerieErEndret === false && tilsynsordningErEndret === false;

    const harFeilPgaManglendeArbeidstidInfo = harUkjentArbeidsforholdMenHarIkkeBesvartArbeidstid(sak, apiData);

    return (
        <SøknadStep
            stepId={stepId}
            stepConfig={stepConfig}
            singleStepMode={singleStepMode}
            stepTitle={singleStepMode ? 'Oversikt over endringer' : undefined}>
            <FormLayout.Guide>
                {singleStepMode ? (
                    <BodyLong>
                        Nedenfor ser du hva du kan endre og endringer du har gjort. Når du er ferdig, se over at alt
                        stemmer, og så sender du inn.
                    </BodyLong>
                ) : (
                    <p>
                        <AppText id="oppsummeringStep.guide" />
                    </p>
                )}
            </FormLayout.Guide>

            <VStack gap="space-48">
                <VStack gap="space-16">
                    {sak.harArbeidsgivereIkkeISak && ukjenteArbeidsforhold && (
                        <NyttArbeidsforholdSummary
                            arbeidsgivereIkkeISak={sak.arbeidsgivereIkkeISak}
                            ukjenteArbeidsforhold={ukjenteArbeidsforhold}
                        />
                    )}

                    {(valgteEndringer.arbeidstid || (arbeidstid && arbeidstidErEndret)) && (
                        <ArbeidstidOppsummering
                            brukAccordion={true}
                            arbeidstid={arbeidstid}
                            arbeidsgivere={[...arbeidsgivere, ...sak.arbeidsgivereIkkeISak]}
                            arbeidstidErEndret={arbeidstidErEndret}
                            harGyldigArbeidstid={harGyldigArbeidstid}
                        />
                    )}
                    {valgteEndringer.lovbestemtFerie && (
                        <LovbestemtFerieOppsummering
                            brukExpansionCard={true}
                            lovbestemtFerieErEndret={lovbestemtFerieErEndret}
                            lovbestemtFerie={lovbestemtFerie}
                        />
                    )}
                    {valgteEndringer.tilsynsordning && (
                        <TilsynsordningOppsummering
                            brukExpansionCard={true}
                            tilsynsordning={tilsynsordning}
                            tidOpprinnelig={sak.tilsynsordning.tilsynsdagerMap}
                        />
                    )}
                </VStack>
                {valgteEndringer.tilsynsordning && 1 + 1 === 3 && (
                    <VStack gap="space-16">
                        <Heading level="2" size="medium">
                            <AppText id="oppsummeringStep.tilsynsordning.tittel" />
                        </Heading>
                        {tilsynsordning !== undefined && tilsynsordningErEndret ? (
                            <TilsynsordningOppsummering
                                tilsynsordning={tilsynsordning}
                                tidOpprinnelig={sak.tilsynsordning.tilsynsdagerMap}
                            />
                        ) : (
                            <VStack gap="space-16">
                                <InlineMessage status="info">
                                    <AppText id="oppsummeringStep.tilsynsordning.ingenEndringer" />
                                </InlineMessage>
                                <ActionLink onClick={() => navigate(getSøknadStepRoute(StepId.TILSYNSORDNING))}>
                                    Gå til endring av tid i omsorgstilbud
                                </ActionLink>
                            </VStack>
                        )}
                    </VStack>
                )}

                {harFeilPgaManglendeArbeidstidInfo && (
                    <Alert variant="error">
                        <BodyLong spacing={false} as="div">
                            Vi mangler informasjon om arbeidstid. Vennligst gå tilbake til steget{' '}
                            <Link
                                href="#"
                                onClick={(evt) => {
                                    evt.stopPropagation();
                                    evt.preventDefault();
                                    navigate(stepConfig[StepId.UKJENT_ARBEIDSFOHOLD].route);
                                }}>
                                <AppText id={stepConfig[StepId.UKJENT_ARBEIDSFOHOLD].stepTitleIntlKey as any} />
                            </Link>{' '}
                            og fortsett derfra.
                        </BodyLong>
                    </Alert>
                )}

                {harIngenEndringer || harFeilPgaManglendeArbeidstidInfo ? (
                    <>
                        {singleStepMode ? null : (
                            <div>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={goBack}
                                    icon={<ChevronLeftIcon aria-label={text('oppsummeringStep.forrige.ariaLabel')} />}>
                                    <AppText id="oppsummeringStep.forrige" />
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
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
                                <VStack gap="space-32">
                                    <Form
                                        formErrorHandler={getIntlFormErrorHandler(intl, 'oppsummeringForm')}
                                        submitDisabled={
                                            isSubmitting || hasInvalidSteps || harIngenEndringer || !harGyldigArbeidstid
                                        }
                                        includeValidationSummary={true}
                                        submitButtonLabel={text('oppsummeringStep.submit.label')}
                                        isFinalSubmit={true}
                                        submitPending={isSubmitting}
                                        backButtonDisabled={isSubmitting}
                                        onBack={singleStepMode ? undefined : goBack}>
                                        <ConfirmationCheckbox
                                            disabled={isSubmitting || harIngenEndringer || !harGyldigArbeidstid}
                                            label={text('oppsummeringStep.bekrefter.tekst')}
                                            validate={getCheckedValidator()}
                                            data-testid="bekreft-opplysninger"
                                            name={OppsummeringFormFields.harBekreftetOpplysninger}
                                        />
                                    </Form>

                                    {sendSøknadError && (
                                        <ErrorSummary ref={sendSøknadErrorSummary}>
                                            <ErrorSummaryItem>{sendSøknadError.message}</ErrorSummaryItem>
                                        </ErrorSummary>
                                    )}
                                </VStack>
                            );
                        }}
                    />
                )}
            </VStack>
        </SøknadStep>
    );
};

export default OppsummeringStep;
