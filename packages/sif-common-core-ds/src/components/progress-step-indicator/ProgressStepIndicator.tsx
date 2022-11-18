import { BodyShort, Heading, Stepper } from '@navikt/ds-react';
import Step, { StepperStepProps } from '@navikt/ds-react/esm/stepper/Step';
import React, { useState } from 'react';
import { Collapse, Expand } from '@navikt/ds-icons';
import { guid } from '@navikt/sif-common-utils/lib';
import bemUtils from '../../utils/bemUtils';
import ProgressBar from './ProgressBar';
import './progressStepIndicator.scss';

export interface ProgressStep extends Pick<StepperStepProps, 'completed'> {
    id: string;
    title: string;
    description?: React.ReactNode;
}

interface Props {
    steps: ProgressStep[];
    currentStepIndex: number;
    titleHeadingLevel?: '1' | '2';
    allStepsHeader?: React.ReactNode;
    allStepsFooter?: React.ReactNode;
}

const bem = bemUtils('progressStepIndicator');

const ProgressStepIndicator: React.FunctionComponent<Props> = ({
    steps,
    currentStepIndex,
    allStepsHeader,
    allStepsFooter,
    titleHeadingLevel = '1',
}) => {
    const [allStepsVisible, setAllStepsVisible] = useState(false);

    const step = steps[currentStepIndex];
    const stepNum = currentStepIndex + 1;
    const totalSteps = steps.length;
    const progress = (100 / totalSteps) * stepNum;
    const contentContainerID = guid();

    return (
        <div className={bem.block}>
            <Heading size="medium" level={titleHeadingLevel} className={bem.element('heading')}>
                {step.title}
            </Heading>
            <div className={bem.element('progressBarWrapper')} role="presentation" aria-hidden={true}>
                <ProgressBar percentage={progress} />
            </div>
            <div className={bem.element('info')}>
                <div className={bem.element('info__aktivtSteg')}>
                    <BodyShort>
                        Steg {stepNum} av {totalSteps}
                    </BodyShort>
                </div>
                <div className={bem.element('info__alleSteg')}>
                    <button
                        type="button"
                        className={'navds-read-more__button navds-body-short'}
                        aria-controls={contentContainerID}
                        aria-expanded={allStepsVisible}
                        onClick={() => {
                            setAllStepsVisible(!allStepsVisible);
                        }}>
                        {allStepsVisible === false && (
                            <Expand className={bem.element('expandCollapseIcon')} aria-hidden />
                        )}
                        {allStepsVisible && <Collapse className={bem.element('expandCollapseIcon')} aria-hidden />}
                        Vis alle steg
                    </button>
                </div>
            </div>
            <div id={contentContainerID} aria-hidden={allStepsVisible === false} aria-live="polite">
                {allStepsVisible && (
                    <section className={bem.element('allSteps')} aria-label="Alle steg">
                        {allStepsHeader && (
                            <BodyShort as="div" className={bem.element('allStepsHeader')}>
                                {allStepsHeader}
                            </BodyShort>
                        )}
                        <Stepper activeStep={stepNum}>
                            {steps.map((s) => (
                                <Step key={s.id} completed={s.completed} interactive={s.completed === true}>
                                    {s.title}
                                </Step>
                            ))}
                        </Stepper>
                        {allStepsFooter && (
                            <BodyShort as="div" className={bem.element('allStepsFooter')}>
                                {allStepsFooter}
                            </BodyShort>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProgressStepIndicator;
