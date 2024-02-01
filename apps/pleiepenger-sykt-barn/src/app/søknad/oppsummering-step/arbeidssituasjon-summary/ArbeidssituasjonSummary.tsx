import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SummaryBlock, SummarySection } from '@navikt/sif-common-ui';
import { DateRange } from '@navikt/sif-common-utils';
import { Arbeidsgiver } from '../../../types';
import { SøknadApiData } from '../../../types/søknad-api-data/SøknadApiData';
import ArbeidsgivereSummary from './ArbeidsgivereSummary';
import ArbeidssituasjonFrilansSummary from './ArbeidssituasjonFrilansSummary';
import ArbeidssituasjonSelvstendigSummary from './ArbeidssituasjonSelvstendigSummary';
import UtenlandskNæringSummary from './ArbeidssituasjonUtenlandskNæringSummary';
import OpptjeningIUtlandetSummary from './OpptjeningIUtlandetSummary';
import StønadGodtgjørelseSummary from './StønadGodtgjørelseSummary';

interface Props {
    apiValues: SøknadApiData;
    søknadsperiode: DateRange;
    frilansoppdrag: Arbeidsgiver[];
}

const ArbeidssituasjonSummary: React.FunctionComponent<Props> = ({
    apiValues: {
        arbeidsgivere,
        frilans,
        selvstendigNæringsdrivende,
        harVærtEllerErVernepliktig,
        opptjeningIUtlandet,
        utenlandskNæring,
        stønadGodtgjørelse,
    },
    søknadsperiode,
    frilansoppdrag,
}) => {
    const intl = useIntl();

    return (
        <div data-testid="oppsummering-arbeidssituasjon">
            <SummarySection header={intlHelper(intl, 'steg.oppsummering.arbeidssituasjon.header')}>
                <ArbeidsgivereSummary arbeidsgivere={arbeidsgivere} søknadsperiode={søknadsperiode} />

                <StønadGodtgjørelseSummary stønadGodtgjørelse={stønadGodtgjørelse} />

                <ArbeidssituasjonFrilansSummary
                    frilans={frilans}
                    frilansoppdrag={frilansoppdrag}
                    søknadsperiode={søknadsperiode}
                />

                <ArbeidssituasjonSelvstendigSummary selvstendig={selvstendigNæringsdrivende} />

                <OpptjeningIUtlandetSummary opptjeningUtland={opptjeningIUtlandet} />

                <UtenlandskNæringSummary utenlandskNæring={utenlandskNæring} />

                {/* Vernepliktig */}
                {harVærtEllerErVernepliktig !== undefined && (
                    <SummaryBlock header={intlHelper(intl, 'verneplikt.summary.header')}>
                        <ul>
                            <li>
                                {intlHelper(
                                    intl,
                                    harVærtEllerErVernepliktig
                                        ? 'verneplikt.summary.harVærtVernepliktig'
                                        : 'verneplikt.summary.harIkkeVærtVernepliktig',
                                )}
                            </li>
                        </ul>
                    </SummaryBlock>
                )}
            </SummarySection>
        </div>
    );
};

export default ArbeidssituasjonSummary;
