import './progressStepper.css';

import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, FormProgress, Heading, Link, VStack } from '@navikt/ds-react';
import { StepperStepProps } from '@navikt/ds-react/Stepper';
import React, { useEffect, useRef } from 'react';

import { useUiIntl } from '../../i18n/ui.messages';

export interface ProgressStep extends Pick<StepperStepProps, 'completed'> {
    id: string;
    index: number;
    label: string;
    href?: string;
}

interface Props {
    steps: ProgressStep[];
    currentStepIndex: number;
    titleHeadingLevel?: '1' | '2';
    allStepsHeader?: React.ReactNode;
    allStepsFooter?: React.ReactNode;
    includeBackLink?: boolean;
    setFocusOnHeadingOnMount?: boolean;
    singleStepMode?: boolean;
    stepTitle?: string;
    onStepSelect?: (step: ProgressStep) => void;
}

const ProgressStepper = ({
    steps,
    currentStepIndex,
    titleHeadingLevel = '1',
    includeBackLink = true,
    setFocusOnHeadingOnMount = true,
    singleStepMode = false,
    stepTitle,
    onStepSelect,
}: Props) => {
    const { text } = useUiIntl();

    const step = steps[currentStepIndex];

    const handleStepChange = (idx: number) => {
        if (onStepSelect) {
            onStepSelect(steps[idx - 1]);
        }
    };

    const handleBackClick = () => {
        if (onStepSelect) {
            if (singleStepMode) {
                onStepSelect(steps[steps.length - 1]);
            } else {
                onStepSelect(steps[currentStepIndex - 1]);
            }
        }
    };

    const includeGotoPreviousStepLink = singleStepMode
        ? currentStepIndex !== steps.length - 1
        : onStepSelect !== undefined && includeBackLink === true;

    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (setFocusOnHeadingOnMount && headingRef.current) {
            headingRef.current.focus();
        }
    }, [setFocusOnHeadingOnMount]);

    return (
        <VStack gap="space-20">
            {includeGotoPreviousStepLink && currentStepIndex ? (
                <Box paddingBlock="space-0 space-4">
                    <BodyShort size="medium" as="div">
                        <Link href="#" onClick={handleBackClick}>
                            <ArrowLeftIcon aria-hidden="true" />
                            {singleStepMode ? 'Tilbake' : text('@ui.progressStepper.goToPreviousStepLabel')}
                        </Link>
                    </BodyShort>
                </Box>
            ) : undefined}
            <Heading
                tabIndex={-1}
                size="large"
                level={titleHeadingLevel}
                className="progressStepper__heading__title"
                ref={headingRef}>
                {stepTitle ?? step.label}
            </Heading>
            {singleStepMode === false && (
                <FormProgress activeStep={currentStepIndex + 1} totalSteps={steps.length}>
                    {steps.map((s) => (
                        <FormProgress.Step
                            key={s.id}
                            completed={s.completed}
                            href="#"
                            onClick={
                                s.completed
                                    ? (evt) => {
                                          evt.stopPropagation();
                                          evt.preventDefault();
                                          handleStepChange(s.index + 1);
                                      }
                                    : undefined
                            }
                            interactive={onStepSelect !== undefined && s.completed === true}>
                            {s.label}
                        </FormProgress.Step>
                    ))}
                </FormProgress>
            )}
        </VStack>
    );
};

export default ProgressStepper;
