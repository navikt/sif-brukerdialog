import React from 'react';
import { useIntl } from 'react-intl';
import { SelvstendigApiData } from '../../../../types/søknadApiData/SelvstendigApiData';
import { JaNeiSvar, SummaryBlock, SummarySection } from '@navikt/sif-common-soknad-ds';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import VirksomhetSummary from '@navikt/sif-common-forms-ds/lib/forms/virksomhet/VirksomhetSummary';

interface Props {
    selvstendig: SelvstendigApiData;
}

const SelvstendigOppsummering: React.FC<Props> = ({ selvstendig }) => {
    const intl = useIntl();
    const { harInntektSomSelvstendig } = selvstendig;
    return (
        <SummarySection header={intlHelper(intl, 'summary.virksomhet.header')}>
            <SummaryBlock header={intlHelper(intl, 'summary.virksomhet.harDuHattInntekt.header')}>
                <JaNeiSvar harSvartJa={harInntektSomSelvstendig === true} />
            </SummaryBlock>

            {harInntektSomSelvstendig && (
                <>
                    <SummaryBlock header={intlHelper(intl, 'summary.virksomhet.harFlereVirksomheter.header')}>
                        <JaNeiSvar harSvartJa={selvstendig.virksomhet.harFlereAktiveVirksomheter} />
                    </SummaryBlock>
                    <SummaryBlock header={intlHelper(intl, 'summary.virksomhet.virksomhetInfo.tittel')}>
                        <VirksomhetSummary virksomhet={selvstendig.virksomhet} />
                    </SummaryBlock>
                </>
            )}
        </SummarySection>
    );
};

export default SelvstendigOppsummering;
