import React, { useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import AnnenForelderSituasjonOppsummering from './AnnenForelderSituasjonOppsummering';
import AnnenForelderOppsummering from './AnnenForelderOppsummering';
import OmBarnaOppsummering from './OmBarnaOppsummering';
import OmSøkerOppsummering from './OmSøkerOppsummering';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { useSøknadContext } from 'app/søknad/context/hooks/useSøknadContext';
import { getSøknadStepConfig, getSøknadStepConfigForStep } from 'app/søknad/søknadStepConfig';
import { StepId } from '../../../types/StepId';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSendSøknad } from '../../../hooks/useSendSøknad';
import { usePrevious } from '@navikt/sif-common-core-ds/lib/hooks/usePrevious';
import SøknadStep from '../../SøknadStep';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { ErrorSummary } from '@navikt/ds-react';
import ResetMellomagringButton from '../../../components/reset-mellomlagring-button/ResetMellomlagringButton';
import { ErrorPage } from '@navikt/sif-common-soknad-ds/lib';
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
        state: { søknadsdata, søker, registrerteBarn },
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

    const apiData = getApiDataFromSøknadsdata(søknadsdata);

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
                onSubmit={() => {
                    sendSøknad(apiData);
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
                                <AnnenForelderOppsummering annenForelder={apiValues.annenForelder} />
                                <OmBarnaOppsummering apiData={apiData} registrerteBarn={registrerteBarn} />
                                <AnnenForelderSituasjonOppsummering annenForelder={apiValues.annenForelder} />

                                <ConfirmationCheckbox
                                    disabled={isSubmitting}
                                    label={
                                        <span data-testid="bekreft-label">
                                            <FormattedMessage id="steg.oppsummering.bekrefterOpplysninger" />
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
