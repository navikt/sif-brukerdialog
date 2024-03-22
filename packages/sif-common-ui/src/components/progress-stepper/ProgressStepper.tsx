import { BodyShort, Heading, Stepper } from '@navikt/ds-react';
import { StepperStepProps } from '@navikt/ds-react/Stepper';
import React, { useEffect, useRef, useState } from 'react';
import { Back, Collapse, Expand } from '@navikt/ds-icons';
import { guid } from '@navikt/sif-common-utils';
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
    allStepsHeader,
    allStepsFooter,
    labels,
    titleHeadingLevel = '1',
    includeBackLink = false,
    setFocusOnHeadingOnMount = true,
    onStepSelect,
}) => {
    const [allStepsVisible, setAllStepsVisible] = useState(false);
    const { text } = useUiIntl();

    const defaultLabels: Labels = {
        showAllStepsLabel: text('progressStepper.showAllStepsLabel'),
        goToPreviousStepLabel: text('progressStepper.goToPreviousStepLabel'),
        allStepsSectionAriaLabel: text('progressStepper.allStepsSectionAriaLabel'),
        navigasjonAriaLabel: text('progressStepper.navigasjonAriaLabel'),
        stepProgressLabelFunc: (currentStep, totalSteps) =>
            text('progressStepper.stegXavY', { currentStep, totalSteps }),
    };

    const labelsToUse: Labels = { ...defaultLabels, ...labels };

    const step = steps[currentStepIndex];
    const currentStepNumber = currentStepIndex + 1;
    const totalSteps = steps.length;
    const progress = (100 / totalSteps) * currentStepNumber;
    const contentContainerID = guid();

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

    const currentStepInfo = (
        <BodyShort as="div">{labelsToUse.stepProgressLabelFunc(currentStepNumber, totalSteps)}</BodyShort>
    );
    const includeGotoPreviousStepLink = onStepSelect !== undefined && includeBackLink === true;
    const currentStepInfoInHeader = includeGotoPreviousStepLink ? (
        <div className="progressStepper__heading__stepInfo">{currentStepInfo}</div>
    ) : undefined;

    const headingRef = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
        if (setFocusOnHeadingOnMount && headingRef.current) {
            headingRef.current.focus();
        }
    }, [setFocusOnHeadingOnMount]);

    return (
        <div className="progressStepper">
            <div className="progressStepper__heading">
                <Heading
                    tabIndex={-1}
                    size="xlarge"
                    level={titleHeadingLevel}
                    className="progressStepper__heading__title"
                    ref={headingRef}>
                    {currentStepInfoInHeader}
                    {step.label}
                </Heading>
            </div>
            <div className="progressStepper__progressBarWrapper" role="presentation" aria-hidden={true}>
                <div className="progressStepper__progressBar">
                    <div className="progressStepper__progressBar__progress" style={{ width: `${progress}%` }} />
                </div>
            </div>
            <nav aria-label={labelsToUse.navigasjonAriaLabel}>
                <div className="progressStepper__stepsInfo">
                    {includeGotoPreviousStepLink ? (
                        <BodyShort>
                            {currentStepIndex > 0 && (
                                <button
                                    type="button"
                                    onClick={handleBackClick}
                                    className="navds-read-more__button navds-body-short progressStepper__backLink">
                                    <Back className="progressStepper__backLink__icon" aria-hidden />
                                    {labelsToUse.goToPreviousStepLabel}
                                </button>
                            )}
                        </BodyShort>
                    ) : (
                        <>{currentStepInfo}</>
                    )}
                    <button
                        type="button"
                        className="navds-read-more__button navds-body-short"
                        aria-controls={contentContainerID}
                        aria-expanded={allStepsVisible}
                        onClick={() => {
                            setAllStepsVisible(!allStepsVisible);
                        }}>
                        {allStepsVisible === false && (
                            <Expand className="progressStepper__toggleAllStepsIcon" aria-hidden />
                        )}
                        {allStepsVisible && <Collapse className="progressStepper__toggleAllStepsIcon" aria-hidden />}
                        {labelsToUse.showAllStepsLabel}
                    </button>
                </div>
                <div id={contentContainerID} aria-hidden={allStepsVisible === false} aria-live="polite">
                    {allStepsVisible && (
                        <section
                            className="progressStepper__allSteps"
                            aria-label={labelsToUse.allStepsSectionAriaLabel}>
                            {allStepsHeader && (
                                <BodyShort as="div" className="progressStepper__allSteps__header">
                                    {allStepsHeader}
                                </BodyShort>
                            )}
                            <Stepper
                                activeStep={currentStepNumber}
                                onStepChange={onStepSelect ? handleStepChange : undefined}>
                                {steps.map((s) => (
                                    <Stepper.Step
                                        key={s.id}
                                        completed={s.completed}
                                        interactive={onStepSelect !== undefined && s.completed === true}>
                                        {s.label}
                                    </Stepper.Step>
                                ))}
                            </Stepper>
                            {allStepsFooter && (
                                <BodyShort as="div" className="progressStepper__allSteps__footer">
                                    {allStepsFooter}
                                </BodyShort>
                            )}
                        </section>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default ProgressStepper;
