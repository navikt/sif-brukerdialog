import React from 'react';
import SummaryBlock from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import { PleietrengendeApiData } from '../../../../types/søknadApiData/SøknadApiData';

interface Props {
    pleietrengende: PleietrengendeApiData;
}

const PleietrengendeOppsummering: React.FunctionComponent<Props> = ({ pleietrengende: { navn, alder } }) => (
    <SummarySection header="Pleietrengende">
        <SummaryBlock header="Navn">{navn}</SummaryBlock>
        <SummaryBlock header="Alder">{alder}</SummaryBlock>
    </SummarySection>
);

export default PleietrengendeOppsummering;
