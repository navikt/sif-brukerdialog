import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { FormattedMessage } from 'react-intl';

interface Props {
    navnPåVirksomheten: string;
}

const InfoTilFisker = ({ navnPåVirksomheten }: Props) => {
    return (
        <SifGuidePanel compact={true}>
            <p>
                <FormattedMessage id="@forms.virksomhet.veileder_fisker" values={{ navnPåVirksomheten }} />
            </p>
        </SifGuidePanel>
    );
};

export default InfoTilFisker;
