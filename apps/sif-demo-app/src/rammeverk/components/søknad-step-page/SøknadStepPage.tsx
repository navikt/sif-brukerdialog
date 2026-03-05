import { VStack } from '@navikt/ds-react';
import { ProgressStep, ProgressStepper } from '@navikt/sif-common-ui/';

import SøknadHeader from '../../../common/components/søknad-header/SøknadHeader';
import { DefaultPage } from '../default-page/DefaultPage';
import { StepFooter } from '../StepFooter';

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

export function SøknadStepPage({
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
        <DefaultPage documentTitle={`${documentTitle} - ${applicationTitle}`}>
            <VStack gap="space-40">
                <SøknadHeader title={applicationTitle} level="2" />
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
        </DefaultPage>
    );
}
