import React from 'react';
import { AppText, useAppIntl } from '@i18n/index';
import { SummaryBlock } from '@navikt/sif-common-ui';
import { DateRange } from '@navikt/sif-common-utils';
import { Arbeidsgiver } from '../../../types';
import { SøknadApiData } from '../../../types/søknad-api-data/SøknadApiData';
import ArbeidsgivereSummary from './ArbeidsgivereSummary';
import ArbeidssituasjonFrilansSummary from './ArbeidssituasjonFrilansSummary';
import ArbeidssituasjonSelvstendigSummary from './ArbeidssituasjonSelvstendigSummary';
import UtenlandskNæringSummary from './ArbeidssituasjonUtenlandskNæringSummary';
import OpptjeningIUtlandetSummary from './OpptjeningIUtlandetSummary';
import StønadGodtgjørelseSummary from './StønadGodtgjørelseSummary';
import { FormSummary } from '@navikt/ds-react';
import EditStepLink from '../../../components/edit-step-link/EditStepLink';

interface Props {
    apiValues: SøknadApiData;
    søknadsperiode: DateRange;
    frilansoppdrag: Arbeidsgiver[];
    onEdit?: () => void;
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
    onEdit,
}) => {
    const { text } = useAppIntl();

    return (
        <>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">
                        <AppText id="steg.oppsummering.arbeidssituasjon.header" />
                    </FormSummary.Heading>
                    {onEdit && <EditStepLink onEdit={onEdit} />}
                </FormSummary.Header>
                <FormSummary.Answers>
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
                </FormSummary.Answers>
            </FormSummary>
        </>
    );
};

export default ArbeidssituasjonSummary;
