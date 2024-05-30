import React from 'react';
import { VirksomhetApiData } from '@navikt/sif-common-forms-ds';
import VirksomhetSummary from '@navikt/sif-common-forms-ds/src/forms/virksomhet/VirksomhetSummary';
import { JaNeiSvar, SummaryBlock, SummarySection } from '@navikt/sif-common-ui';
import { useAppIntl } from '../../../../i18n';

interface Props {
    virksomhet?: VirksomhetApiData;
}

const SelvstendigOppsummering: React.FC<Props> = ({ virksomhet }) => {
    const { text } = useAppIntl();

    return (
        <SummarySection header={text('summary.virksomhet.header')}>
            <SummaryBlock header={text('summary.virksomhet.harDuHattInntekt.header')}>
                <JaNeiSvar harSvartJa={virksomhet !== undefined} />
            </SummaryBlock>

            {virksomhet && (
                <>
                    <SummaryBlock header={text('summary.virksomhet.harFlereVirksomheter.header')}>
                        <JaNeiSvar harSvartJa={virksomhet.harFlereAktiveVirksomheter} />
                    </SummaryBlock>
                    <SummaryBlock header={text('summary.virksomhet.virksomhetInfo.tittel')}>
                        <VirksomhetSummary virksomhet={virksomhet} />
                    </SummaryBlock>
                </>
            )}
        </SummarySection>
    );
};

export default SelvstendigOppsummering;
