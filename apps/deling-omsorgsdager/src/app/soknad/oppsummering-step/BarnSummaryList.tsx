import React from 'react';
import { useIntl } from 'react-intl';
import SummaryList from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-list/SummaryList';
import { prettifyDate } from '@navikt/sif-common-utils/lib/dateFormatter';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ApiBarn } from '../../types/SoknadApiData';
import { ISODateToDate } from '@navikt/sif-common-utils/lib';

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
                    ISODateToDate(fødselsdato)
                )} – ${navn}${fnr}`;
            }}
        />
    );
};

export default BarnSummaryList;
