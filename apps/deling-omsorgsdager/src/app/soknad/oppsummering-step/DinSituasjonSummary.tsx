import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import SummaryList from '@navikt/sif-common-core/lib/components/summary-list/SummaryList';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import JaNeiSvar from '@navikt/sif-common-soknad/lib/soknad-summary/JaNeiSvar';
import SummaryBlock from '@navikt/sif-common-soknad/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';
import TallSvar from '@navikt/sif-common-soknad/lib/soknad-summary/TallSvar';
import { DinSituasjonApiData } from '../../utils/map-form-data-to-api-data/mapDinSituasjonToApiData';

interface Props {
    apiValues: DinSituasjonApiData;
}

const DinSituasjonSummary: React.FunctionComponent<Props> = ({ apiValues }) => {
    const intl = useIntl();
    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.dinSituasjon.header')}>
            <SummaryBlock header={intlHelper(intl, 'step.oppsummering.dinSituasjon.erYkesaktiv')}>
                <JaNeiSvar harSvartJa={apiValues.erYrkesaktiv} />
            </SummaryBlock>
            <SummaryBlock header={intlHelper(intl, 'step.oppsummering.dinSituasjon.arbeidssituasjon')}>
                <SummaryList
                    items={apiValues.arbeidssituasjon}
                    itemRenderer={(a): JSX.Element => <FormattedMessage id={`arbeidssituasjon.${a}`} />}
                />
            </SummaryBlock>
            <SummaryBlock header={intlHelper(intl, 'step.oppsummering.dinSituasjon.arbeiderINorge')}>
                <JaNeiSvar harSvartJa={apiValues.arbeiderINorge} />
            </SummaryBlock>
            {apiValues.antallDagerBruktEtter1Juli && (
                <SummaryBlock header={intlHelper(intl, 'step.oppsummering.dinSituasjon.harBruktOmsorgsdager2021')}>
                    <TallSvar verdi={apiValues.antallDagerBruktEtter1Juli} />
                </SummaryBlock>
            )}
            {apiValues.antallDagerBruktEtter1Juli === undefined && (
                <SummaryBlock header={intlHelper(intl, 'step.oppsummering.dinSituasjon.harBruktOmsorgsdager2021')}>
                    <JaNeiSvar harSvartJa={false} />
                </SummaryBlock>
            )}
        </SummarySection>
    );
};

export default DinSituasjonSummary;
