import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { AppText } from '../../../../i18n';

const DineBarnStepIntro = () => {
    return (
        <SifGuidePanel>
            <p>
                <AppText id="step.dineBarn.intro.tekst" />
            </p>
        </SifGuidePanel>
    );
};

export default DineBarnStepIntro;
