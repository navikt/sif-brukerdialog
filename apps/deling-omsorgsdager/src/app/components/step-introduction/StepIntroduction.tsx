import { BodyLong } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import './stepIntroduction.scss';

interface Props {
    ariaTitle?: string;
}

const StepIntroduction: React.FunctionComponent<Props> = ({ ariaTitle, children }) => {
    const intl = useIntl();
    return (
        <section aria-label={ariaTitle || intlHelper(intl, 'stepIntroduction.ariaTitle')}>
            <SifGuidePanel>
                <BodyLong as="div" className="stepIntroductionContent">
                    {children}
                </BodyLong>
            </SifGuidePanel>
        </section>
    );
};

export default StepIntroduction;
