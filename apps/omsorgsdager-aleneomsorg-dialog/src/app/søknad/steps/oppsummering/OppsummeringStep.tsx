import { ErrorSummary } from '@navikt/ds-react';
import { useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { usePrevious } from '@navikt/sif-common-hooks';
import { ErrorPage } from '@navikt/sif-common-soknad-ds';
import { SummarySection } from '@navikt/sif-common-ui';
import ResetMellomagringButton from '../../../components/reset-mellomlagring-button/ResetMellomlagringButton';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { useSøknadContext } from '../../../søknad/context/hooks/useSøknadContext';
import SøknadStep from '../../../søknad/SøknadStep';
import { getSøknadStepConfig, getSøknadStepConfigForStep } from '../../../søknad/søknadStepConfig';
import { StepId } from '../../../types/StepId';
import { getApiDataFromSøknadsdata } from '../../../utils/søknadsdataToApiData/getApiDataFromSøknadsdata';
import BarnSummaryList from './BarnSummaryList';
import OmBarnaSummary from './OmBarnaSummary';
import OmSøkerOppsummering from './OmSøkerOppsummering';
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
    const intl = useIntl();
    const {
        state: { søknadsdata, søker, registrertBarn },
    } = useSøknadContext();

    const stepId = StepId.OPPSUMMERING;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { invalidSteps } = useSøknadsdataStatus(stepId, getSøknadStepConfig());
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

    const apiData = getApiDataFromSøknadsdata(søknadsdata, registrertBarn);

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
                              harBekreftetOpplysninger:
                                  values[OppsummeringFormFields.harBekreftetOpplysninger] === true,
                          })
                        : undefined;
                }}
                renderForm={() => {
                    return (
                        <>
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                submitDisabled={isSubmitting || hasInvalidSteps}
                                includeValidationSummary={true}
                                submitButtonLabel="Send søknad"
                                submitPending={isSubmitting}
                                backButtonDisabled={isSubmitting}
                                onBack={goBack}>
                                <OmSøkerOppsummering søker={søker} />

                                <OmBarnaSummary
                                    registrertBarn={registrertBarn}
                                    annetBarn={søknadsdata.omOmsorgenForBarn?.annetBarn}
                                />

                                <SummarySection
                                    header={intlHelper(intl, 'step.oppsummering.omOmsorgenForBarn.barnList.tittle')}>
                                    <Block margin="m">
                                        <BarnSummaryList barn={apiData.barn} />
                                    </Block>
                                </SummarySection>

                                <ConfirmationCheckbox
                                    disabled={isSubmitting}
                                    label={<FormattedMessage id="step.oppsummering.bekrefterOpplysninger" />}
                                    validate={getCheckedValidator()}
                                    name={OppsummeringFormFields.harBekreftetOpplysninger}
                                />
                            </Form>
                            {sendSøknadError && (
                                <FormBlock>
                                    <ErrorSummary ref={sendSøknadErrorSummary}>{sendSøknadError.message}</ErrorSummary>
                                </FormBlock>
                            )}
                        </>
                    );
                }}></FormikWrapper>
        </SøknadStep>
    );
};

export default OppsummeringStep;
