import { FormattedMessage, useIntl } from 'react-intl';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const DineBarnStepIntro = () => {
    const intl = useIntl();
    return (
        <SifGuidePanel>
            <p>
                <FormattedMessage id="step.dineBarn.intro.1" />
            </p>
            <ExpandableInfo title={intlHelper(intl, 'step.dineBarn.intro.info.tittel')}>
                <FormattedMessage id="step.dineBarn.intro.info.tekst" />
            </ExpandableInfo>
        </SifGuidePanel>
    );
};

export default DineBarnStepIntro;
