import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik-ds/lib';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import StepSubmitButton from '@navikt/sif-common-soknad-ds/lib/soknad-step/step-submit-button/StepSubmitButton';
import Step from '@navikt/sif-common-soknad-ds/lib/soknad-step/step/Step';
import { SoknadFormData } from '../types/SoknadFormData';
import { useSoknadContext } from './SoknadContext';
import SoknadFormComponents from './SoknadFormComponents';
import { StepID } from '../config/stepConfig';
import { ApplicationType } from '../types/ApplicationType';

interface OwnProps {
    id: StepID;
    onStepCleanup?: (values: SoknadFormData) => SoknadFormData;
    onSendSoknad?: () => void;
    showSubmitButton?: boolean;
    showButtonSpinner?: boolean;
    includeValidationSummary?: boolean;
    buttonDisabled?: boolean;
    stepTitle?: string;
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
    showSubmitButton = true,
    includeValidationSummary = true,
    stepTitle,
    pageTitle,
    showNotAllQuestionsAnsweredMessage,
    buttonDisabled,
    søknadstype,
}) => {
    const intl = useIntl();
    const { soknadStepsConfig, resetSoknad, gotoNextStepFromStep, continueSoknadLater } = useSoknadContext();
    const stepConfig = soknadStepsConfig[id];

    const texts = soknadStepUtils.getStepTexts(intl, stepConfig);
    const applicationTitle = intlHelper(intl, `application.title.${søknadstype}`);

    useLogSidevisning(id);

    return (
        <Step
            bannerTitle={applicationTitle}
            cancelOrContinueLaterAriaLabel={intlHelper(intl, 'application.cancelOrContinueLaterLabel')}
            stepTitle={stepTitle || texts.stepTitle}
            pageTitle={pageTitle || texts.pageTitle}
            backLinkHref={stepConfig.previousStepRoute ? `/${søknadstype}${stepConfig.previousStepRoute}` : undefined}
            steps={soknadStepUtils.getStepIndicatorStepsFromConfig(soknadStepsConfig, intl)}
            activeStepId={id}
            onCancel={resetSoknad}
            onContinueLater={continueSoknadLater ? () => continueSoknadLater(id) : undefined}>
            <SoknadFormComponents.Form
                includeButtons={false}
                includeValidationSummary={includeValidationSummary}
                formErrorHandler={getFormErrorHandler(intl, 'validation')}
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
                onValidSubmit={onSendSoknad ? onSendSoknad : (): void => gotoNextStepFromStep(id)}
                formFooter={
                    showSubmitButton ? (
                        <Block textAlignCenter={true} margin="xl">
                            <StepSubmitButton disabled={buttonDisabled} showSpinner={showButtonSpinner}>
                                {texts.nextButtonLabel}
                            </StepSubmitButton>
                        </Block>
                    ) : undefined
                }>
                {children}
            </SoknadFormComponents.Form>
        </Step>
    );
};

export default SoknadFormStep;
