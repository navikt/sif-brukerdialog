import { useEffect, useRef } from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { ErrorPage } from '@navikt/sif-common-soknad-ds';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { useSøknadContext } from '../../../søknad/context/hooks/useSøknadContext';
import { getSøknadStepConfig, getSøknadStepConfigForStep } from '../../../søknad/søknadStepConfig';
import { StepId } from '../../../types/StepId';
import OmSøkerOppsummering from './components/OmSøkerOppsummering';
import { usePrevious } from '@navikt/sif-common-hooks';
import ResetMellomagringButton from '../../../components/reset-mellomlagring-button/ResetMellomlagringButton';
import SøknadStep from '../../../søknad/SøknadStep';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { ErrorSummary, VStack } from '@navikt/ds-react';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { getOppsummeringStepInitialValues } from './oppsummeringStepUtils';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import LegeerklæringOppsummering from './components/LegeerklæringOppsummering';
import PleietrengendePersonSummary from './components/PleietrengendePersonSummary';
import MedlemskapOppsummering from './components/MedlemskapOppsummering';
import TidsromOppsummering from './components/TidsromOppsummering';
import ArbeidssituasjonSummary from './arbeidssituasjon-summary/ArbeidssituasjonSummary';
import { ISODateToDate } from '@navikt/sif-common-utils';
import ArbeidIPeriodenSummary from './arbeid-i-perioden-summary/ArbeidIPeriodenSummary';
import { ErrorSummaryItem } from '@navikt/ds-react/ErrorSummary';
import { AppText, useAppIntl } from '../../../i18n';

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
    const { text, intl } = useAppIntl();
    const {
        state: { søknadsdata, søker, frilansoppdrag },
    } = useSøknadContext();

    const stepId = StepId.OPPSUMMERING;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { invalidSteps } = useSøknadsdataStatus(stepId, getSøknadStepConfig(søknadsdata));
    const hasInvalidSteps = invalidSteps.length > 0;

    const { goBack } = useStepNavigation(step);

    const { sendSøknad, isSubmitting, sendSøknadError } = useSendSøknad();
    const previousSøknadError = usePrevious(sendSøknadError);
    const sendSøknadErrorSummary = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (previousSøknadError === undefined && sendSøknadError !== undefined) {
            sendSøknadErrorSummary.current?.focus();
        }
    }, [previousSøknadError, sendSøknadError]);

    const apiData = getApiDataFromSøknadsdata(søknadsdata);

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

    const pleietrengendeId =
        søknadsdata.opplysningerOmPleietrengende?.type === 'pleietrengendeUtenFnr'
            ? søknadsdata.opplysningerOmPleietrengende.pleietrengendeId
            : [];

    return (
        <SøknadStep stepId={StepId.OPPSUMMERING}>
            <FormikWrapper
                initialValues={getOppsummeringStepInitialValues(søknadsdata)}
                onSubmit={(values) => {
                    apiData
                        ? sendSøknad(
                              {
                                  ...apiData,
                                  harBekreftetOpplysninger:
                                      values[OppsummeringFormFields.harBekreftetOpplysninger] === true,
                              },
                              søker,
                          )
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

                                    <PleietrengendePersonSummary
                                        flereSøkere={apiData.flereSokere}
                                        pleietrengende={apiData.pleietrengende}
                                        pleietrengendeId={pleietrengendeId}
                                    />

                                    <TidsromOppsummering
                                        apiData={apiData}
                                        dagerMedPleie={søknadsdata.tidsrom!.dagerMedPleie}
                                    />

                                    <ArbeidssituasjonSummary
                                        apiData={apiData}
                                        søknadsperiode={{
                                            from: ISODateToDate(apiData.fraOgMed),
                                            to: ISODateToDate(apiData.tilOgMed),
                                        }}
                                        frilansoppdrag={frilansoppdrag}
                                    />

                                    <ArbeidIPeriodenSummary
                                        apiValues={apiData}
                                        dagerMedPleie={søknadsdata.tidsrom?.dagerMedPleie || []}
                                        søknadsperiode={{
                                            from: ISODateToDate(apiData.fraOgMed),
                                            to: ISODateToDate(apiData.tilOgMed),
                                        }}
                                    />

                                    <MedlemskapOppsummering medlemskap={apiData.medlemskap} />

                                    <LegeerklæringOppsummering
                                        apiData={apiData}
                                        legeerklæringSøknadsdata={søknadsdata.legeerklæring}
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
                                    <ErrorSummary ref={sendSøknadErrorSummary}>
                                        <ErrorSummaryItem>{sendSøknadError.message}</ErrorSummaryItem>
                                    </ErrorSummary>
                                </FormBlock>
                            )}
                        </div>
                    );
                }}></FormikWrapper>
        </SøknadStep>
    );
};

export default OppsummeringStep;
