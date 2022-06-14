import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import FødselsnummerSvar from '@navikt/sif-common-soknad/lib/soknad-summary/FødselsnummerSvar';
import SummaryBlock from '@navikt/sif-common-soknad/lib/soknad-summary/summary-block/SummaryBlock';
import SummarySection from '@navikt/sif-common-soknad/lib/soknad-summary/summary-section/SummarySection';
import {
    isSøknadFordeling,
    isSøknadKoronaoverføring,
    isSøknadOverføring,
    SoknadApiData,
} from '../../types/SoknadApiData';

interface Props {
    apiValues: SoknadApiData;
}

const MottakerSummary: React.FunctionComponent<Props> = ({ apiValues }) => {
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'step.oppsummering.mottaker.header')}>
            <SummaryBlock header={intlHelper(intl, 'step.oppsummering.mottaker.type')}>
                <FormattedMessage id="step.oppsummering.mottaker.navn" />
                {apiValues.mottakerNavn}
                {isSøknadOverføring(apiValues) && (
                    <>
                        {' '}
                        (<FormattedMessage id={`mottaker.${apiValues.overføring.mottakerType}`} />)
                    </>
                )}
                {isSøknadFordeling(apiValues) && (
                    <>
                        {' '}
                        (<FormattedMessage id={`mottaker.${apiValues.fordeling.mottakerType}`} />)
                    </>
                )}
                <br />
                <FormattedMessage id="Fødselsnummer" />: <FødselsnummerSvar fødselsnummer={apiValues.mottakerFnr} />
            </SummaryBlock>
            {(isSøknadOverføring(apiValues) || isSøknadKoronaoverføring(apiValues)) && (
                <>
                    <SummaryBlock header={intlHelper(intl, 'step.oppsummering.antallDagerSomSkalOverføres')}>
                        <FormattedMessage
                            id={`dager`}
                            values={{
                                dager: isSøknadOverføring(apiValues)
                                    ? apiValues.overføring.antallDagerSomSkalOverføres
                                    : apiValues.korona.antallDagerSomSkalOverføres,
                            }}
                        />
                    </SummaryBlock>
                </>
            )}
        </SummarySection>
    );
};

export default MottakerSummary;
