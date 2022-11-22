// import { Heading } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SoknadHeader from '@navikt/sif-common-core-ds/lib/components/soknad-header/SoknadHeader';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { StepConfigInterface, StepConfigItemTexts, StepID } from '../../config/stepConfig';
import { getStepTexts } from '../../utils/stepUtils';
import ProgressStepper, {
    ProgressStep,
} from '@navikt/sif-common-core-ds/lib/components/progress-stepper/ProgressStepper';
import { useNavigate } from 'react-router-dom';

export interface StepProps {
    id: StepID;
    bannerTitle?: string;
    validationSummary?: React.ReactNode;
    renderAriaStepInfo?: boolean;
}

interface OwnProps {
    stepConfig: StepConfigInterface;
    children: React.ReactNode;
}

type Props = OwnProps & StepProps;

const getProgressSteps = (stepConfig: StepConfigInterface, currentStepIndex: number, intl: IntlShape): ProgressStep[] =>
    Object.keys(stepConfig).map((id) => {
        const { stepIndicatorLabel } = getStepTexts(intl, id as any, stepConfig);
        const { index } = stepConfig[id];
        return {
            index,
            label: stepIndicatorLabel,
            id,
            completed: index < currentStepIndex,
        };
    });

const Step = ({ id, bannerTitle, stepConfig, validationSummary, children }: Props) => {
    const intl = useIntl();
    const conf = stepConfig[id];
    const navigateTo = useNavigate();
    const stepTexts: StepConfigItemTexts = getStepTexts(intl, id, stepConfig);

    useEffect(() => {
        const stepTitle = document.getElementById('stepTitle');
        if (stepTitle) {
            stepTitle.focus();
        }
    }, []);

    const handleStepSelect = (step: ProgressStep) => {
        if (step.href) {
            navigateTo(step.href);
        }
    };
    return (
        <Page
            title={stepTexts.pageTitle}
            topContentRenderer={() => (
                <>
                    <SoknadHeader title={bannerTitle || intlHelper(intl, 'banner.title')} level="2" />
                    {validationSummary !== undefined && validationSummary}
                </>
            )}>
            <div className="mt-4 mb-4">
                <ProgressStepper
                    steps={getProgressSteps(stepConfig, conf.index, intl)}
                    currentStepIndex={conf.index}
                    onStepSelect={handleStepSelect}
                />
            </div>
            <div className="mt-8">{children}</div>
        </Page>
    );
};

export default Step;
