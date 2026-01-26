import { ErrorSummary, VStack } from '@navikt/ds-react';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { getIntlFormErrorHandler, getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { usePrevious } from '@navikt/sif-common-hooks';
import { ErrorPage } from '@navikt/sif-common-soknad-ds';
import { getCheckedValidator } from '@navikt/sif-validation';
import { useEffect, useRef } from 'react';

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
import ArbeidsforholdSummaryView from './components/ArbeidsforholdSummaryView';
import DeltBostedOppsummering from './components/DeltBostedOppsummering';
import DineBarnOppsummering from './components/DineBarnOppsummering';
import LegeerklæringOppsummering from './components/LegeerklæringOppsummering';
import MedlemskapOppsummering from './components/MedlemskapOppsummering';
import OmSøkerOppsummering from './components/OmSøkerOppsummering';
import UtenlandsoppholdISøkeperiodeOppsummering from './components/UtenlandsoppholdISøkeperiodeOppsummering';
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
    const { intl, text, locale } = useAppIntl();
    const {
        state: { søknadsdata, søker, registrerteBarn },
    } = useSøknadContext();

    const stepId = StepId.OPPSUMMERING;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { invalidSteps } = useSøknadsdataStatus(stepId, getSøknadStepConfig(søknadsdata));
    const hasInvalidSteps = invalidSteps.length > 0;

    const { goBack, gotoStep } = useStepNavigation(step);

    const { sendSøknad, isSubmitting, sendSøknadError } = useSendSøknad();
    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    const apiData = getApiDataFromSøknadsdata(søker.fødselsnummer, søknadsdata, locale);

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
                        sendSøknad({
                            ...apiData,
                            bekreftelser: {
                                harForståttRettigheterOgPlikter: apiData.bekreftelser.harForståttRettigheterOgPlikter,
                                harBekreftetOpplysninger:
                                    values[OppsummeringFormFields.harBekreftetOpplysninger] === true,
                            },
                        });
                    }
                }}
                renderForm={() => {
                    return (
                        <VStack gap="space-32" data-testid="oppsummering">
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                submitDisabled={isSubmitting || hasInvalidSteps}
                                includeValidationSummary={true}
                                submitButtonLabel={text('step.oppsummering.sendSøknad')}
                                isFinalSubmit={true}
                                submitPending={isSubmitting}
                                backButtonDisabled={isSubmitting}
                                onBack={goBack}>
                                <VStack gap="space-32">
                                    {/* Om deg */}
                                    <OmSøkerOppsummering søker={søker} />

                                    {/* Dine barn */}
                                    <DineBarnOppsummering
                                        barn={apiData.dineBarn.barn}
                                        harDeltBosted={søknadsdata.dineBarn?.harDeltBosted}
                                        registrerteBarn={registrerteBarn}
                                        onEdit={() => gotoStep(StepId.DINE_BARN)}
                                    />

                                    {/* Delt bosted */}
                                    {søknadsdata.deltBosted ? (
                                        <DeltBostedOppsummering
                                            vedlegg={apiData.vedlegg}
                                            deltBostedSøknadsdata={søknadsdata.deltBosted}
                                            onEdit={() => gotoStep(StepId.DELT_BOSTED)}
                                        />
                                    ) : null}

                                    {/* Fravær fra arbeid */}
                                    <ArbeidsforholdSummaryView
                                        listeAvArbeidsforhold={apiData.arbeidsgivere}
                                        søknadsdata={søknadsdata}
                                        onEdit={() => gotoStep(StepId.SITUASJON)}
                                    />

                                    {/* Utenlandsopphold */}
                                    <UtenlandsoppholdISøkeperiodeOppsummering
                                        utenlandsopphold={apiData.opphold}
                                        onEdit={() => gotoStep(StepId.FRAVÆR)}
                                    />

                                    {/* Vedlegg */}
                                    <LegeerklæringOppsummering
                                        vedlegg={apiData.vedlegg}
                                        legeerklæringSøknadsdata={søknadsdata.legeerklæring}
                                        onEdit={() => gotoStep(StepId.LEGEERKLÆRING)}
                                    />

                                    {/* Medlemskap i folketrygden */}
                                    <MedlemskapOppsummering
                                        bosteder={apiData.bosteder}
                                        onEdit={() => gotoStep(StepId.MEDLEMSKAP)}
                                    />

                                    <ConfirmationCheckbox
                                        disabled={isSubmitting}
                                        label={
                                            <span data-testid="bekreft-label">
                                                <AppText id="step.oppsummering.bekrefterOpplysninger" />
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
