import { FormSummary } from '@navikt/ds-react';
import React from 'react';
import { AppText } from '@i18n/index';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { DateRange } from '@navikt/sif-common-utils';
import { Arbeidsgiver } from '../../../types';
import { SøknadApiData } from '../../../types/søknad-api-data/SøknadApiData';
import ArbeidsgivereSummary from './ArbeidsgivereSummary';
import ArbeidssituasjonFrilansSummary from './ArbeidssituasjonFrilansSummary';
import ArbeidssituasjonSelvstendigSummary from './ArbeidssituasjonSelvstendigSummary';
import UtenlandskNæringSummary from './ArbeidssituasjonUtenlandskNæringSummary';
import OpptjeningIUtlandetSummary from './OpptjeningIUtlandetSummary';
import StønadGodtgjørelseSummary from './StønadGodtgjørelseSummary';
import VernepliktSummary from './VernepliktSummary';

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

                    <VernepliktSummary harVærtEllerErVernepliktig={harVærtEllerErVernepliktig} />
                </FormSummary.Answers>
            </FormSummary>
        </>
    );
};

export default ArbeidssituasjonSummary;
