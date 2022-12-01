import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import ProgressStepper, {
    ProgressStep,
} from '@navikt/sif-common-core-ds/lib/components/progress-stepper/ProgressStepper';
import SoknadHeader from '@navikt/sif-common-core-ds/lib/components/soknad-header/SoknadHeader';
import StepFooter from '@navikt/sif-common-core-ds/lib/components/step-footer/StepFooter';
import bemHelper from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import './step.scss';

const bem = bemHelper('step');

interface Props {
    pageTitle: string;
    bannerTitle?: string;
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
    bannerTitle,
    pageTitle,
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
    const sectionRef = useRef<HTMLElement>(null);

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
                    {bannerTitle && <SoknadHeader title={bannerTitle} level="2" />}
                    {validationSummary}
                </>
            )}>
            <section aria-label="Skjemasteg" ref={sectionRef}>
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
