import { AppText } from '@i18n/index';
import { FormSummary } from '@navikt/ds-react';
import { EditStepLink } from '@navikt/sif-common-soknad-ds';
import { DateRange } from '@navikt/sif-common-utils';

import { Arbeidsgiver } from '../../../types';
import { SøknadApiData } from '../../../types/søknad-api-data/SøknadApiData';
import ArbeidsgivereSummary from './ArbeidsgivereSummary';
import ArbeidssituasjonFrilansSummary from './ArbeidssituasjonFrilansSummary';
import ArbeidssituasjonSelvstendigSummary from './ArbeidssituasjonSelvstendigSummary';
import UtenlandskNæringSummary from './ArbeidssituasjonUtenlandskNæringSummary';
import FosterhjemsgodtgjørelseSummary from './FosterhjemsgodtgjørelseSummary';
import OmsorgsstønadSummary from './OmsorgsstønadSummary';
import OpptjeningIUtlandetSummary from './OpptjeningIUtlandetSummary';
import VernepliktSummary from './VernepliktSummary';

interface Props {
    apiValues: SøknadApiData;
    søknadsperiode: DateRange;
    frilansoppdrag: Arbeidsgiver[];
    onEdit?: () => void;
}

const ArbeidssituasjonSummary = ({
    apiValues: {
        arbeidsgivere,
        frilans,
        selvstendigNæringsdrivende,
        harVærtEllerErVernepliktig,
        opptjeningIUtlandet,
        utenlandskNæring,
        omsorgsstønad,
        fosterhjemsgodtgjørelse,
    },
    søknadsperiode,
    frilansoppdrag,
    onEdit,
}: Props) => {
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

                    <FosterhjemsgodtgjørelseSummary fosterhjemsgodtgjørelse={fosterhjemsgodtgjørelse} />

                    <OmsorgsstønadSummary omsorgsstønad={omsorgsstønad} />

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
                {onEdit && (
                    <FormSummary.Footer>
                        <EditStepLink onEdit={onEdit} />
                    </FormSummary.Footer>
                )}
            </FormSummary>
        </>
    );
};

export default ArbeidssituasjonSummary;
