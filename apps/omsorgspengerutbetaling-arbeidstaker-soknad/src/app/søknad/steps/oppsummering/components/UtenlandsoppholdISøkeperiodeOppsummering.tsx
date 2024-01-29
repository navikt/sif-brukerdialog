import React from 'react';
import { useIntl } from 'react-intl';
import { UtenlandsoppholdApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { SummaryBlock, SummaryList, SummarySection } from '@navikt/sif-common-soknad-ds';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';

export interface Props {
    utenlandsopphold: UtenlandsoppholdApiData[];
}

const UtenlandsoppholdISøkeperiodeOppsummering: React.FC<Props> = ({ utenlandsopphold }) => {
    const intl = useIntl();
    return utenlandsopphold && utenlandsopphold.length > 0 ? (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.utenlandsopphold.titel')}>
            <SummaryBlock header={intlHelper(intl, 'step.oppsummering.utenlandsoppholdIPerioden.listetittel')}>
                <SummaryList items={utenlandsopphold} itemRenderer={renderUtenlandsoppholdIPeriodenSummary} />
            </SummaryBlock>
        </SummarySection>
    ) : null;
};

export default UtenlandsoppholdISøkeperiodeOppsummering;
