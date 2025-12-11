import './oppsummering.css';

import { useSendSøknad, useSøknadContext, useSøknadsdataStatus } from '@hooks';
import { Alert, Button, ErrorSummary, Heading, VStack } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { getIntlFormErrorHandler, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { DurationText, FormLayout, JaNeiSvar, SummarySection } from '@navikt/sif-common-ui';
import { ISODurationToDuration } from '@navikt/sif-common-utils';
import { getCheckedValidator } from '@navikt/sif-validation';
import { getApiDataFromSøknadsdata } from '@utils';
import { useEffect, useRef } from 'react';

import IkkeAnsattMelding from '../../../components/ikke-ansatt-melding/IkkeAnsattMelding';
import { useStepConfig } from '../../../hooks/useStepConfig';
import { AppText, useAppIntl } from '../../../i18n';
import { StepId } from '../../config/StepId';
import SøknadStep from '../../SøknadStep';
import ArbeidstidOppsummering from './ArbeidstidOppsummering';
import LovbestemtFerieOppsummering from './LovbestemtFerieOppsummering';
import { getOppsummeringStepInitialValues, oppsummeringStepUtils } from './oppsummeringStepUtils';
import { ChevronLeftIcon } from '@navikt/aksel-icons';

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
    const stepId = StepId.OPPSUMMERING;
    const { text, intl, locale } = useAppIntl();
    const {
        state: { søknadsdata, sak, arbeidsgivere, valgteEndringer, søker },
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
        dataBruktTilUtledning: { ukjenteArbeidsforhold },
    } = apiData.ytelse;

    const arbeidstidErEndret = oppsummeringStepUtils.harEndringerIArbeidstid(arbeidstid);
    const harGyldigArbeidstid = oppsummeringStepUtils.erArbeidstidEndringerGyldig(arbeidstid);
    const lovbestemtFerieErEndret = oppsummeringStepUtils.harEndringerILovbestemtFerieApiData(lovbestemtFerie);

    const harIngenEndringer = arbeidstidErEndret === false && lovbestemtFerieErEndret === false;

    return (
        <SøknadStep stepId={stepId} stepConfig={stepConfig}>
            <FormLayout.Guide>
                <p>
                    <AppText id="oppsummeringStep.guide" />
                </p>
            </FormLayout.Guide>
            <VStack gap="12">
                {sak.harArbeidsgivereIkkeISak && ukjenteArbeidsforhold && (
                    <SummarySection header={text('oppsummeringStep.nyttArbeidsforhold.tittel')}>
                        <VStack gap="10">
                            {sak.arbeidsgivereIkkeISak.map((arbeidsgiver) => {
                                const arbeidsforhold = ukjenteArbeidsforhold.find(
                                    (a) => a.organisasjonsnummer === arbeidsgiver.organisasjonsnummer,
                                );

                                if (!arbeidsforhold) {
                                    return;
                                }
                                const getTestKey = (key: string) => `ukjentArbeidsforhold_${arbeidsgiver.key}_${key}`;
                                return (
                                    <VStack gap="4" key={arbeidsgiver.key}>
                                        <Heading level="3" size="small">
                                            {arbeidsgiver.navn}
                                        </Heading>
                                        <VStack gap="1">
                                            <Heading level="4" size="xsmall">
                                                <AppText
                                                    id="oppsummeringStep.arbeidsgiver.erAnsatt"
                                                    values={{ arbeidsgivernavn: arbeidsgiver.navn }}
                                                />
                                            </Heading>
                                            <div data-testid={getTestKey('erAnsatt')}>
                                                <JaNeiSvar harSvartJa={arbeidsforhold.erAnsatt} />
                                            </div>
                                        </VStack>
                                        {arbeidsforhold.erAnsatt === false && <IkkeAnsattMelding />}
                                        {arbeidsforhold.erAnsatt && (
                                            <VStack gap="1">
                                                <Heading level="4" size="xsmall">
                                                    <AppText
                                                        id="oppsummeringStep.arbeidsgiver.normalarbeidstid"
                                                        values={{ arbeidsgivernavn: arbeidsgiver.navn }}
                                                    />
                                                </Heading>
                                                <div data-testid={getTestKey('timerPerUke')}>
                                                    <DurationText
                                                        duration={ISODurationToDuration(
                                                            arbeidsforhold.normalarbeidstid.timerPerUke,
                                                        )}
                                                    />
                                                </div>
                                            </VStack>
                                        )}
                                    </VStack>
                                );
                            })}
                        </VStack>
                    </SummarySection>
                )}

                {(valgteEndringer.arbeidstid || (arbeidstid && arbeidstidErEndret)) && (
                    <SummarySection header={text('oppsummeringStep.arbeidstid.tittel')}>
                        {arbeidstid && arbeidstidErEndret ? (
                            <>
                                <ArbeidstidOppsummering
                                    arbeidstid={arbeidstid}
                                    arbeidsgivere={[...arbeidsgivere, ...sak.arbeidsgivereIkkeISak]}
                                />
                                {!harGyldigArbeidstid && (
                                    <Alert variant="error">
                                        <AppText id="oppsummeringStep.arbeidstid.flereTimerEnnTilgjengelig" />
                                    </Alert>
                                )}
                            </>
                        ) : (
                            <Alert variant="info">
                                <AppText id="oppsummeringStep.arbeidstid.ingenEndringer" />
                            </Alert>
                        )}
                    </SummarySection>
                )}
                {valgteEndringer.lovbestemtFerie && (
                    <SummarySection header={text('oppsummeringStep.ferie.tittel')}>
                        {lovbestemtFerie !== undefined && lovbestemtFerieErEndret ? (
                            <LovbestemtFerieOppsummering lovbestemtFerie={lovbestemtFerie} />
                        ) : (
                            <Alert variant="info">
                                <AppText id="oppsummeringStep.ferie.ingenEndringer" />
                            </Alert>
                        )}
                    </SummarySection>
                )}
                {harIngenEndringer ? (
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
                                <VStack gap="8">
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
