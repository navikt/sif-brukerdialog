import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useIntl } from 'react-intl';
import BackLink from '@navikt/sif-common-core/lib/components/back-link/BackLink';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { FormikValidationErrorSummary } from '@navikt/sif-common-formik-ds/lib';
import { History } from 'history';
import { StepConfigInterface, StepConfigItemTexts, StepID } from '../../config/stepConfig';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import PageBanner from '@navikt/sif-common-core-ds/lib/components/page/page-banner/PageBanner';
import { getStepTexts } from '../../utils/stepUtils';
import StepIndicator from './step-indicator/StepIndicator';

export interface StepProps {
    id: StepID;
    useValidationErrorSummary?: boolean;
    bannerTitle?: string;
}

interface OwnProps {
    stepConfig: StepConfigInterface;
    children: React.ReactNode;
}

type Props = OwnProps & StepProps;

const Step = ({ id, bannerTitle, stepConfig, useValidationErrorSummary, children }: Props) => {
    const intl = useIntl();
    const conf = stepConfig[id];
    const stepTexts: StepConfigItemTexts = getStepTexts(intl, id, stepConfig);
    return (
        <Page
            title={stepTexts.pageTitle}
            topContentRenderer={() => (
                <>
                    <PageBanner level="2">{bannerTitle || intlHelper(intl, 'banner.title')}</PageBanner>
                    {useValidationErrorSummary !== false && <FormikValidationErrorSummary />}
                </>
            )}>
            {conf.backLinkHref && (
                <BackLink
                    href={conf.backLinkHref}
                    className="absolute"
                    onClick={(nextHref: string, history: History, event: React.SyntheticEvent) => {
                        event.preventDefault();
                        history.push(nextHref);
                    }}
                />
            )}
            <div className="mt-8 text-center">
                <StepIndicator stepConfig={stepConfig} activeStep={conf.index} />
            </div>
            <div className="mt-12">
                <Heading level="1" size="large" className="text-center">
                    {stepTexts.stepTitle}
                </Heading>
            </div>
            <div className="mt-8">{children}</div>
        </Page>
    );
};

export default Step;
