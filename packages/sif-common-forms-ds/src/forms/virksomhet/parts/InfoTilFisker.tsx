import { useIntl } from 'react-intl';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';

interface Props {
    navnPåVirksomheten: string;
}

const InfoTilFisker = ({ navnPåVirksomheten }: Props) => {
    const intl = useIntl();
    return (
        <SifGuidePanel>{intlHelper(intl, 'sifForms.virksomhet.veileder_fisker', { navnPåVirksomheten })}</SifGuidePanel>
    );
};

export default InfoTilFisker;
