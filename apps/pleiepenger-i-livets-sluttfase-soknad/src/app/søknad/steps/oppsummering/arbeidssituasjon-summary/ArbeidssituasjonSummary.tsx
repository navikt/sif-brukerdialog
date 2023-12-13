import React from 'react';
import { useIntl } from 'react-intl';
import ArbeidsgivereSummary from './ArbeidsgivereSummary';
import ArbeidssituasjonFrilansSummary from './ArbeidssituasjonFrilansSummary';
import ArbeidssituasjonSNSummary from './ArbeidssituasjonSNSummary';
import UtenlandskNæringSummary from './ArbeidssituasjonUtenlandskNæringSummary';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';
import { SummaryBlock, SummarySection } from '@navikt/sif-common-soknad-ds';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import OpptjeningIUtlandetSummaryView from './OpptjeningIUtlandetSummaryView';

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
    const intl = useIntl();

    return (
        <SummarySection header={intlHelper(intl, 'steg.oppsummering.arbeidssituasjon.header')}>
            <ArbeidsgivereSummary arbeidsgivere={arbeidsgivere} søknadsperiode={søknadsperiode} />

            <ArbeidssituasjonFrilansSummary frilans={frilans} frilansoppdrag={frilansoppdrag} />

            <ArbeidssituasjonSNSummary selvstendigNæringsdrivende={selvstendigNæringsdrivende} />

            <OpptjeningIUtlandetSummaryView opptjeningUtland={opptjeningUtland} />

            <UtenlandskNæringSummary utenlandskNæring={utenlandskNæring} />

            {/* Vernepliktig */}
            {harVærtEllerErVernepliktig !== undefined && (
                <SummaryBlock header={intlHelper(intl, 'oppsummering.arbeidssituasjon.verneplikt.header')}>
                    <ul>
                        <li>
                            {intlHelper(
                                intl,
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
