import { Alert, Button, ErrorSummary, Heading } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { useEffect, useRef } from 'react';
import { useSendSøknad, useSøknadContext, useSøknadsdataStatus } from '@hooks';
import { Back } from '@navikt/ds-icons';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-common-validation';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { DurationText, JaNeiSvar, SummarySection } from '@navikt/sif-common-ui';
import { ISODurationToDuration } from '@navikt/sif-common-utils';
import { getApiDataFromSøknadsdata } from '@utils';
import IkkeAnsattMelding from '../../../components/ikke-ansatt-melding/IkkeAnsattMelding';
import { useStepConfig } from '../../../hooks/useStepConfig';
import { AppText, useAppIntl } from '../../../i18n';
import { StepId } from '../../config/StepId';
import SøknadStep from '../../SøknadStep';
import ArbeidstidOppsummering from './ArbeidstidOppsummering';
import LovbestemtFerieOppsummering from './LovbestemtFerieOppsummering';
import { getOppsummeringStepInitialValues, oppsummeringStepUtils } from './oppsummeringStepUtils';
import './oppsummering.css';

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
    const { text, intl } = useAppIntl();
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

    const apiData = getApiDataFromSøknadsdata(søker.fødselsnummer, søknadsdata, sak, valgteEndringer, arbeidsgivere);

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
            <SifGuidePanel>
                <p>
                    <AppText id="oppsummeringStep.guide" />
                </p>
            </SifGuidePanel>

            {sak.harArbeidsgivereIkkeISak && ukjenteArbeidsforhold && (
                <Block margin="xxl">
                    <SummarySection header={text('oppsummeringStep.nyttArbeidsforhold.tittel')}>
                        {sak.arbeidsgivereIkkeISak.map((arbeidsgiver) => {
                            const arbeidsforhold = ukjenteArbeidsforhold.find(
                                (a) => a.organisasjonsnummer === arbeidsgiver.organisasjonsnummer,
                            );

                            if (!arbeidsforhold) {
                                return;
                            }
                            const getTestKey = (key: string) => `ukjentArbeidsforhold_${arbeidsgiver.key}_${key}`;
                            return (
                                <Block key={arbeidsgiver.key} padBottom="l">
                                    <Heading level="3" size="small">
                                        {arbeidsgiver.navn}
                                    </Heading>
                                    <Heading level="4" size="xsmall" spacing={true}>
                                        <AppText
                                            id="oppsummeringStep.arbeidsgiver.erAnsatt"
                                            values={{ arbeidsgivernavn: arbeidsgiver.navn }}
                                        />
                                    </Heading>
                                    <div data-testid={getTestKey('erAnsatt')}>
                                        <JaNeiSvar harSvartJa={arbeidsforhold.erAnsatt} />
                                    </div>
                                    {arbeidsforhold.erAnsatt === false && (
                                        <Block>
                                            <IkkeAnsattMelding />
                                        </Block>
                                    )}
                                    {arbeidsforhold.erAnsatt && (
                                        <>
                                            <Heading level="4" size="xsmall" spacing={true}>
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
                                        </>
                                    )}
                                </Block>
                            );
                        })}
                    </SummarySection>
                </Block>
            )}

            {(valgteEndringer.arbeidstid || (arbeidstid && arbeidstidErEndret)) && (
                <Block margin="xxl">
                    <SummarySection header={text('oppsummeringStep.arbeidstid.tittel')}>
                        {arbeidstid && arbeidstidErEndret ? (
                            <>
                                <ArbeidstidOppsummering
                                    arbeidstid={arbeidstid}
                                    arbeidsgivere={[...arbeidsgivere, ...sak.arbeidsgivereIkkeISak]}
                                />
                                {!harGyldigArbeidstid && (
                                    <Block margin="none" padBottom="l">
                                        <Alert variant="error">
                                            <AppText id="oppsummeringStep.arbeidstid.flereTimerEnnTilgjengelig" />
                                        </Alert>
                                    </Block>
                                )}
                            </>
                        ) : (
                            <Block padBottom="l">
                                <Alert variant="info">
                                    <AppText id="oppsummeringStep.arbeidstid.ingenEndringer" />
                                </Alert>
                            </Block>
                        )}
                    </SummarySection>
                </Block>
            )}
            {valgteEndringer.lovbestemtFerie && (
                <Block margin="xxl" padBottom="m">
                    <SummarySection header={text('oppsummeringStep.ferie.tittel')}>
                        {lovbestemtFerie !== undefined && lovbestemtFerieErEndret ? (
                            <LovbestemtFerieOppsummering lovbestemtFerie={lovbestemtFerie} />
                        ) : (
                            <Block padBottom="l">
                                <Alert variant="info">
                                    <AppText id="oppsummeringStep.ferie.ingenEndringer" />
                                </Alert>
                            </Block>
                        )}
                    </SummarySection>
                </Block>
            )}
            {harIngenEndringer ? (
                <FormBlock margin="l">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={goBack}
                        icon={<Back aria-label={text('oppsummeringStep.forrige.ariaLabel')} />}>
                        <AppText id="oppsummeringStep.forrige" />
                    </Button>
                </FormBlock>
            ) : (
                <FormBlock margin="l">
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
                                <>
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
                                        <FormBlock>
                                            <ErrorSummary ref={sendSøknadErrorSummary}>
                                                <ErrorSummaryItem>{sendSøknadError.message}</ErrorSummaryItem>
                                            </ErrorSummary>
                                        </FormBlock>
                                    )}
                                </>
                            );
                        }}
                    />
                </FormBlock>
            )}
        </SøknadStep>
    );
};

export default OppsummeringStep;
