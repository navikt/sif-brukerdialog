import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { AppIntlShape, AppText } from '../../../i18n';

const IntroVeileder = () => {
    const inneværendeÅr = new Date().getFullYear();
    const forrigeÅr = inneværendeÅr - 1;
    return (
        <SifGuidePanel>
            <p>
                <AppText id="step.fravaer.info.1" />
            </p>
            <p>
                <AppText id="step.fravaer.info.2" values={{ forrigeÅr, inneværendeÅr }} />
            </p>
        </SifGuidePanel>
    );
};

const Tidsbegrensning = ({ text }: AppIntlShape, delvisdag?: boolean) => {
    return (
        <ExpandableInfo title={text('step.fravaer.info.ikkeHelg.tittel')}>
            {delvisdag && <AppText id="step.fravaer.delvisdag.info.ikkeHelg.tekst" />}
            {!delvisdag && <AppText id="step.fravaer.heledager.info.ikkeHelg.tekst" />}
        </ExpandableInfo>
    );
};

const FraværStepInfo = {
    IntroVeileder,
    Tidsbegrensning,
};

export default FraværStepInfo;
