import { FormSummary } from '@navikt/ds-react';
import React from 'react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { AppText } from '../../../../i18n';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';
import { SøknadApiData } from '../../../../types/søknadApiData/SøknadApiData';
import ArbeidsgivereSummary from './ArbeidsgivereSummary';
import ArbeidssituasjonFrilansSummary from './ArbeidssituasjonFrilansSummary';
import ArbeidssituasjonSNSummary from './ArbeidssituasjonSNSummary';
import UtenlandskNæringSummary from './ArbeidssituasjonUtenlandskNæringSummary';
import OpptjeningIUtlandetSummaryView from './OpptjeningIUtlandetSummaryView';
import VernepliktigSummary from './VernepliktigSummary';

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
    return (
        <>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">
                        <AppText id="steg.oppsummering.arbeidssituasjon.header" />
                    </FormSummary.Heading>
                </FormSummary.Header>
                <FormSummary.Answers>
                    <ArbeidsgivereSummary arbeidsgivere={arbeidsgivere} søknadsperiode={søknadsperiode} />

                    <ArbeidssituasjonFrilansSummary frilans={frilans} frilansoppdrag={frilansoppdrag} />

                    <ArbeidssituasjonSNSummary selvstendigNæringsdrivende={selvstendigNæringsdrivende} />

                    <OpptjeningIUtlandetSummaryView opptjeningUtland={opptjeningUtland} />

                    <UtenlandskNæringSummary utenlandskNæring={utenlandskNæring} />

                    {/* Vernepliktig */}
                    {harVærtEllerErVernepliktig !== undefined && (
                        <VernepliktigSummary harVærtEllerErVernepliktig={harVærtEllerErVernepliktig} />
                    )}
                </FormSummary.Answers>
            </FormSummary>
        </>
    );
};

export default ArbeidssituasjonSummary;
