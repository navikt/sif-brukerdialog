import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import SummarySection from '@navikt/sif-common-soknad-ds/lib/soknad-summary/summary-section/SummarySection';
import {
    isSøknadFordeling,
    isSøknadKoronaoverføring,
    isSøknadOverføring,
    SoknadApiData,
} from '../../types/SoknadApiData';

interface Props {
    apiValues: SoknadApiData;
}

const SøknadstypeSummary: React.FunctionComponent<Props> = ({ apiValues }) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.søknadstype.header')}>
            <Block margin="l">
                {isSøknadOverføring(apiValues) && (
                    <FormattedMessage
                        id={`step.oppsummering.søknadstype.${apiValues.type}.${apiValues.overføring.mottakerType}`}
                    />
                )}
                {isSøknadFordeling(apiValues) && (
                    <FormattedMessage id={`step.oppsummering.søknadstype.${apiValues.type}`} />
                )}
                {isSøknadKoronaoverføring(apiValues) && (
                    <FormattedMessage id={`step.oppsummering.søknadstype.${apiValues.type}`} />
                )}
            </Block>
        </SummarySection>
    );
};

export default SøknadstypeSummary;
