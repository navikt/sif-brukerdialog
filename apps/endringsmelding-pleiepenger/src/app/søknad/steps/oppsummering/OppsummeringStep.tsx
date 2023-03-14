import { Alert, BodyLong, ErrorSummary, Heading, Ingress, Link } from '@navikt/ds-react';
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { usePrevious } from '@navikt/sif-common-core-ds/lib/hooks/usePrevious';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { SummarySection } from '@navikt/sif-common-soknad-ds/lib';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { getValgteEndringer } from '../../../utils/endringTypeUtils';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import { StepId } from '../../config/StepId';
import { getSøknadStepConfig } from '../../config/søknadStepConfig';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import SøknadStep from '../../SøknadStep';
import ArbeidstidOppsummering from './ArbeidstidOppsummering';
import LovbestemtFerieOppsummering from './LovbestemtFerieOppsummering';
import {
    getOppsummeringStepInitialValues,
    harEndringerIArbeidstid,
    harEndringerILovbestemtFerieApiData,
} from './oppsummeringStepUtils';
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
    const intl = useIntl();
    const {
        state: { søknadsdata, sak, arbeidsgivere, hvaSkalEndres },
    } = useSøknadContext();

    const stepConfig = getSøknadStepConfig(sak, hvaSkalEndres);
    const step = stepConfig[stepId];
    const { hasInvalidSteps } = useSøknadsdataStatus(stepId, stepConfig);

    const { goBack } = useStepNavigation(step);

    const { sendSøknad, isSubmitting, sendSøknadError } = useSendSøknad();
    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    const apiData = getApiDataFromSøknadsdata(søknadsdata, sak);

    if (!apiData) {
        return <Alert variant="error">ApiData er undefined</Alert>;
    }

    const { arbeidstid, lovbestemtFerie } = apiData.ytelse;
    const { arbeidstidSkalEndres, lovbestemtFerieSkalEndres } = getValgteEndringer(hvaSkalEndres);

    const arbeidstidErEndret = harEndringerIArbeidstid(arbeidstid);
    const lovbestemtFerieErEndret = harEndringerILovbestemtFerieApiData(lovbestemtFerie);
    const harIngenEndringer = arbeidstidErEndret === false && lovbestemtFerieErEndret === false;

    if (harIngenEndringer) {
        return (
            <SøknadStep stepId={stepId} sak={sak} hvaSkalEndres={hvaSkalEndres}>
                <Alert variant="info">
                    <Heading level="2" size="small" spacing={true}>
                        Ingen endringer er registert
                    </Heading>
                    <BodyLong as="div">
                        <ul>
                            {arbeidstidSkalEndres && !harEndringerIArbeidstid && (
                                <li>
                                    Du har ikke gjort noen endringer i arbeidstiden din. Gå tilbake til forrige steg og
                                    gjør endringene.
                                </li>
                            )}
                            {lovbestemtFerieSkalEndres && !lovbestemtFerie && (
                                <li>Du har ikke gjort noen endringer i ferien</li>
                            )}
                        </ul>
                    </BodyLong>
                    <Link href="#" onClick={goBack}>
                        Gå tilbake
                    </Link>
                </Alert>
            </SøknadStep>
        );
    }

    return (
        <SøknadStep stepId={stepId} sak={sak} hvaSkalEndres={hvaSkalEndres}>
            <SifGuidePanel>
                <Ingress as="div">
                    <p>
                        Nedenfor ser du endringene som du har lagt inn. Se over at alt stemmer før du sender inn. Dersom
                        noe ikke stemmer, kan du gå tilbake og endre igjen.
                    </p>
                </Ingress>
            </SifGuidePanel>

            {arbeidstidErEndret === false && lovbestemtFerieErEndret === false && (
                <Block padBottom="l">
                    <Alert variant="info">Det er ikke registrert noen endringer i arbeidstid eller ferie</Alert>
                </Block>
            )}

            {arbeidstidSkalEndres && (
                <Block margin="xxl">
                    <SummarySection header="Endringer i arbeidstid">
                        {arbeidstid && arbeidstidErEndret && (
                            <ArbeidstidOppsummering arbeidstid={arbeidstid} arbeidsgivere={arbeidsgivere} />
                        )}
                    </SummarySection>
                </Block>
            )}
            {lovbestemtFerieSkalEndres && (
                <Block margin="xxl" padBottom="m">
                    <SummarySection header="Endringer i lovbestemt ferie">
                        {lovbestemtFerie !== undefined && lovbestemtFerieErEndret && (
                            <LovbestemtFerieOppsummering lovbestemtFerie={lovbestemtFerie} />
                        )}
                    </SummarySection>
                </Block>
            )}
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
                                    submitDisabled={isSubmitting || hasInvalidSteps || harIngenEndringer}
                                    includeValidationSummary={true}
                                    submitButtonLabel="Send melding om endring"
                                    submitPending={isSubmitting}
                                    backButtonDisabled={isSubmitting}
                                    onBack={goBack}>
                                    <ConfirmationCheckbox
                                        disabled={isSubmitting || harIngenEndringer}
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
        </SøknadStep>
    );
};

export default OppsummeringStep;
