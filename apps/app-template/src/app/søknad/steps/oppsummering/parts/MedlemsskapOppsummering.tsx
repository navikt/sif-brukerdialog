import React from 'react';
import SummaryBlock from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import { MedlemskapApiData } from '../../../../types/søknadApiData/SøknadApiData';

interface Props {
    medlemskap?: MedlemskapApiData;
}

const MedlemskapOppsummering: React.FunctionComponent<Props> = () => (
    <SummarySection header="Medlemskap">
        <SummaryBlock header="Ikke laget">Oppsummering ikke laget</SummaryBlock>
    </SummarySection>
);

export default MedlemskapOppsummering;
