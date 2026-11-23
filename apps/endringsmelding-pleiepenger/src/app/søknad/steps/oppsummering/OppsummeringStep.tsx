import { useSendSøknad, useSøknadContext, useSøknadsdataStatus } from '@app/hooks';
import { useEndreFraOppsummering } from '@app/hooks/useEndreFraOppsummering';
import { useStepConfig } from '@app/hooks/useStepConfig';
import { AppText, useAppIntl } from '@app/i18n';
import { getSøknadStepRoute } from '@app/søknad/config/SøknadRoutes';
import { StepId } from '@app/søknad/config/StepId';
import actionsCreator from '@app/søknad/context/action/actionCreator';
import SøknadStep from '@app/søknad/SøknadStep';
import { Søknadsdata } from '@app/types';
import { getApiDataFromSøknadsdata, harUkjentArbeidsforholdMenHarIkkeBesvartArbeidstid } from '@app/utils';
import { Alert, BodyLong, ErrorSummary, Heading, Link, VStack } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { getIntlFormErrorHandler, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@sif/hooks';
import { SifInfoCard } from '@sif/soknad-ui/components';
import { useSkyraReloader } from '@sif/surveys';
import { getCheckedValidator } from '@sif/validation';
import { useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useSøknadsdataInfo } from '../../../hooks/useSøknadsdataInfo';
import ArbeidstidOppsummering from './arbeidstid/ArbeidstidOppsummering';
import EndringerTekstoppsummering from './components/EndringerTekstoppsummering';
import FlereEndringer from './components/FlereEndringer';
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

const { FormikWrapper, Form, ConfirmationCheckbox, Checkbox } = getTypedFormComponents<
    OppsummeringFormFields,
    OppsummeringFormValues
>();

const getInitialValues = (søknadsdata: Søknadsdata): OppsummeringFormValues => ({
    harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger || false,
});

const brukConfirmationCheckbox = true;
const visFjernetFerieMelding = false;

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
                {harIngenEndringer && (
                    <SifInfoCard variant="info">
                        <AppText id="oppsummeringStep.ingenEndringer" />
                    </SifInfoCard>
                )}

                <EndringerTekstoppsummering
                    arbeidsforhold={{
                        antallEndret: oppsummeringStepUtils.getAntallArbeidsforholdMedEndretArbeidstid(arbeidstid),
                        antallTotalt: oppsummeringStepUtils.getAntallArbeidsforholdTotalt(sak, arbeidstid),
                    }}
                    ferie={oppsummeringStepUtils.getFerieEndringer(lovbestemtFerie)}
                    tilsynsordningErEndret={endringer.tilsynsordning}
                />

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

                    {visFjernetFerieMelding && harFjernetFerie && (
                        <Alert variant="warning">
                            <AppText id="arbeidstidStep.fjernetFerie.melding" />
                        </Alert>
                    )}

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

                    <FlereEndringer
                        endringer={endringer}
                        harIngenEndringer={harIngenEndringer}
                        onEndre={(id) => (isSubmitting ? null : endre(id))}
                    />
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
                                    {brukConfirmationCheckbox ? (
                                        <ConfirmationCheckbox
                                            disabled={isSubmitting || !harGyldigArbeidstid}
                                            label={text('oppsummeringStep.bekrefter.tekst')}
                                            validate={getCheckedValidator()}
                                            name={OppsummeringFormFields.harBekreftetOpplysninger}
                                        />
                                    ) : (
                                        <VStack gap="space-8">
                                            <Heading level="2" size="small">
                                                Bekreft og send inn
                                            </Heading>
                                            <Checkbox
                                                name={OppsummeringFormFields.harBekreftetOpplysninger}
                                                validate={getCheckedValidator()}
                                                label={<AppText id="oppsummeringStep.bekrefter.tekst" />}
                                            />
                                        </VStack>
                                    )}
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
