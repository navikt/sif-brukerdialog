import React from 'react';
import { useIntl } from 'react-intl';
import CounsellorPanel from '@navikt/sif-common-core/lib/components/counsellor-panel/CounsellorPanel';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';

interface Props {
    navnPåVirksomheten: string;
}

const InfoTilFisker = ({ navnPåVirksomheten }: Props) => {
    const intl = useIntl();
    return (
        <CounsellorPanel>
            {intlHelper(intl, 'sifForms.virksomhet.veileder_fisker', { navnPåVirksomheten })}
        </CounsellorPanel>
    );
};

export default InfoTilFisker;
