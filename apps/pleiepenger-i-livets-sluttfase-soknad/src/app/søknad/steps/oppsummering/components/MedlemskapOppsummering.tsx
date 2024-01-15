import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import SummaryList from '@navikt/sif-common-soknad-ds/src/components/summary-list/SummaryList';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';
import JaNeiSvar from '@navikt/sif-common-soknad-ds/src/components/summary-answers/JaNeiSvar';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import SummaryBlock from '@navikt/sif-common-soknad-ds/src/components/summary-block/SummaryBlock';
import { SummarySection } from '@navikt/sif-common-soknad-ds';
import { MedlemskapApiData } from '../../../../types/søknadApiData/SøknadApiData';

export interface Props {
    medlemskap: MedlemskapApiData;
}

const MedlemskapOppsummering: React.FC<Props> = ({ medlemskap }) => {
    const intl = useIntl();
    const {
        harBoddIUtlandetSiste12Mnd,
        utenlandsoppholdSiste12Mnd,
        skalBoIUtlandetNeste12Mnd,
        utenlandsoppholdNeste12Mnd,
    } = medlemskap;
    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.medlemskap.header')}>
            <SummaryBlock header={intlHelper(intl, 'step.oppsummering.utlandetSiste12.header')}>
                <div data-testid="oppsummering-medlemskap-utlandetSiste12">
                    <JaNeiSvar harSvartJa={harBoddIUtlandetSiste12Mnd} />
                </div>
            </SummaryBlock>
            {harBoddIUtlandetSiste12Mnd && utenlandsoppholdSiste12Mnd.length > 0 && (
                <Block margin="m">
                    <div data-testid="oppsummering-medlemskap-utlandetSiste12-list">
                        <SummaryList
                            items={utenlandsoppholdSiste12Mnd}
                            itemRenderer={renderUtenlandsoppholdIPeriodenSummary}
                        />
                    </div>
                </Block>
            )}
            <SummaryBlock header={intlHelper(intl, 'step.oppsummering.utlandetNeste12.header')}>
                <div data-testid="oppsummering-medlemskap-utlandetNeste12">
                    <JaNeiSvar harSvartJa={skalBoIUtlandetNeste12Mnd} />
                </div>
            </SummaryBlock>
            {skalBoIUtlandetNeste12Mnd && utenlandsoppholdNeste12Mnd.length > 0 && (
                <Block margin="m">
                    <div data-testid="oppsummering-medlemskap-utlandetNeste12-list">
                        <SummaryList
                            items={utenlandsoppholdNeste12Mnd}
                            itemRenderer={renderUtenlandsoppholdIPeriodenSummary}
                        />
                    </div>
                </Block>
            )}
        </SummarySection>
    );
};

export default MedlemskapOppsummering;
