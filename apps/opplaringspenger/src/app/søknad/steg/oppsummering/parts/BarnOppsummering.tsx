import React from 'react';
import SummaryBlock from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { BarnApiData } from '../../../../types/SøknadApiData';

interface Props {
    barn: BarnApiData;
}

const BarnOppsummering: React.FunctionComponent<Props> = ({ barn }) => (
    <SummarySection header="Barn">
        <SummaryBlock header="Navn">
            {barn.fornavn} {barn.etternavn}
        </SummaryBlock>
        <SummaryBlock header="Fødselsdato">{dateFormatter.full(ISODateToDate(barn.fødselsdato))}</SummaryBlock>
    </SummarySection>
);

export default BarnOppsummering;
