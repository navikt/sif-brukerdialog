import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import { BarnStepApiData } from '../../types/SoknadApiData';
import BarnSummaryList from './BarnSummaryList';

interface Props {
    apiValues: BarnStepApiData;
}

const DineBarnSummary: React.FunctionComponent<Props> = ({ apiValues: { barn } }) => {
    const intl = useIntl();
    return (
        <SummarySection
            header={
                barn.length === 1
                    ? intlHelper(intl, 'step.oppsummering.dine-barn.header.ettBarn')
                    : intlHelper(intl, 'step.oppsummering.dine-barn.header.flereBarn')
            }>
            <Block margin="l">
                <BarnSummaryList barn={barn} />
            </Block>
        </SummarySection>
    );
};

export default DineBarnSummary;
