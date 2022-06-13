import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import JaNeiSvar from '@navikt/sif-common-soknad/lib/soknad-summary/JaNeiSvar';
import SummaryBlock from '@navikt/sif-common-soknad/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';
import { ApiBarn, BarnStepApiData } from '../../types/SoknadApiData';
import BarnSummaryList from './BarnSummaryList';

interface Props {
    apiValues: BarnStepApiData;
}

const OmBarnaSummary: React.FunctionComponent<Props> = ({ apiValues }) => {
    const intl = useIntl();
    const harAleneomsorgFor: ApiBarn[] = apiValues.barn.filter((b) => b.aleneOmOmsorgen);
    const harUtvidetRettFor: ApiBarn[] = apiValues.barn.filter((b) => b.utvidetRett);
    return (
        <SummarySection
            header={
                apiValues.barn.length === 1
                    ? intlHelper(intl, 'step.oppsummering.om-barna.header.ettBarn')
                    : intlHelper(intl, 'step.oppsummering.om-barna.header.flereBarn')
            }>
            <SummaryBlock
                header={
                    apiValues.barn.length === 1
                        ? intlHelper(intl, 'step.oppsummering.om-barna.harAleneomsorg.ettBarn')
                        : intlHelper(intl, 'step.oppsummering.om-barna.harAleneomsorg.flereBarn')
                }>
                <JaNeiSvar harSvartJa={apiValues?.harAleneomsorg} />
            </SummaryBlock>
            {harAleneomsorgFor.length > 0 && (
                <SummaryBlock header={intlHelper(intl, 'step.oppsummering.om-barna.hvilkeAvBarnaAleneomsorg')}>
                    <BarnSummaryList barn={harAleneomsorgFor} />
                </SummaryBlock>
            )}
            <SummaryBlock header={intlHelper(intl, 'step.oppsummering.om-barna.harNoenUtvidetRett')}>
                <JaNeiSvar harSvartJa={apiValues?.harUtvidetRett} />
            </SummaryBlock>
            {apiValues.harUtvidetRett && (
                <SummaryBlock header={intlHelper(intl, 'step.oppsummering.om-barna.hvilkeAvBarnaUtvRett')}>
                    <BarnSummaryList barn={harUtvidetRettFor} />
                </SummaryBlock>
            )}
        </SummarySection>
    );
};

export default OmBarnaSummary;
