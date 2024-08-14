import React from 'react';
import { SummaryBlock, SummaryList } from '@navikt/sif-common-ui';
import { UtenlandsoppholdIPeriodenApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';
import { useAppIntl } from '../../../../i18n';

export interface Props {
    utenlandsopphold: UtenlandsoppholdIPeriodenApiData[];
}

const UtenlandsoppholdISøkeperiodeOppsummering: React.FC<Props> = ({ utenlandsopphold }) => {
    const { text } = useAppIntl();
    return utenlandsopphold && utenlandsopphold.length > 0 ? (
        <SummaryBlock header={text('step.oppsummering.utenlandsoppholdIPerioden.listetittel')}>
            <SummaryList
                useAkselList={true}
                items={utenlandsopphold}
                itemRenderer={renderUtenlandsoppholdIPeriodenSummary}
            />
        </SummaryBlock>
    ) : null;
};

export default UtenlandsoppholdISøkeperiodeOppsummering;
