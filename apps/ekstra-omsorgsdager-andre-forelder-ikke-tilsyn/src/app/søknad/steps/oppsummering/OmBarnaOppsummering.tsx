import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import { SøknadApiData } from '../../../types/søknadApiData/SøknadApiData';
import BarnSummaryList from './BarnSummaryList';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';

interface Props {
    apiValues: SøknadApiData;
}

const OmBarnaOppsummering = ({ apiValues: { barn } }: Props) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.deres-felles-barn.header')}>
            <Block margin="l">
                <BarnSummaryList barn={barn} />
            </Block>
        </SummarySection>
    );
};

export default OmBarnaOppsummering;
