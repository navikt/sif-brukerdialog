import { useSendSøknad, useSøknadContext, useSøknadsdataStatus } from '@app/hooks';
import { useEndreFraOppsummering } from '@app/hooks/useEndreFraOppsummering';
import { useStepConfig } from '@app/hooks/useStepConfig';
import { AppText, useAppIntl } from '@app/i18n';
import { EndringStepId, StepId } from '@app/søknad/config/StepId';
import SøknadStep from '@app/søknad/SøknadStep';
import {
    Feature,
    getApiDataFromSøknadsdata,
    harUkjentArbeidsforholdMenHarIkkeBesvartArbeidstid,
    isFeatureEnabled,
} from '@app/utils';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Button, ErrorSummary, Link, VStack } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { getIntlFormErrorHandler, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { FormLayout } from '@navikt/sif-common-ui';
import { getCheckedValidator } from '@navikt/sif-validation';
import { useSkyraReloader } from '@sif/surveys';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import ArbeidstidOppsummering from './arbeidstid/ArbeidstidOppsummering';
import OppsummeringBlokk from './components/OppsummeringBlokk';
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
        state: { søknadsdata, sak, arbeidsgivere, valgteEndringer, søker, søknadSteps },
    } = useSøknadContext();
    const { endre } = useEndreFraOppsummering();

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

    const apiData = getApiDataFromSøknadsdata(
        søker.fødselsnummer,
        søknadsdata,
        sak,
        valgteEndringer,
        arbeidsgivere,
        locale,
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

    const kanVelgeEndringerFraOppsummering = isFeatureEnabled(Feature.SIF_PUBLIC_VELG_ENDRE_FRA_OPPSUMMERING);

    /** Uten feature-toggle vises bare blokker for steg som er med i flyten */
    const visBlokk = (steg: EndringStepId) => kanVelgeEndringerFraOppsummering || søknadSteps.includes(steg);

    const getEndre = (steg: EndringStepId, label: string) => {
        if (!kanVelgeEndringerFraOppsummering) {
            return undefined;
        }
        return { label, onClick: () => endre(steg), disabled: isSubmitting };
    };

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <FormLayout.Guide>
                <p>
                    <AppText id="oppsummeringStep.guide" />
                </p>
            </FormLayout.Guide>

            <VStack gap="space-48">
                {sak.harArbeidsgivereIkkeISak && ukjenteArbeidsforhold && (
                    <NyttArbeidsforholdSummary
                        arbeidsgivereIkkeISak={sak.arbeidsgivereIkkeISak}
                        ukjenteArbeidsforhold={ukjenteArbeidsforhold}
                    />
                )}

                {visBlokk(StepId.LOVBESTEMT_FERIE) && (
                    <OppsummeringBlokk
                        tittelId="oppsummeringStep.ferie.tittel"
                        ingenEndringerId="oppsummeringStep.ferie.ingenEndringer"
                        harEndringer={lovbestemtFerieErEndret}
                        endre={getEndre(StepId.LOVBESTEMT_FERIE, text('oppsummeringStep.endre.ferie'))}>
                        {lovbestemtFerie && <LovbestemtFerieOppsummering lovbestemtFerie={lovbestemtFerie} />}
                    </OppsummeringBlokk>
                )}

                {visBlokk(StepId.ARBEIDSTID) && (
                    <OppsummeringBlokk
                        tittelId="oppsummeringStep.arbeidstid.tittel"
                        ingenEndringerId="oppsummeringStep.arbeidstid.ingenEndringer"
                        harEndringer={arbeidstidErEndret}
                        endre={getEndre(StepId.ARBEIDSTID, text('oppsummeringStep.endre.arbeidstid'))}>
                        {arbeidstid && (
                            <ArbeidstidOppsummering
                                arbeidstid={arbeidstid}
                                arbeidsgivere={[...arbeidsgivere, ...sak.arbeidsgivereIkkeISak]}
                                harGyldigArbeidstid={harGyldigArbeidstid}
                            />
                        )}
                    </OppsummeringBlokk>
                )}

                {visBlokk(StepId.TILSYNSORDNING) && (
                    <OppsummeringBlokk
                        tittelId="oppsummeringStep.tilsynsordning.tittel"
                        ingenEndringerId="oppsummeringStep.tilsynsordning.ingenEndringer"
                        harEndringer={tilsynsordningErEndret}
                        endre={getEndre(StepId.TILSYNSORDNING, text('oppsummeringStep.endre.tilsynsordning'))}>
                        {tilsynsordning && (
                            <TilsynsordningOppsummering
                                tilsynsordning={tilsynsordning}
                                tidOpprinnelig={sak.tilsynsordning.tilsynsdagerMap}
                            />
                        )}
                    </OppsummeringBlokk>
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
                    <div>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={goBack}
                            icon={<ChevronLeftIcon aria-label={text('oppsummeringStep.forrige.ariaLabel')} />}>
                            <AppText id="oppsummeringStep.forrige" />
                        </Button>
                    </div>
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
                                        onBack={goBack}>
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
