import { FormattedMessage, IntlShape } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';

const IntroVeileder = () => {
    const inneværendeÅr = new Date().getFullYear();
    const forrigeÅr = inneværendeÅr - 1;
    return (
        <SifGuidePanel>
            <p>
                <FormattedMessage id="step.fravaer.info.1" />
            </p>
            <p>
                <FormattedMessage id="step.fravaer.info.2" values={{ forrigeÅr, inneværendeÅr }} />
            </p>
        </SifGuidePanel>
    );
};

const Tidsbegrensning = (intl: IntlShape, delvisdag?: boolean) => {
    return (
        <ExpandableInfo title={intlHelper(intl, 'step.fravaer.info.ikkeHelg.tittel')}>
            {delvisdag && <FormattedMessage id="step.fravaer.delvisdag.info.ikkeHelg.tekst" />}
            {!delvisdag && <FormattedMessage id="step.fravaer.heledager.info.ikkeHelg.tekst" />}
        </ExpandableInfo>
    );
};

const FraværStepInfo = {
    IntroVeileder,
    Tidsbegrensning,
};

export default FraværStepInfo;
