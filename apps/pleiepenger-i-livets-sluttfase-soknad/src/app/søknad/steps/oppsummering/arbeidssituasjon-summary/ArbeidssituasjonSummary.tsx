import React from 'react';
import ArbeidsgivereSummary from './ArbeidsgivereSummary';
import ArbeidssituasjonFrilansSummary from './ArbeidssituasjonFrilansSummary';
import ArbeidssituasjonSNSummary from './ArbeidssituasjonSNSummary';
import UtenlandskNæringSummary from './ArbeidssituasjonUtenlandskNæringSummary';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';
import { SummaryBlock, SummarySection } from '@navikt/sif-common-ui';
import OpptjeningIUtlandetSummaryView from './OpptjeningIUtlandetSummaryView';
import { useAppIntl } from '../../../../i18n';

interface Props {
    apiData: SøknadApiData;
    søknadsperiode: DateRange;
    frilansoppdrag?: Arbeidsgiver[];
}

const ArbeidssituasjonSummary: React.FC<Props> = ({
    apiData: {
        arbeidsgivere,
        frilans,
        selvstendigNæringsdrivende,
        opptjeningIUtlandet: opptjeningUtland,
        harVærtEllerErVernepliktig,
        utenlandskNæring,
    },
    søknadsperiode,
    frilansoppdrag,
}) => {
    const { text } = useAppIntl();

    return (
        <SummarySection header={text('steg.oppsummering.arbeidssituasjon.header')}>
            <ArbeidsgivereSummary arbeidsgivere={arbeidsgivere} søknadsperiode={søknadsperiode} />

            <ArbeidssituasjonFrilansSummary frilans={frilans} frilansoppdrag={frilansoppdrag} />

            <ArbeidssituasjonSNSummary selvstendigNæringsdrivende={selvstendigNæringsdrivende} />

            <OpptjeningIUtlandetSummaryView opptjeningUtland={opptjeningUtland} />

            <UtenlandskNæringSummary utenlandskNæring={utenlandskNæring} />

            {/* Vernepliktig */}
            {harVærtEllerErVernepliktig !== undefined && (
                <SummaryBlock header={text('oppsummering.arbeidssituasjon.verneplikt.header')}>
                    <ul>
                        <li>
                            {text(
                                harVærtEllerErVernepliktig
                                    ? 'oppsummering.arbeidssituasjon.verneplikt.harVærtVernepliktig'
                                    : 'oppsummering.arbeidssituasjon.verneplikt.harIkkeVærtVernepliktig',
                            )}
                        </li>
                    </ul>
                </SummaryBlock>
            )}
        </SummarySection>
    );
};

export default ArbeidssituasjonSummary;
