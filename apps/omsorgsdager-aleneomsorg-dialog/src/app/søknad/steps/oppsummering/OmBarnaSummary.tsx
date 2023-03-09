import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import SummaryList from '@navikt/sif-common-core-ds/lib/components/summary-list/SummaryList';
import { ApiBarn, RegisterteBarnTypeApi } from '../../../types/søknadApiData/SøknadApiData';
import { BarnType } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';

interface Props {
    barn: ApiBarn[];
}

const OmBarnaSummary = ({ barn }: Props) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.deres-felles-barn.header')}>
            <Block margin="l">
                <SummaryList
                    items={barn}
                    itemRenderer={(barn: ApiBarn): string | React.ReactNode => {
                        const { identitetsnummer, type, navn } = barn;
                        const fnr = identitetsnummer ? identitetsnummer : '';
                        const barnType =
                            type !== BarnType.annet && type !== RegisterteBarnTypeApi.fraOppslag
                                ? intlHelper(intl, `step.oppsummering.dineBarn.listItem.${type}`)
                                : '';
                        return <>{`${navn} ${fnr} ${barnType}`}</>;
                    }}
                />
            </Block>
        </SummarySection>
    );
};

export default OmBarnaSummary;
