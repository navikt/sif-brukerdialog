import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import SummaryList from '@navikt/sif-common-soknad-ds/src/components/summary-list/SummaryList';
import { UtenlandsoppholdApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';
import JaNeiSvar from '@navikt/sif-common-soknad-ds/src/components/summary-answers/JaNeiSvar';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import SummaryBlock from '@navikt/sif-common-soknad-ds/src/components/summary-block/SummaryBlock';
import { SummarySection } from '@navikt/sif-common-soknad-ds';
import { ISODateToDate, dateToday } from '@navikt/sif-common-utils';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export interface Props {
    bosteder: UtenlandsoppholdApiData[];
}

const MedlemskapOppsummering: React.FC<Props> = ({ bosteder }) => {
    const intl = useIntl();

    const bostederSiste12 = bosteder.filter((b) => dayjs(ISODateToDate(b.tilOgMed)).isSameOrBefore(dateToday));
    const bostederNeste12 = bosteder.filter((b) => dayjs(ISODateToDate(b.tilOgMed)).isSameOrAfter(dateToday));

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.medlemskap.header')}>
            <SummaryBlock header={intlHelper(intl, 'step.oppsummering.utlandetSiste12.header')}>
                <div data-testid="oppsummering-medlemskap-utlandetSiste12">
                    <JaNeiSvar harSvartJa={bostederSiste12.length > 0} />
                </div>
            </SummaryBlock>
            {bostederSiste12.length > 0 && (
                <Block margin="m">
                    <div data-testid="oppsummering-medlemskap-utlandetSiste12-list">
                        <SummaryList items={bostederSiste12} itemRenderer={renderUtenlandsoppholdIPeriodenSummary} />
                    </div>
                </Block>
            )}
            <SummaryBlock header={intlHelper(intl, 'step.oppsummering.utlandetNeste12.header')}>
                <div data-testid="oppsummering-medlemskap-utlandetNeste12">
                    <JaNeiSvar harSvartJa={bostederNeste12.length > 0} />
                </div>
            </SummaryBlock>
            {bostederNeste12.length > 0 && (
                <Block margin="m">
                    <div data-testid="oppsummering-medlemskap-utlandetNeste12-list">
                        <SummaryList items={bostederNeste12} itemRenderer={renderUtenlandsoppholdIPeriodenSummary} />
                    </div>
                </Block>
            )}
        </SummarySection>
    );
};

export default MedlemskapOppsummering;
