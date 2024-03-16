import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik-ds';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { soknadStepUtils, Step } from '@navikt/sif-common-soknad-ds';
import { SoknadFormData } from '../types/SoknadFormData';
import { Søknadstype } from '../types/Søknadstype';
import { useSoknadContext } from './SoknadContext';
import SoknadFormComponents from './SoknadFormComponents';
import { StepID } from './soknadStepsConfig';
import { ProgressStep } from '@navikt/sif-common-ui';

interface OwnProps {
    id: StepID;
    onStepCleanup?: (values: SoknadFormData) => SoknadFormData;
    onSendSoknad?: () => void;
    submitButtonLabel?: string;
    showSubmitButton?: boolean;
    showButtonSpinner?: boolean;
    includeValidationSummary?: boolean;
    buttonDisabled?: boolean;
    pageTitle?: string;
    søknadstype: Søknadstype;
    showNotAllQuestionsAnsweredMessage?: boolean;
    children: React.ReactNode;
}

type Props = OwnProps;

const SoknadFormStep: React.FunctionComponent<Props> = ({
    id,
    onStepCleanup,
    onSendSoknad,
    children,
    showButtonSpinner,
    includeValidationSummary = true,
    showNotAllQuestionsAnsweredMessage,
    buttonDisabled,
    submitButtonLabel,
    søknadstype,
}) => {
    const intl = useIntl();
    const [pending, setPending] = useState(false);
    const { soknadStepsConfig, resetSoknad, gotoNextStepFromStep, continueSoknadLater } = useSoknadContext();
    const stepConfig = soknadStepsConfig[id];
    const navigate = useNavigate();

    const applicationTitle = intlHelper(intl, `application.title.${søknadstype}`);

    useLogSidevisning(id);

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
            cancelOrContinueLaterAriaLabel={intlHelper(intl, 'application.cancelOrContinueLaterLabel')}
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
                onBack={previousStepRoute ? () => navigate(previousStepRoute) : undefined}
                noButtonsContentRenderer={
                    showNotAllQuestionsAnsweredMessage
                        ? (): React.ReactNode => (
                              <UnansweredQuestionsInfo>
                                  <FormattedMessage id="page.form.ubesvarteSpørsmålInfo" />
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
