import { FormattedMessage, useIntl } from 'react-intl';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';

const DineBarnStepIntro = () => {
    const intl = useIntl();
    return (
        <SifGuidePanel>
            <p>
                <FormattedMessage id="step.dineBarn.intro.1" />
            </p>
            <ExpandableInfo title={intlHelper(intl, 'step.dineBarn.intro.info.tittel')}>
                <Block>
                    <Heading level="4" size="xsmall" spacing={true}>
                        <FormattedMessage id="step.dineBarn.intro.info.barnUnder13.tittel" />
                    </Heading>
                    <FormattedMessage id="step.dineBarn.intro.info.barnUnder13.tekst" />
                </Block>
                <Block>
                    <Heading level="4" size="xsmall" spacing={true}>
                        <FormattedMessage id="step.dineBarn.intro.info.barnOver13.tittel" />
                    </Heading>
                    <FormattedMessage id="step.dineBarn.intro.info.barnOver13.tekst.1" />
                    <br />
                    <FormattedMessage id="step.dineBarn.intro.info.barnOver13.tekst.2" />
                </Block>
            </ExpandableInfo>
        </SifGuidePanel>
    );
};

export default DineBarnStepIntro;
