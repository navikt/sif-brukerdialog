import { useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { ErrorPage, SummarySection } from '@navikt/sif-common-soknad-ds/lib';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { useSøknadContext } from '../../../søknad/context/hooks/useSøknadContext';
import { getSøknadStepConfig, getSøknadStepConfigForStep } from '../../../søknad/søknadStepConfig';
import { StepId } from '../../../types/StepId';
import OmSøkerOppsummering from './components/OmSøkerOppsummering';
import { usePrevious } from '@navikt/sif-common-hooks';
import ResetMellomagringButton from '../../../components/reset-mellomlagring-button/ResetMellomlagringButton';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import SøknadStep from '../../../søknad/SøknadStep';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { ErrorSummary } from '@navikt/ds-react';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { getOppsummeringStepInitialValues } from './oppsummeringStepUtils';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import LegeerklæringOppsummering from './components/LegeerklæringOppsummering';
import DineBarnOppsummering from './components/DineBarnOppsummering';
import MedlemskapOppsummering from './components/MedlemskapOppsummering';
import FrilansOppsummering from './components/FrilansOppsummering';
import SelvstendigOppsummering from './components/SelvstendigOppsummering';
import UtenlandsoppholdISøkeperiodeOppsummering from './components/UtenlandsoppholdISøkeperiodeOppsummering';
import UtbetalingsperioderOppsummering from './components/UtbetalingsperioderOppsummering';

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
    const intl = useIntl();
    const {
        state: { søknadsdata, søker, registrerteBarn },
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

    const apiData = getApiDataFromSøknadsdata(søknadsdata, registrerteBarn, intl);

    if (!apiData) {
        return (
            <ErrorPage
                contentRenderer={() => {
                    return (
                        <>
                            <p>
                                <FormattedMessage id="apiDataValidation.undefined" />
                            </p>
                            <p>
                                <FormattedMessage id="resetMellomlagring.text.1" />
                            </p>
                            <ResetMellomagringButton label={intlHelper(intl, 'resetMellomlagring.startPåNytt')} />
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
                                submitButtonLabel="Send søknad"
                                submitPending={isSubmitting}
                                backButtonDisabled={isSubmitting}
                                onBack={goBack}>
                                <OmSøkerOppsummering søker={søker} />
                                <DineBarnOppsummering
                                    barn={apiData.barn}
                                    harDekketTiFørsteDagerSelv={apiData.harDekketTiFørsteDagerSelv}
                                />
                                <SummarySection header={intlHelper(intl, 'step.oppsummering.utbetalinger.header')}>
                                    <UtbetalingsperioderOppsummering
                                        utbetalingsperioder={apiData.utbetalingsperioder}
                                    />
                                    <UtenlandsoppholdISøkeperiodeOppsummering utenlandsopphold={apiData.opphold} />
                                </SummarySection>

                                <FrilansOppsummering frilans={apiData.frilans} />
                                <SelvstendigOppsummering virksomhet={apiData.selvstendigNæringsdrivende} />
                                <MedlemskapOppsummering bosteder={apiData.bosteder} />

                                <LegeerklæringOppsummering
                                    apiData={apiData}
                                    legeerklæringSøknadsdata={søknadsdata.legeerklæring}
                                />

                                <ConfirmationCheckbox
                                    disabled={isSubmitting}
                                    label={
                                        <span data-testid="bekreft-label">
                                            <FormattedMessage id="step.oppsummering.bekrefterOpplysninger" />
                                        </span>
                                    }
                                    validate={getCheckedValidator()}
                                    name={OppsummeringFormFields.harBekreftetOpplysninger}
                                />
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
