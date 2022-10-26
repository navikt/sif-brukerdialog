import React from 'react';
import SummaryBlock from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import { OpplæringApiData } from '../../../../types/SøknadApiData';

interface Props {
    opplæring: OpplæringApiData;
}

const OpplæringOppsummering: React.FunctionComponent<Props> = ({ opplæring }) => (
    <SummarySection header="Opplæring">
        <SummaryBlock header="Beskrivelse">{opplæring.beskrivelse}</SummaryBlock>
    </SummarySection>
);

export default OpplæringOppsummering;
