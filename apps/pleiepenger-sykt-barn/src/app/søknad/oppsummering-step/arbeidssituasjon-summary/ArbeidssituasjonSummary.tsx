import React from 'react';
import { useAppIntl } from '@i18n/index';
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
    const { text } = useAppIntl();

    return (
        <div data-testid="oppsummering-arbeidssituasjon">
            <SummarySection header={text('steg.oppsummering.arbeidssituasjon.header')}>
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
                    <SummaryBlock header={text('verneplikt.summary.header')}>
                        <ul>
                            <li>
                                {text(
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
