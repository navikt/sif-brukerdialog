import React from 'react';
import { useIntl } from 'react-intl';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import './stepIntroduction.less';

interface Props {
    ariaTitle?: string;
}

const StepIntroduction: React.FunctionComponent<Props> = ({ ariaTitle, children }) => {
    const intl = useIntl();
    return (
        <section className="stepIntroduction" aria-label={ariaTitle || intlHelper(intl, 'stepIntroduction.ariaTitle')}>
            <CounsellorPanel>{children}</CounsellorPanel>
        </section>
    );
};

export default StepIntroduction;
