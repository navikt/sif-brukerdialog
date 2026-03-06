import { VStack } from '@navikt/ds-react';
import { ProgressStep, ProgressStepper } from '@navikt/sif-common-ui/';

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
    return (
        <ApplicationPage documentTitle={documentTitle} applicationTitle={applicationTitle}>
            <VStack gap="space-40">
                <section aria-label="Skjema">
                    <VStack gap="space-40">
                        <ProgressStepper
                            steps={steps}
                            currentStepIndex={steps.findIndex((s) => s.id === stepId)}
                            onStepSelect={(step) => onStepSelect(step.id)}
                        />
                        <div>{children}</div>
                    </VStack>
                </section>
                <StepFooter onAbort={onAbort} onResumeLater={onResumeLater} />
            </VStack>
        </ApplicationPage>
    );
}
