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
import VernepliktSummary from './VernepliktSummary';

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
        opptjeningIUtlandet,
        harVærtEllerErVernepliktig,
        utenlandskNæring,
    },
    søknadsperiode,
    frilansoppdrag,
}) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <AppText id="step.oppsummeringarbeidssituasjon.header" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <ArbeidsgivereSummary arbeidsgivere={arbeidsgivere} søknadsperiode={søknadsperiode} />

                <ArbeidssituasjonFrilansSummary frilans={frilans} frilansoppdrag={frilansoppdrag} />

                <ArbeidssituasjonSNSummary selvstendigNæringsdrivende={selvstendigNæringsdrivende} />

                <OpptjeningIUtlandetSummaryView opptjeningUtland={opptjeningIUtlandet} />

                <UtenlandskNæringSummary utenlandskNæring={utenlandskNæring} />

                <VernepliktSummary harVærtEllerErVernepliktig={harVærtEllerErVernepliktig} />
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default ArbeidssituasjonSummary;
