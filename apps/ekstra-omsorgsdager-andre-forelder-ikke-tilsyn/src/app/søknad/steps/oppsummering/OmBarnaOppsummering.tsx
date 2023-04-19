import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import { ApiBarn } from '../../../types/søknadApiData/SøknadApiData';
import BarnSummaryList from './BarnSummaryList';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';

interface Props {
    barn: ApiBarn[];
}

const OmBarnaOppsummering = ({ barn }: Props) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.omBarna.header')}>
            <Block margin="l">
                <BarnSummaryList barn={barn} />
            </Block>
        </SummarySection>
    );
};

export default OmBarnaOppsummering;
