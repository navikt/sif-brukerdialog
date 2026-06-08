import { VStack } from '@navikt/ds-react';

import { ProgressStep, ProgressStepper } from '../../components';
import { useSifSoknadUiIntl } from '../../i18n';
import { ApplicationPage } from '../application-page/ApplicationPage';
import { StepFooter } from './StepFooter';

interface Props {
    documentTitle: string;
    applicationTitle: string;
    stepId: string;
    steps: ProgressStep[];
    children: React.ReactNode;
    onStepSelect: (stepId: string) => void;
    onAbort?: () => void;
    onResumeLater?: () => void;
}

export function StepPage({
    documentTitle,
    applicationTitle,
    stepId,
    steps,
    onStepSelect,
    onAbort,
    onResumeLater,
    children,
}: Props) {
    const { text } = useSifSoknadUiIntl();
    const currentStepIndex = steps.findIndex((s) => s.id === stepId);
    return (
        <ApplicationPage documentTitle={documentTitle} applicationTitle={applicationTitle}>
            <VStack gap="space-40">
                <section aria-label={text('@sifSoknadUi.stepPage.form.ariaLabel')}>
                    <VStack gap="space-40">
                        {steps.length > 0 && currentStepIndex !== -1 && (
                            <ProgressStepper
                                steps={steps}
                                currentStepIndex={currentStepIndex}
                                onStepSelect={(step) => onStepSelect(step.id)}
                            />
                        )}
                        <div>{children}</div>
                    </VStack>
                </section>
                <StepFooter onDelete={onAbort} onResumeLater={onResumeLater} />
            </VStack>
        </ApplicationPage>
    );
}
