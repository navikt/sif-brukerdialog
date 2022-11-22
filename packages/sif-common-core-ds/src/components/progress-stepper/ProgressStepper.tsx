import { BodyShort, Heading, Stepper } from '@navikt/ds-react';
import Step, { StepperStepProps } from '@navikt/ds-react/esm/stepper/Step';
import React, { useState } from 'react';
import { Collapse, Expand } from '@navikt/ds-icons';
import { guid } from '@navikt/sif-common-utils/lib';
import './progressStepper.scss';

export interface ProgressStep extends Pick<StepperStepProps, 'completed'> {
    id: string;
    index: number;
    label: string;
    href?: string;
}

interface Props {
    steps: ProgressStep[];
    currentStepIndex: number;
    labels?: Labels;
    titleHeadingLevel?: '1' | '2';
    allStepsHeader?: React.ReactNode;
    allStepsFooter?: React.ReactNode;
    onStepSelect?: (step: ProgressStep) => void;
}

interface Labels {
    showAllStepsLabel?: string;
    allStepsSectionAriaLabel?: string;
    stepProgressLabelFunc: (currentStep: number, totalSteps: number) => string;
}

const defaultLabels: Labels = {
    showAllStepsLabel: 'Vis alle steg',
    allStepsSectionAriaLabel: 'Alle steg',
    stepProgressLabelFunc: (currentStep, totalSteps) => `Steg ${currentStep} av ${totalSteps}`,
};

const ProgressStepper: React.FunctionComponent<Props> = ({
    steps,
    currentStepIndex,
    allStepsHeader,
    allStepsFooter,
    labels = defaultLabels,
    titleHeadingLevel = '1',
    onStepSelect,
}) => {
    const [allStepsVisible, setAllStepsVisible] = useState(false);

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

    return (
        <div className="progressStepper">
            <div className="progressStepper__heading">
                <Heading size="xlarge" level={titleHeadingLevel}>
                    {step.label}
                </Heading>
            </div>
            <div className="progressStepper__progressBarWrapper" role="presentation" aria-hidden={true}>
                <div className="progressStepper__progressBar">
                    <div className="progressStepper__progressBar__progress" style={{ width: `${progress}%` }} />
                </div>
            </div>
            <div className="progressStepper__stepsInfo">
                <div className="progressStepper__stepsInfo_current">
                    <BodyShort>{labels.stepProgressLabelFunc(currentStepNumber, totalSteps)}</BodyShort>
                </div>
                <div className="progressStepper__stepsInfo_all">
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
                        {labels.showAllStepsLabel}
                    </button>
                </div>
            </div>
            <div id={contentContainerID} aria-hidden={allStepsVisible === false} aria-live="polite">
                {allStepsVisible && (
                    <section className="progressStepper__allSteps" aria-label={labels.allStepsSectionAriaLabel}>
                        {allStepsHeader && (
                            <BodyShort as="div" className="progressStepper__allSteps__header">
                                {allStepsHeader}
                            </BodyShort>
                        )}
                        <Stepper activeStep={currentStepNumber} onStepChange={handleStepChange}>
                            {steps.map((s) => (
                                <Step key={s.id} completed={s.completed} interactive={s.completed === true}>
                                    {s.label}
                                </Step>
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
        </div>
    );
};

export default ProgressStepper;
