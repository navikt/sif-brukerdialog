import { useSendSøknad, useSøknadContext, useSøknadsdataStatus } from '@app/hooks';
import { AppText, useAppIntl } from '@app/i18n';
import { getApiDataFromSøknadsdata } from '@app/utils';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Alert, Button, ErrorSummary, VStack } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { getIntlFormErrorHandler, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { FormLayout, SummarySection } from '@navikt/sif-common-ui';
import { getCheckedValidator } from '@navikt/sif-validation';
import { useEffect, useRef } from 'react';

import { useStepConfig } from '../../../hooks/useStepConfig';
import { StepId } from '../../config/StepId';
import SøknadStep from '../../SøknadStep';
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
                {valgteEndringer.tilsynsordning && (
                    <SummarySection header={text('oppsummeringStep.tilsynsordning.tittel')}>
                        {tilsynsordning !== undefined && tilsynsordningErEndret ? (
                            <TilsynsordningOppsummering
                                tilsynsordning={tilsynsordning}
                                tidOpprinnelig={sak.tilsynsordning.tilsynsdagerMap}
                            />
                        ) : (
                            <Alert variant="info">
                                <AppText id="oppsummeringStep.tilsynsordning.ingenEndringer" />
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
