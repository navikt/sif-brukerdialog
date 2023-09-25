import { FormattedMessage } from 'react-intl';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';

interface Props {
    navnPåVirksomheten: string;
}

const InfoTilFisker = ({ navnPåVirksomheten }: Props) => {
    return (
        <SifGuidePanel compact={true}>
            <FormattedMessage id="sifForms.virksomhet.veileder_fisker" values={{ navnPåVirksomheten }} />
        </SifGuidePanel>
    );
};

export default InfoTilFisker;
