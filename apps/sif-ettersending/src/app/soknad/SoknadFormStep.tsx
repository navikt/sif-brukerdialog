import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik-ds';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { soknadStepUtils, Step } from '@navikt/sif-common-soknad-ds';
import { ProgressStep } from '@navikt/sif-common-ui';
import { AppText, useAppIntl } from '../i18n';
import { SoknadFormData } from '../types/SoknadFormData';
import { Søknadstype } from '../types/Søknadstype';
import { useSoknadContext } from './SoknadContext';
import SoknadFormComponents from './SoknadFormComponents';
import { StepID } from './soknadStepsConfig';

interface Props {
    id: StepID;
    onStepCleanup?: (values: SoknadFormData) => SoknadFormData;
    onSendSoknad?: () => void;
    submitButtonLabel?: string;
    isFinalSubmit?: boolean;
    showSubmitButton?: boolean;
    showButtonSpinner?: boolean;
    includeValidationSummary?: boolean;
    buttonDisabled?: boolean;
    pageTitle?: string;
    søknadstype: Søknadstype;
    showNotAllQuestionsAnsweredMessage?: boolean;
    children: React.ReactNode;
}

const SoknadFormStep = ({
    id,
    onStepCleanup,
    onSendSoknad,
    children,
    showButtonSpinner,
    includeValidationSummary = true,
    showNotAllQuestionsAnsweredMessage,
    buttonDisabled,
    submitButtonLabel,
    isFinalSubmit,
    søknadstype,
}: Props) => {
    const intl = useIntl();
    const { text } = useAppIntl();
    const [pending, setPending] = useState(false);
    const { soknadStepsConfig, resetSoknad, gotoNextStepFromStep, continueSoknadLater } = useSoknadContext();
    const stepConfig = soknadStepsConfig[id];
    const navigate = useNavigate();

    const applicationTitle = text(`application.title.${søknadstype}`);

    const steps: ProgressStep[] = soknadStepUtils.getProgressStepsFromConfig(soknadStepsConfig, stepConfig.index, intl);
    const { previousStepRoute } = stepConfig;

    const gotoNextStep = () => {
        setTimeout(() => {
            setPending(true);
            gotoNextStepFromStep(id);
        });
    };

    return (
        <Step
            applicationTitle={applicationTitle}
            cancelOrContinueLaterAriaLabel={text('application.cancelOrContinueLaterLabel')}
            steps={steps}
            activeStepId={id}
            onCancel={resetSoknad}
            onContinueLater={continueSoknadLater ? () => continueSoknadLater(id) : undefined}>
            <SoknadFormComponents.Form
                includeButtons={true}
                includeValidationSummary={includeValidationSummary}
                formErrorHandler={getFormErrorHandler(intl, 'validation')}
                submitPending={showButtonSpinner || pending}
                backButtonDisabled={pending || showButtonSpinner}
                submitDisabled={buttonDisabled}
                submitButtonLabel={submitButtonLabel}
                isFinalSubmit={isFinalSubmit}
                onBack={previousStepRoute ? () => navigate(previousStepRoute) : undefined}
                noButtonsContentRenderer={
                    showNotAllQuestionsAnsweredMessage
                        ? (): React.ReactNode => (
                              <UnansweredQuestionsInfo>
                                  <AppText id="page.form.ubesvarteSpørsmålInfo" />
                              </UnansweredQuestionsInfo>
                          )
                        : undefined
                }
                runDelayedFormValidation={true}
                cleanup={onStepCleanup}
                onValidSubmit={onSendSoknad ? onSendSoknad : gotoNextStep}>
                {children}
            </SoknadFormComponents.Form>
        </Step>
    );
};

export default SoknadFormStep;
