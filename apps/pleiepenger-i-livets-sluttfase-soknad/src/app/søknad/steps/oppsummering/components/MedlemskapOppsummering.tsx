import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { JaNeiSvar, SummaryBlock, SummaryList, SummarySection } from '@navikt/sif-common-ui';
import { MedlemskapApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { renderUtenlandsoppholdIPeriodenSummary } from './renderUtenlandsoppholdSummary';
import { useAppIntl } from '../../../../i18n';

export interface Props {
    medlemskap: MedlemskapApiData;
}

const MedlemskapOppsummering: React.FC<Props> = ({ medlemskap }) => {
    const { text } = useAppIntl();
    const {
        harBoddIUtlandetSiste12Mnd,
        utenlandsoppholdSiste12Mnd,
        skalBoIUtlandetNeste12Mnd,
        utenlandsoppholdNeste12Mnd,
    } = medlemskap;
    return (
        <SummarySection header={text('step.oppsummering.medlemskap.header')}>
            <SummaryBlock header={text('step.oppsummering.utlandetSiste12.header')}>
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
            <SummaryBlock header={text('step.oppsummering.utlandetNeste12.header')}>
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
