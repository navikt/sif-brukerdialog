import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
    steps: number;
    currentStep: number;
}

const AriaStepInfo: React.FunctionComponent<Props> = ({ steps, currentStep }) => {
    const intl = useIntl();
    return <div className="sr-only">{intlHelper(intl, 'ariaStepInfo', { currentStep, step: currentStep, steps })}</div>;
};

export default AriaStepInfo;
