import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import AriaText from '@navikt/sif-common-core-ds/lib/atoms/aria-text/AriaText';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import bemHelper from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { FormikValidationErrorSummary } from '@navikt/sif-common-formik-ds';
import { StepConfigInterface, StepConfigItemTexts } from '../../søknad/søknadStepsConfig';
import { StepID } from '../../types/StepID';
import { getStepTexts } from '../../utils/stepUtils';
import BackLink from '../back-link/BackLink';
import './step.less';

export interface StepProps {
    id: StepID;
    stepSubTitle?: string;
    onAvbryt: () => void;
    onFortsettSenere: () => void;
    useValidationErrorSummary?: boolean;
}

interface OwnProps {
    stepConfig: StepConfigInterface;
    children: React.ReactNode;
}

type Props = OwnProps & StepProps;

const bem = bemHelper('step');

const Step = ({ id, useValidationErrorSummary, stepConfig, children }: Props) => {
    const conf = stepConfig[id];
    const intl = useIntl();
    const stepTexts: StepConfigItemTexts = getStepTexts(intl, id, stepConfig);
    const ariaStepInfo = `Steg ${conf.stepNumber + 1} av ${Object.keys(stepConfig).length}`;

    return (
        <Page
            className={bem.block}
            title={stepTexts.pageTitle}
            topContentRenderer={() => (
                <>
                    <h1>{intlHelper(intl, 'application.title')}</h1>
                    {useValidationErrorSummary !== false && <FormikValidationErrorSummary />}
                </>
            )}>
            {conf.backLinkHref && (
                <BackLink href={`/soknad/${conf.backLinkHref}`} className={bem.element('backLink')} />
            )}
            <div role="presentation" aria-hidden="true">
                <Block margin={conf.backLinkHref ? 'none' : 'xl'}>Stegindikator</Block>
            </div>

            <Block margin="xxl">
                <Heading level="1" size="large" className={bem.element('title')}>
                    <AriaText>{ariaStepInfo}</AriaText>
                    {stepTexts.stepTitle}
                </Heading>
            </Block>
            <Block margin="xl">{children}</Block>
            {/* <StepFooter onAvbrytOgFortsettSenere={onFortsettSenere} onAvbrytOgSlett={onAvbryt} /> */}
        </Page>
    );
};

export default Step;
