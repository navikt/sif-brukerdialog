import React from 'react';
import { SummaryBlock, SummaryList, SummarySection } from '@navikt/sif-common-ui';
import { UtenlandsoppholdApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';
import { useAppIntl } from '../../../../i18n';

export interface Props {
    utenlandsopphold: UtenlandsoppholdApiData[];
}

const UtenlandsoppholdISøkeperiodeOppsummering: React.FC<Props> = ({ utenlandsopphold }) => {
    const { text } = useAppIntl();
    return utenlandsopphold && utenlandsopphold.length > 0 ? (
        <SummarySection header={text('step.oppsummering.utenlandsopphold.titel')}>
            <SummaryBlock header={text('step.oppsummering.utenlandsoppholdIPerioden.listetittel')}>
                <SummaryList items={utenlandsopphold} itemRenderer={renderUtenlandsoppholdIPeriodenSummary} />
            </SummaryBlock>
        </SummarySection>
    ) : null;
};

export default UtenlandsoppholdISøkeperiodeOppsummering;
