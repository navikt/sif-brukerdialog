import React from 'react';
import { useIntl } from 'react-intl';

import { SummaryBlock, SummaryList } from '@navikt/sif-common-soknad-ds';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';
import { UtenlandsoppholdIPeriodenApiData } from '../../../../types/søknadApiData/SøknadApiData';

export interface Props {
    utenlandsopphold: UtenlandsoppholdIPeriodenApiData[];
}

const UtenlandsoppholdISøkeperiodeOppsummering: React.FC<Props> = ({ utenlandsopphold }) => {
    const intl = useIntl();
    return utenlandsopphold && utenlandsopphold.length > 0 ? (
        <SummaryBlock header={intlHelper(intl, 'step.oppsummering.utenlandsoppholdIPerioden.listetittel')}>
            <SummaryList items={utenlandsopphold} itemRenderer={renderUtenlandsoppholdIPeriodenSummary} />
        </SummaryBlock>
    ) : null;
};

export default UtenlandsoppholdISøkeperiodeOppsummering;
