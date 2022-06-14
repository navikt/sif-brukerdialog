import React from 'react';
import NAVStepIndicator from 'nav-frontend-stegindikator/lib/stegindikator';
import Step from 'nav-frontend-stegindikator/lib/stegindikator-steg';

export interface StepIndicatorStep {
    id: string;
    index: number;
    label: string;
}

interface Props {
    activeStep: number;
    steps: StepIndicatorStep[];
}

const StepIndicator = ({ steps, activeStep }: Props) => {
    return (
        <NAVStepIndicator visLabel={false} autoResponsiv={false} aktivtSteg={activeStep}>
            {steps.map(({ id, index, label }) => {
                return <Step index={index} label={label} key={id} />;
            })}
        </NAVStepIndicator>
    );
};

export default StepIndicator;
