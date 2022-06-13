import React from 'react';
import { useIntl } from 'react-intl';
import SummaryList from '@navikt/sif-common-core/lib/components/summary-list/SummaryList';
import { apiStringDateToDate, prettifyDate } from '@navikt/sif-common-core/lib/utils/dateUtils';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { ApiBarn } from '../../types/SoknadApiData';

interface Props {
    barn: ApiBarn[];
}

const BarnSummaryList: React.FunctionComponent<Props> = ({ barn }) => {
    const intl = useIntl();
    return (
        <SummaryList
            items={barn}
            itemRenderer={({ identitetsnummer, fødselsdato, navn }: ApiBarn): string => {
                const fnr = identitetsnummer ? ` (fnr. ${identitetsnummer})` : '';
                return `${intlHelper(intl, 'step.oppsummering.dine-barn.født')} ${prettifyDate(
                    apiStringDateToDate(fødselsdato)
                )} – ${navn}${fnr}`;
            }}
        />
    );
};

export default BarnSummaryList;
