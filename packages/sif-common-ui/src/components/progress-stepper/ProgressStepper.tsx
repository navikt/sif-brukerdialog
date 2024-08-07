import { BodyShort, Box, FormProgress, Heading, Link, VStack } from '@navikt/ds-react';
import { StepperStepProps } from '@navikt/ds-react/Stepper';
import React, { useEffect, useRef } from 'react';
import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { useUiIntl } from '../../i18n/ui.messages';
import './progressStepper.css';

export interface ProgressStep extends Pick<StepperStepProps, 'completed'> {
    id: string;
    index: number;
    label: string;
    href?: string;
}

interface Labels {
    showAllStepsLabel?: string;
    goToPreviousStepLabel: string;
    allStepsSectionAriaLabel?: string;
    navigasjonAriaLabel?: string;
    stepProgressLabelFunc: (currentStep: number, totalSteps: number) => string;
}

interface Props {
    steps: ProgressStep[];
    currentStepIndex: number;
    labels?: Labels;
    titleHeadingLevel?: '1' | '2';
    allStepsHeader?: React.ReactNode;
    allStepsFooter?: React.ReactNode;
    includeBackLink?: boolean;
    setFocusOnHeadingOnMount?: boolean;
    onStepSelect?: (step: ProgressStep) => void;
}

const ProgressStepper: React.FunctionComponent<Props> = ({
    steps,
    currentStepIndex,
    titleHeadingLevel = '1',
    includeBackLink = true,
    setFocusOnHeadingOnMount = true,
    onStepSelect,
}) => {
    const { text } = useUiIntl();

    const step = steps[currentStepIndex];

    const handleStepChange = (idx: number) => {
        if (onStepSelect) {
            onStepSelect(steps[idx - 1]);
        }
    };

    const handleBackClick = () => {
        if (onStepSelect) {
            onStepSelect(steps[currentStepIndex - 1]);
        }
    };

    const includeGotoPreviousStepLink = onStepSelect !== undefined && includeBackLink === true;

    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (setFocusOnHeadingOnMount && headingRef.current) {
            headingRef.current.focus();
        }
    }, [setFocusOnHeadingOnMount]);

    return (
        <VStack gap="5">
            {includeGotoPreviousStepLink && currentStepIndex ? (
                <Box paddingBlock="0 1">
                    <BodyShort size="medium">
                        <Link href="#" onClick={handleBackClick}>
                            <ArrowLeftIcon aria-hidden="true" />
                            {text('progressStepper.goToPreviousStepLabel')}
                        </Link>
                    </BodyShort>
                </Box>
            ) : undefined}

            <Heading
                tabIndex={-1}
                size="xlarge"
                level={titleHeadingLevel}
                className="progressStepper__heading__title"
                ref={headingRef}>
                {step.label}
            </Heading>

            <FormProgress activeStep={currentStepIndex + 1} totalSteps={steps.length}>
                {steps.map((s) => (
                    <FormProgress.Step
                        key={s.id}
                        completed={s.completed}
                        href="#"
                        onClick={(evt) => {
                            evt.stopPropagation();
                            evt.preventDefault();
                            handleStepChange(s.index + 1);
                        }}
                        interactive={onStepSelect !== undefined && s.completed === true}>
                        {s.label}
                    </FormProgress.Step>
                ))}
            </FormProgress>
        </VStack>
    );
};

export default ProgressStepper;
