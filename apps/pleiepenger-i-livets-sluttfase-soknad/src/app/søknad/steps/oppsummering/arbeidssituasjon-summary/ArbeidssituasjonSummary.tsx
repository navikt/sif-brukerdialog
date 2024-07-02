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

interface Props {
    apiData: SøknadApiData;
    søknadsperiode: DateRange;
    frilansoppdrag?: Arbeidsgiver[];
}

const { Answers, Answer, Label, Value, Header, Heading } = FormSummary;

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
                <Header>
                    <Heading level="2">
                        <AppText id="steg.oppsummering.arbeidssituasjon.header" />
                    </Heading>
                </Header>
                <Answers>
                    <ArbeidsgivereSummary arbeidsgivere={arbeidsgivere} søknadsperiode={søknadsperiode} />

                    <ArbeidssituasjonFrilansSummary frilans={frilans} frilansoppdrag={frilansoppdrag} />

                    <ArbeidssituasjonSNSummary selvstendigNæringsdrivende={selvstendigNæringsdrivende} />

                    <OpptjeningIUtlandetSummaryView opptjeningUtland={opptjeningUtland} />

                    <UtenlandskNæringSummary utenlandskNæring={utenlandskNæring} />

                    {/* Vernepliktig */}
                    {harVærtEllerErVernepliktig !== undefined && (
                        <Answer>
                            <Label>
                                <AppText id="oppsummering.arbeidssituasjon.verneplikt.header" />
                            </Label>
                            <Value>
                                <AppText
                                    id={
                                        harVærtEllerErVernepliktig
                                            ? 'oppsummering.arbeidssituasjon.verneplikt.harVærtVernepliktig'
                                            : 'oppsummering.arbeidssituasjon.verneplikt.harIkkeVærtVernepliktig'
                                    }
                                />
                            </Value>
                        </Answer>
                    )}
                </Answers>
            </FormSummary>
        </>
    );
};

export default ArbeidssituasjonSummary;
