import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { FormattedMessage } from 'react-intl';

interface Props {
    navnPåVirksomheten: string;
}

const InfoTilFisker = ({ navnPåVirksomheten }: Props) => {
    return (
        <SifGuidePanel compact={true}>
            <p>
                <FormattedMessage id="sifForms.virksomhet.veileder_fisker" values={{ navnPåVirksomheten }} />
            </p>
        </SifGuidePanel>
    );
};

export default InfoTilFisker;
