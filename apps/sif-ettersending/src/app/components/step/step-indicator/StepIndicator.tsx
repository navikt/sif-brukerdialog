import * as React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import StegIndikator from 'nav-frontend-stegindikator/lib/stegindikator';
import { default as Step } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { StepConfigInterface } from '../../../config/stepConfig';
import { getStepTexts } from '../../../utils/stepUtils';

interface Props {
    activeStep: number;
    stepConfig: StepConfigInterface;
}

const renderSteps = (stepConfig: StepConfigInterface, intl: IntlShape) =>
    Object.keys(stepConfig).map((stepId) => {
        const { stepIndicatorLabel } = getStepTexts(intl, stepId as any, stepConfig);
        const { index } = stepConfig[stepId];
        return <Step label={stepIndicatorLabel} index={index} key={`${stepIndicatorLabel + index}`} />;
    });

const StepIndicator = ({ activeStep, stepConfig }: Props) => {
    const intl = useIntl();
    return (
        <StegIndikator visLabel={false} autoResponsiv={false} aktivtSteg={activeStep}>
            {renderSteps(stepConfig, intl)}
        </StegIndikator>
    );
};

export default StepIndicator;
