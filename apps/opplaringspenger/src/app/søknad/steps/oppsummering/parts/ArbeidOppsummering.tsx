import React from 'react';
import SummaryBlock from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import { dateFormatter, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { ArbeidApiData } from '../../../../types/søknadApiData/SøknadApiData';

interface Props {
    arbeid?: ArbeidApiData;
}

const ArbeidOppsummering: React.FunctionComponent<Props> = ({ arbeid }) => (
    <SummarySection header="Arbeid">
        <SummaryBlock header="Startdato">
            {arbeid?.startdato !== undefined
                ? dateFormatter.full(ISODateToDate(arbeid.startdato))
                : 'Startdato ikke valgt'}
        </SummaryBlock>
    </SummarySection>
);

export default ArbeidOppsummering;
