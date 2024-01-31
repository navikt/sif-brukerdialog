import { useSendSøknad, useSøknadContext, useSøknadsdataStatus } from '@hooks';
import { Back } from '@navikt/ds-icons';
import { Alert, Button, ErrorSummary, Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { DurationText } from '@navikt/sif-common-ui';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/src/components/getTypedFormComponents';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { JaNeiSvar } from '@navikt/sif-common-ui';
import { usePrevious } from '@navikt/sif-common-hooks';
import { SummaryBlock, SummarySection } from '@navikt/sif-common-ui';
import { ISODurationToDuration } from '@navikt/sif-common-utils';
import { getApiDataFromSøknadsdata } from '@utils';
import { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import IkkeAnsattMelding from '../../../components/ikke-ansatt-melding/IkkeAnsattMelding';
import { useStepConfig } from '../../../hooks/useStepConfig';
import SøknadStep from '../../SøknadStep';
import { StepId } from '../../config/StepId';
import ArbeidstidOppsummering from './ArbeidstidOppsummering';
import LovbestemtFerieOppsummering from './LovbestemtFerieOppsummering';
import './oppsummering.css';
import { getOppsummeringStepInitialValues, oppsummeringStepUtils } from './oppsummeringStepUtils';

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
    const intl = useIntl();
    const {
        state: { søknadsdata, sak, arbeidsgivere, valgteEndringer },
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

    const apiData = getApiDataFromSøknadsdata(søknadsdata, sak, valgteEndringer, arbeidsgivere);

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
                    Nedenfor ser du endringene som du har lagt inn. Se over at alt stemmer før du sender inn. Hvis noe
                    ikke stemmer, kan du gå tilbake og endre igjen.
                </p>
            </SifGuidePanel>

            {sak.harArbeidsgivereIkkeISak && ukjenteArbeidsforhold && (
                <Block margin="xxl">
                    <SummarySection header="Nytt arbeidsforhold">
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
                                    <SummaryBlock
                                        level="4"
                                        header={`Stemmer det at du er ansatt hos ${arbeidsgiver.navn} i perioden du har søkt pleiepenger?`}>
                                        <div data-testid={getTestKey('erAnsatt')}>
                                            <JaNeiSvar harSvartJa={arbeidsforhold.erAnsatt} />
                                        </div>
                                        {arbeidsforhold.erAnsatt === false && (
                                            <Block>
                                                <IkkeAnsattMelding />
                                            </Block>
                                        )}
                                    </SummaryBlock>
                                    {arbeidsforhold.erAnsatt && (
                                        <>
                                            <SummaryBlock
                                                level="4"
                                                header={`Hvor mange timer jobber du normalt per uke hos ${arbeidsgiver.navn}?`}>
                                                <div data-testid={getTestKey('timerPerUke')}>
                                                    <DurationText
                                                        duration={ISODurationToDuration(
                                                            arbeidsforhold.normalarbeidstid.timerPerUke,
                                                        )}
                                                    />
                                                </div>
                                            </SummaryBlock>
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
                    <SummarySection header="Arbeidstid">
                        {arbeidstid && arbeidstidErEndret ? (
                            <>
                                <ArbeidstidOppsummering
                                    arbeidstid={arbeidstid}
                                    arbeidsgivere={[...arbeidsgivere, ...sak.arbeidsgivereIkkeISak]}
                                />
                                {!harGyldigArbeidstid && (
                                    <Block margin="none" padBottom="l">
                                        <Alert variant="error">
                                            Det er registrert flere timer enn det er tilgjengelig for en periode.
                                            Vennligst gå tilbake til steget for arbeidstid og korriger dette.
                                        </Alert>
                                    </Block>
                                )}
                            </>
                        ) : (
                            <Block padBottom="l">
                                <Alert variant="info">Det er ikke registrert noen endringer i arbeidstid</Alert>
                            </Block>
                        )}
                    </SummarySection>
                </Block>
            )}
            {valgteEndringer.lovbestemtFerie && (
                <Block margin="xxl" padBottom="m">
                    <SummarySection header="Endringer i ferie">
                        {lovbestemtFerie !== undefined && lovbestemtFerieErEndret ? (
                            <LovbestemtFerieOppsummering lovbestemtFerie={lovbestemtFerie} />
                        ) : (
                            <Block padBottom="l">
                                <Alert variant="info">Det er ikke registrert noen endringer i ferie</Alert>
                            </Block>
                        )}
                    </SummarySection>
                </Block>
            )}
            {harIngenEndringer ? (
                <FormBlock margin="l">
                    <Button type="button" variant="secondary" onClick={goBack} icon={<Back aria-label="Pil venstre" />}>
                        Forrige
                    </Button>
                </FormBlock>
            ) : (
                <FormBlock margin="l">
                    <FormikWrapper
                        initialValues={getOppsummeringStepInitialValues(søknadsdata)}
                        onSubmit={(values) => {
                            apiData
                                ? sendSøknad({
                                      ...apiData,
                                      harBekreftetOpplysninger:
                                          values[OppsummeringFormFields.harBekreftetOpplysninger] === true,
                                  })
                                : undefined;
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
                                        submitButtonLabel="Send melding om endring"
                                        submitPending={isSubmitting}
                                        backButtonDisabled={isSubmitting}
                                        onBack={goBack}>
                                        <ConfirmationCheckbox
                                            disabled={isSubmitting || harIngenEndringer || !harGyldigArbeidstid}
                                            label="Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til pleiepenger."
                                            validate={getCheckedValidator()}
                                            data-testid="bekreft-opplysninger"
                                            name={OppsummeringFormFields.harBekreftetOpplysninger}
                                        />
                                    </Form>
                                    {sendSøknadError && (
                                        <FormBlock>
                                            <ErrorSummary ref={sendSøknadErrorSummary}>
                                                {sendSøknadError.message}
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
