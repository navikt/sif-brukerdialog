import React from 'react';
import { useIntl } from 'react-intl';
import { JaNeiSvar, SummaryBlock, SummarySection } from '@navikt/sif-common-soknad-ds';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import VirksomhetSummary from '@navikt/sif-common-forms-ds/lib/forms/virksomhet/VirksomhetSummary';
import { VirksomhetApiData } from '@navikt/sif-common-forms-ds/lib';

interface Props {
    virksomhet?: VirksomhetApiData;
}

const SelvstendigOppsummering: React.FC<Props> = ({ virksomhet }) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'summary.virksomhet.header')}>
            <SummaryBlock header={intlHelper(intl, 'summary.virksomhet.harDuHattInntekt.header')}>
                <JaNeiSvar harSvartJa={virksomhet !== undefined} />
            </SummaryBlock>

            {virksomhet && (
                <>
                    <SummaryBlock header={intlHelper(intl, 'summary.virksomhet.harFlereVirksomheter.header')}>
                        <JaNeiSvar harSvartJa={virksomhet.harFlereAktiveVirksomheter} />
                    </SummaryBlock>
                    <SummaryBlock header={intlHelper(intl, 'summary.virksomhet.virksomhetInfo.tittel')}>
                        <VirksomhetSummary virksomhet={virksomhet} />
                    </SummaryBlock>
                </>
            )}
        </SummarySection>
    );
};

export default SelvstendigOppsummering;
