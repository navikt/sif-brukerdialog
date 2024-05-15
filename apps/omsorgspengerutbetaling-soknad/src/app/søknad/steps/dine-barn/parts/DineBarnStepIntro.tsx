import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { AppText, useAppIntl } from '../../../../i18n';

const DineBarnStepIntro = () => {
    const { text } = useAppIntl();
    return (
        <SifGuidePanel>
            <p>
                <AppText id="step.dineBarn.intro.1" />
            </p>
            <ExpandableInfo title={text('step.dineBarn.intro.info.tittel')}>
                <p>
                    <AppText id="step.dineBarn.intro.info.tekst.1" />
                </p>
                <p>
                    <AppText id="step.dineBarn.intro.info.tekst.2" />
                </p>
            </ExpandableInfo>
        </SifGuidePanel>
    );
};

export default DineBarnStepIntro;
