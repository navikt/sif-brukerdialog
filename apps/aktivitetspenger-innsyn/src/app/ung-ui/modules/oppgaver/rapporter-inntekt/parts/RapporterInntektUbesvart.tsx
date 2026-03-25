import { GuidePanel, VStack } from '@navikt/ds-react';
import { EnvKey } from '@navikt/sif-common-env';
import { DateRange } from '@navikt/sif-common-utils';
import { useNavigate } from 'react-router-dom';

import { getAppEnv } from '../../../../../appEnv';
import RapporterInntektForm from '../../../forms/rapporter-inntekt-form/RapporterInntektForm';
import { RapporterInntektKvitteringData, RapporterInntektOppgaveProps } from '../RapporterInntektOppgavePage';
import RapporterInntektOppgavetekst from './RapporterInntektOppgavetekst';

interface Props extends RapporterInntektOppgaveProps {
    periode: DateRange;
    måned: string;
    setKvitteringData: (data: RapporterInntektKvitteringData) => void;
}

const RapporterInntektUbesvart = ({ oppgave, navn, periode, måned, setKvitteringData }: Props) => {
    const navigate = useNavigate();

    return (
        <VStack gap="space-40">
            <GuidePanel>
                <RapporterInntektOppgavetekst
                    navn={navn}
                    periode={periode}
                    svarfrist={oppgave.sisteDatoEnKanSvare}
                    gjelderDelerAvMåned={oppgave.oppgavetypeData.gjelderDelerAvMåned}
                />
            </GuidePanel>
            <RapporterInntektForm
                måned={måned}
                oppgaveReferanse={oppgave.oppgaveReferanse}
                onSuccess={(harRapportertInntekt) => setKvitteringData({ harHattInntektOver0: harRapportertInntekt })}
                onCancel={() => navigate(getAppEnv()[EnvKey.PUBLIC_PATH])}
            />
        </VStack>
    );
};

export default RapporterInntektUbesvart;
