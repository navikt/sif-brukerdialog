import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guidePanel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import './stepIntroduction.less';

interface Props {
    ariaTitle?: string;
}

const StepIntroduction: React.FunctionComponent<Props> = ({ ariaTitle, children }) => {
    const intl = useIntl();
    return (
        <section aria-label={ariaTitle || intlHelper(intl, 'stepIntroduction.ariaTitle')}>
            <SifGuidePanel>
                <BodyShort as="div" className="stepIntroductionContent">
                    {children}
                </BodyShort>
            </SifGuidePanel>
        </section>
    );
};

export default StepIntroduction;
