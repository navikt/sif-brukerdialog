import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import bemHelper from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { ProgressStep, ProgressStepper } from '@navikt/sif-common-ui';
import SoknadHeader from '../../../components/soknad-header/SoknadHeader';
import StepFooter from '../step-footer/StepFooter';
import './step.scss';

const bem = bemHelper('step');

interface Props {
    applicationTitle: string;
    steps: ProgressStep[];
    activeStepId: string;
    children: React.ReactNode;
    validationSummary?: React.ReactNode;
    topContentRenderer?: () => React.ReactElement<any>;
    onCancel?: () => void;
    onContinueLater?: () => void;
    cancelOrContinueLaterAriaLabel?: string;
}

function Step({
    applicationTitle,
    steps,
    activeStepId,
    onCancel,
    onContinueLater,
    validationSummary,
    cancelOrContinueLaterAriaLabel,
    children,
}: Props) {
    const currentStepIndex = steps.findIndex((s) => s.id === activeStepId);
    const navigate = useNavigate();
    const sectionRef = useRef<HTMLDivElement>(null);

    const stepTitle = steps[currentStepIndex].label;
    const pageTitle = `${stepTitle} - ${applicationTitle}`;

    const handleOnStepSelect = (step: ProgressStep) => {
        if (step.href) {
            navigate(step.href);
        }
    };
    return (
        <Page
            className={bem.block}
            title={pageTitle}
            topContentRenderer={() => (
                <>
                    <SoknadHeader title={applicationTitle} level="2" />
                    {validationSummary}
                </>
            )}>
            <section aria-label="Skjema" ref={sectionRef}>
                <ProgressStepper steps={steps} currentStepIndex={currentStepIndex} onStepSelect={handleOnStepSelect} />
                <Block margin="xxl">{children}</Block>
            </section>
            {(onCancel || onContinueLater) && (
                <div
                    role={cancelOrContinueLaterAriaLabel ? 'complementary' : undefined}
                    aria-label={cancelOrContinueLaterAriaLabel}>
                    <StepFooter onAvbrytOgSlett={onCancel} onAvbrytOgFortsettSenere={onContinueLater} />
                </div>
            )}
        </Page>
    );
}

export default Step;
