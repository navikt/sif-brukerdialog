import React from 'react';
import BackLink from '@navikt/sif-common-core-ds/lib/components/back-link/BackLink';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import StepFooter from '@navikt/sif-common-core-ds/lib/components/step-footer/StepFooter';
import bemHelper from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import { FormikValidationErrorSummary } from '@navikt/sif-common-formik-ds/lib';
import { History } from 'history';
import StepIndicator, { StepIndicatorStep } from '../step-indicator/StepIndicator';

import './step.less';
import SoknadHeader from '@navikt/sif-common-core-ds/lib/components/soknad-header/SoknadHeader';
import { Heading } from '@navikt/ds-react';

const bem = bemHelper('step');

interface Props {
    pageTitle: string;
    stepTitle: string;
    bannerTitle?: string;
    backLinkHref?: string;
    steps: StepIndicatorStep[];
    activeStepId: string;
    previousStepTitle?: string;
    children: React.ReactNode;
    showStepIndicator?: boolean;
    useValidationErrorSummary?: boolean;
    onBackClick?: () => void;
    topContentRenderer?: () => React.ReactElement<any>;
    onCancel?: () => void;
    onContinueLater?: () => void;
    cancelOrContinueLaterAriaLabel?: string;
}

function Step({
    bannerTitle,
    pageTitle,
    stepTitle,
    backLinkHref,
    steps,
    activeStepId,
    useValidationErrorSummary,
    onCancel,
    onContinueLater,
    onBackClick,
    cancelOrContinueLaterAriaLabel,
    showStepIndicator = true,
    children,
    previousStepTitle,
}: Props) {
    const currentStepIndex = steps.findIndex((s) => s.id === activeStepId);
    return (
        <Page
            className={bem.block}
            title={pageTitle}
            topContentRenderer={() => (
                <>
                    {bannerTitle && (
                        <>
                            <SoknadHeader title={bannerTitle} />
                        </>
                    )}
                    {useValidationErrorSummary !== false && <FormikValidationErrorSummary />}
                </>
            )}>
            {(showStepIndicator || backLinkHref) && (
                <>
                    {backLinkHref && (
                        <BackLink
                            href={backLinkHref}
                            ariaLabel={previousStepTitle}
                            className={bem.element('backLink')}
                            onClick={(nextHref: string, history: History, event: React.SyntheticEvent) => {
                                event.preventDefault();
                                history.push(nextHref);
                                if (onBackClick) {
                                    onBackClick();
                                }
                            }}
                        />
                    )}
                    <div role="presentation" aria-hidden={true}>
                        <StepIndicator steps={steps} activeStep={currentStepIndex} />
                    </div>
                </>
            )}
            <section aria-label={`Steg ${currentStepIndex + 1} av ${steps.length}:  ${pageTitle}`}>
                <Block margin="xxl">
                    <Heading level="2" size="large" className={bem.element('title')}>
                        {stepTitle}
                    </Heading>
                </Block>

                <Block margin="xl">{children}</Block>

                {(onCancel || onContinueLater) && (
                    <div
                        role={cancelOrContinueLaterAriaLabel ? 'complementary' : undefined}
                        aria-label={cancelOrContinueLaterAriaLabel}>
                        <StepFooter onAvbrytOgSlett={onCancel} onAvbrytOgFortsettSenere={onContinueLater} />
                    </div>
                )}
            </section>
        </Page>
    );
}

export default Step;
