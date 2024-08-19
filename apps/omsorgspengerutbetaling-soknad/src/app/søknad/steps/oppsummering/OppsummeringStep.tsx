import { ErrorSummary, VStack } from '@navikt/ds-react';
import { useEffect, useRef } from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { usePrevious } from '@navikt/sif-common-hooks';
import { ErrorPage } from '@navikt/sif-common-soknad-ds';
import ResetMellomagringButton from '../../../components/reset-mellomlagring-button/ResetMellomlagringButton';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { AppText, useAppIntl } from '../../../i18n';
import { useSøknadContext } from '../../../søknad/context/hooks/useSøknadContext';
import SøknadStep from '../../../søknad/SøknadStep';
import { getSøknadStepConfig, getSøknadStepConfigForStep } from '../../../søknad/søknadStepConfig';
import { StepId } from '../../../types/StepId';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import DineBarnOppsummering from './components/DineBarnOppsummering';
import FrilansOppsummering from './components/FrilansOppsummering';
import LegeerklæringOppsummering from './components/LegeerklæringOppsummering';
import MedlemskapOppsummering from './components/MedlemskapOppsummering';
import OmSøkerOppsummering from './components/OmSøkerOppsummering';
import SelvstendigOppsummering from './components/SelvstendigOppsummering';
import { getOppsummeringStepInitialValues } from './oppsummeringStepUtils';
import FraværSummary from './components/FraværSummary';

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
    const appIntl = useAppIntl();
    const { intl, text } = appIntl;
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

    const apiData = getApiDataFromSøknadsdata(søknadsdata, appIntl);

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
                    apiData
                        ? sendSøknad({
                              ...apiData,
                              bekreftelser: {
                                  harForståttRettigheterOgPlikter: apiData.bekreftelser.harForståttRettigheterOgPlikter,
                                  harBekreftetOpplysninger:
                                      values[OppsummeringFormFields.harBekreftetOpplysninger] === true,
                              },
                          })
                        : undefined;
                }}
                renderForm={() => {
                    return (
                        <div data-testid="oppsummering">
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                submitDisabled={isSubmitting || hasInvalidSteps}
                                includeValidationSummary={true}
                                submitButtonLabel={text('step.oppsummering.sendSøknad')}
                                isFinalSubmit={true}
                                submitPending={isSubmitting}
                                backButtonDisabled={isSubmitting}
                                onBack={goBack}>
                                <VStack gap="8">
                                    <OmSøkerOppsummering søker={søker} />

                                    <DineBarnOppsummering
                                        barn={apiData.barn}
                                        registrerteBarn={registrerteBarn}
                                        harSyktBarn={apiData.harSyktBarn}
                                        harAleneomsorg={apiData.harAleneomsorg}
                                        harDekketTiFørsteDagerSelv={apiData.harDekketTiFørsteDagerSelv}
                                        onEdit={() => gotoStep(StepId.DINE_BARN)}
                                    />

                                    <FraværSummary apiData={apiData} onEdit={() => gotoStep(StepId.FRAVÆR)} />
                                    <LegeerklæringOppsummering
                                        apiData={apiData}
                                        legeerklæringSøknadsdata={søknadsdata.legeerklæring}
                                        onEdit={() => gotoStep(StepId.LEGEERKLÆRING)}
                                    />

                                    <FrilansOppsummering
                                        frilans={apiData.frilans}
                                        onEdit={() => gotoStep(StepId.ARBEIDSSITUASJON)}
                                    />

                                    <SelvstendigOppsummering
                                        virksomhet={apiData.selvstendigNæringsdrivende}
                                        onEdit={() => gotoStep(StepId.ARBEIDSSITUASJON)}
                                    />

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
                                <FormBlock>
                                    <ErrorSummary ref={sendSøknadErrorSummary}>{sendSøknadError.message}</ErrorSummary>
                                </FormBlock>
                            )}
                        </div>
                    );
                }}></FormikWrapper>
        </SøknadStep>
    );
};

export default OppsummeringStep;
