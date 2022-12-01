import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import { ProgressStep } from '@navikt/sif-common-core-ds/lib/components/progress-stepper/ProgressStepper';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik-ds/lib';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import Step from '@navikt/sif-common-soknad-ds/lib/soknad-step/step/Step';
import { ApplicationType } from '../types/ApplicationType';
import { SoknadFormData } from '../types/SoknadFormData';
import { useSoknadContext } from './SoknadContext';
import SoknadFormComponents from './SoknadFormComponents';
import { StepID } from './soknadStepsConfig';
import { useNavigate } from 'react-router-dom';
import { navigateTo } from '../utils/navigationUtils';
import { getApplicationPageRoute } from '../utils/routeUtils';

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
    søknadstype: ApplicationType;
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
    pageTitle,
    showNotAllQuestionsAnsweredMessage,
    buttonDisabled,
    submitButtonLabel,
    søknadstype,
}) => {
    const intl = useIntl();
    const { soknadStepsConfig, resetSoknad, gotoNextStepFromStep, continueSoknadLater } = useSoknadContext();
    const stepConfig = soknadStepsConfig[id];
    const navigate = useNavigate();

    const texts = soknadStepUtils.getStepTexts(intl, stepConfig);
    const applicationTitle = intlHelper(intl, `application.title.${søknadstype}`);

    useLogSidevisning(id);

    const steps: ProgressStep[] = soknadStepUtils.getProgressStepsFromConfig(soknadStepsConfig, stepConfig.index, intl);
    const { previousStep } = stepConfig;

    return (
        <Step
            bannerTitle={applicationTitle}
            cancelOrContinueLaterAriaLabel={intlHelper(intl, 'application.cancelOrContinueLaterLabel')}
            pageTitle={pageTitle || texts.pageTitle}
            steps={steps}
            activeStepId={id}
            onCancel={resetSoknad}
            onContinueLater={continueSoknadLater ? () => continueSoknadLater(id) : undefined}>
            <SoknadFormComponents.Form
                includeButtons={true}
                includeValidationSummary={includeValidationSummary}
                formErrorHandler={getFormErrorHandler(intl, 'validation')}
                submitPending={showButtonSpinner}
                submitDisabled={buttonDisabled}
                submitButtonLabel={submitButtonLabel}
                onBack={
                    previousStep
                        ? () => navigateTo(getApplicationPageRoute(søknadstype, previousStep), navigate)
                        : undefined
                }
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
                onValidSubmit={onSendSoknad ? onSendSoknad : (): void => gotoNextStepFromStep(id)}>
                {children}
            </SoknadFormComponents.Form>
        </Step>
    );
};

export default SoknadFormStep;
