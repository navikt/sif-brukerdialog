import { useState } from 'react';
import { StepId } from '../types/StepId';
import { useLocation } from 'react-router-dom';

export const useStepHistory = () => {
    const [lastSubmittetStep, setLastSubmittetStep] = useState<StepId | undefined>();
    const loc = useLocation();

    console.log(loc.pathname);

    return {
        stepSubmitted: (stepId: StepId) => {
            setLastSubmittetStep(stepId);
        },
        lastSubmittetStep,
    };
};
