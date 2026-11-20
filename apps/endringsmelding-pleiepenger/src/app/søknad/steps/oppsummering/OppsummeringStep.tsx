import { useSendSøknad, useSøknadContext, useSøknadsdataStatus } from '@app/hooks';
import { useEndreFraOppsummering } from '@app/hooks/useEndreFraOppsummering';
import { useSøknadsdataInfo } from '@app/hooks/useSøknadsdataInfo';
import { useStepConfig } from '@app/hooks/useStepConfig';
import { AppText, useAppIntl } from '@app/i18n';
import { getSøknadStepRoute } from '@app/søknad/config/SøknadRoutes';
import { StepId } from '@app/søknad/config/StepId';
import actionsCreator from '@app/søknad/context/action/actionCreator';
import SøknadStep from '@app/søknad/SøknadStep';
import { Søknadsdata } from '@app/types';
import { getApiDataFromSøknadsdata, harUkjentArbeidsforholdMenHarIkkeBesvartArbeidstid } from '@app/utils';
import { BodyLong, BodyShort, ErrorSummary, Heading, Link, VStack } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { getIntlFormErrorHandler, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@sif/hooks';
import { SifInfoCard } from '@sif/soknad-ui/components';
import { useSkyraReloader } from '@sif/surveys';
import { getCheckedValidator } from '@sif/validation';
import { useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import ArbeidstidOppsummering from './arbeidstid/ArbeidstidOppsummering';
import EndreLenke from './components/EndreLenke';
import EndringerTekstoppsummering from './components/EndringerTekstoppsummering';
import OppsummeringSeksjon from './components/OppsummeringSeksjon';
import LovbestemtFerieOppsummering from './lovbestemt-ferie/LovbestemtFerieOppsummering';
import NyttArbeidsforholdOppsummering from './nytt-arbeidsforhold/NyttArbeidsforholdOppsummering';
import { oppsummeringStepUtils } from './oppsummeringStepUtils';
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

const getInitialValues = (søknadsdata: Søknadsdata): OppsummeringFormValues => ({
    harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger || false,
});

const OppsummeringStep = () => {
    useSkyraReloader();
    const stepId = StepId.OPPSUMMERING;
    const navigate = useNavigate();
    const { text, intl, locale } = useAppIntl();
    const {
        state: { søknadsdata, sak, arbeidsgivere, valgteEndringer, søker, tillattEndringsperiode },
        dispatch,
    } = useSøknadContext();
    const { endre } = useEndreFraOppsummering();

    useEffect(() => {
        dispatch(actionsCreator.setOppsummeringVist());
        dispatch(actionsCreator.requestLagreSøknad());
    }, [dispatch]);

    const { includeBackLink, stepConfig } = useStepConfig(stepId);
    const { hasInvalidSteps } = useSøknadsdataStatus(stepId, stepConfig, arbeidsgivere);
    const { sendSøknad, isSubmitting, sendSøknadError } = useSendSøknad();

    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    const { harFjernetFerie } = useSøknadsdataInfo();
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
        return <SifInfoCard variant="error">ApiData er undefined</SifInfoCard>;
    }

    const {
        arbeidstid,
        lovbestemtFerie,
        tilsynsordning,
        dataBruktTilUtledning: { ukjenteArbeidsforhold },
    } = apiData.ytelse;

    const endringer = oppsummeringStepUtils.getEndringer(apiData.ytelse);
    const harIngenEndringer = !endringer.ferie && !endringer.arbeidstid && !endringer.tilsynsordning;
    const harGyldigArbeidstid = oppsummeringStepUtils.erArbeidstidEndringerGyldig(arbeidstid);
    const harFeilPgaManglendeArbeidstidInfo = harUkjentArbeidsforholdMenHarIkkeBesvartArbeidstid(sak, apiData);
    const nyeArbeidsforhold = oppsummeringStepUtils.getNyeArbeidsforhold(
        sak.arbeidsgivereIkkeISak,
        ukjenteArbeidsforhold,
    );

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig} includeBackLink={includeBackLink}>
            <VStack gap="space-24">
                {harIngenEndringer ? (
                    <BodyShort size="large">
                        <AppText id="oppsummeringStep.ingenEndringer" />
                    </BodyShort>
                ) : (
                    <EndringerTekstoppsummering
                        arbeidsforhold={{
                            antallEndret: oppsummeringStepUtils.getAntallArbeidsforholdMedEndretArbeidstid(arbeidstid),
                            antallTotalt: oppsummeringStepUtils.getAntallArbeidsforholdTotalt(sak, arbeidstid),
                        }}
                        ferie={oppsummeringStepUtils.getFerieEndringer(lovbestemtFerie)}
                        tilsynsordningErEndret={endringer.tilsynsordning}
                    />
                )}

                {harFjernetFerie && (
                    <SifInfoCard variant="warning">
                        <AppText id="arbeidstidStep.fjernetFerie.melding" />
                    </SifInfoCard>
                )}

                <VStack gap="space-16">
                    {nyeArbeidsforhold.length > 0 && (
                        <OppsummeringSeksjon
                            tittel={text('oppsummeringStep.nyttArbeidsforhold.tittel')}
                            harEndring={true}
                            endreLabel={text('oppsummeringStep.endre.ukjentArbeidsforhold')}
                            ingenEndringTekst={text('oppsummeringStep.ingenEndringRegistrert.nyttArbeidsforhold')}
                            onEndre={() =>
                                isSubmitting ? null : navigate(getSøknadStepRoute(StepId.UKJENT_ARBEIDSFOHOLD))
                            }>
                            <NyttArbeidsforholdOppsummering nyeArbeidsforhold={nyeArbeidsforhold} />
                        </OppsummeringSeksjon>
                    )}

                    <OppsummeringSeksjon
                        tittel={text('oppsummeringStep.seksjon.ferie.tittel')}
                        harEndring={endringer.ferie}
                        endreLabel={text('oppsummeringStep.seksjon.ferie.endre')}
                        ingenEndringTekst={text('oppsummeringStep.ingenEndringRegistrert.ferie')}
                        onEndre={() => (isSubmitting ? null : endre(StepId.LOVBESTEMT_FERIE))}>
                        {lovbestemtFerie && <LovbestemtFerieOppsummering lovbestemtFerie={lovbestemtFerie} />}
                    </OppsummeringSeksjon>

                    <OppsummeringSeksjon
                        tittel={text('oppsummeringStep.seksjon.arbeidstid.tittel')}
                        harEndring={endringer.arbeidstid}
                        endreLabel={text('oppsummeringStep.seksjon.arbeidstid.endre')}
                        ingenEndringTekst={text('oppsummeringStep.ingenEndringRegistrert.arbeid')}
                        onEndre={() => (isSubmitting ? null : endre(StepId.ARBEIDSTID))}>
                        {arbeidstid && (
                            <ArbeidstidOppsummering
                                arbeidstid={arbeidstid}
                                arbeidsgivere={[...arbeidsgivere, ...sak.arbeidsgivereIkkeISak]}
                                harGyldigArbeidstid={harGyldigArbeidstid}
                            />
                        )}
                    </OppsummeringSeksjon>

                    <OppsummeringSeksjon
                        tittel={text('oppsummeringStep.seksjon.tilsynsordning.tittel')}
                        harEndring={endringer.tilsynsordning}
                        endreLabel={text('oppsummeringStep.seksjon.tilsynsordning.endre')}
                        ingenEndringTekst={text('oppsummeringStep.ingenEndringRegistrert.tilsynsordning')}
                        onEndre={() => (isSubmitting ? null : endre(StepId.TILSYNSORDNING))}>
                        {tilsynsordning && (
                            <TilsynsordningOppsummering
                                tilsynsordning={tilsynsordning}
                                søknadsperioder={sak.søknadsperioder}
                            />
                        )}
                    </OppsummeringSeksjon>

                    <VStack gap="space-12" marginBlock="space-24 space-12">
                        <VStack gap="space-4">
                            <Heading level="2" size="small">
                                Ønsker du å melde fra om flere endringer?
                            </Heading>
                            <BodyLong className="noPadding">
                                Hvis du skal melde fra om flere endringer, er det en fordel å gjøre dette i samme
                                søknad.
                            </BodyLong>
                        </VStack>

                        {!endringer.ferie && (
                            <EndreLenke
                                label="Endre ferie"
                                onClick={() => (isSubmitting ? null : endre(StepId.LOVBESTEMT_FERIE))}
                            />
                        )}
                        {!endringer.arbeidstid && (
                            <EndreLenke
                                label="Endre jobb i perioden"
                                onClick={() => (isSubmitting ? null : endre(StepId.ARBEIDSTID))}
                            />
                        )}
                        {!endringer.tilsynsordning && (
                            <EndreLenke
                                label="Endre tid i omsorgstilbud"
                                onClick={() => (isSubmitting ? null : endre(StepId.TILSYNSORDNING))}
                            />
                        )}
                    </VStack>
                </VStack>

                {harFeilPgaManglendeArbeidstidInfo && (
                    <SifInfoCard variant="error">
                        <BodyLong spacing={false} as="div">
                            <AppText
                                id="oppsummeringStep.manglerArbeidstid"
                                values={{
                                    steg: text('step.ukjentArbeidsforhold.stepTitle'),
                                    Lenke: (txt: string) => (
                                        <Link as={RouterLink} to={getSøknadStepRoute(StepId.UKJENT_ARBEIDSFOHOLD)}>
                                            {txt}
                                        </Link>
                                    ),
                                }}
                            />
                        </BodyLong>
                    </SifInfoCard>
                )}

                {harIngenEndringer || harFeilPgaManglendeArbeidstidInfo ? null : (
                    <FormikWrapper
                        initialValues={getInitialValues(søknadsdata)}
                        onSubmit={(values) => {
                            sendSøknad({
                                ...apiData,
                                harBekreftetOpplysninger:
                                    values[OppsummeringFormFields.harBekreftetOpplysninger] === true,
                            });
                        }}
                        renderForm={() => (
                            <VStack gap="space-32">
                                <Form
                                    formErrorHandler={getIntlFormErrorHandler(intl, 'oppsummeringForm')}
                                    submitDisabled={isSubmitting || hasInvalidSteps || !harGyldigArbeidstid}
                                    includeValidationSummary={true}
                                    submitButtonLabel={text('oppsummeringStep.submit.label')}
                                    isFinalSubmit={true}
                                    submitPending={isSubmitting}
                                    backButtonDisabled={isSubmitting}>
                                    <ConfirmationCheckbox
                                        disabled={isSubmitting || !harGyldigArbeidstid}
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
                        )}
                    />
                )}
            </VStack>
        </SøknadStep>
    );
};

export default OppsummeringStep;
