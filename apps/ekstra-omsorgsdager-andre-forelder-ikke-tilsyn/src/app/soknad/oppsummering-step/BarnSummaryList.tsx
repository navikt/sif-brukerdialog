import React from 'react';
import SummaryList from '@navikt/sif-common-core/lib/components/summary-list/SummaryList';
import { ApiBarn } from '../../types/SoknadApiData';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';

interface Props {
    barn: ApiBarn[];
}

const BarnSummaryList = ({ barn }: Props) => {
    const intl = useIntl();
    return (
        <SummaryList
            items={barn}
            itemRenderer={({ norskIdentifikator: identitetsnummer, navn }: ApiBarn): string => {
                const fnr = identitetsnummer
                    ? intlHelper(intl, 'step.oppsummering.deres-felles-barn.listItem', { identitetsnummer })
                    : '';
                return `${navn}${fnr}`;
            }}
        />
    );
};

export default BarnSummaryList;
