import RapporterInntektForm from '@innsyn/modules/forms/rapporter-inntekt-form/RapporterInntektForm';
import { GuidePanel, VStack } from '@navikt/ds-react';
import { EnvKey } from '@navikt/sif-common-env';
import { DateRange } from '@navikt/sif-common-utils';
import { getAppEnv } from '@shared/utils/appEnv';
import { useNavigate } from 'react-router-dom';

import { RapporterInntektKvitteringData, RapporterInntektOppgaveProps } from '../RapporterInntektOppgavePage';
import RapporterInntektOppgavetekst from './RapporterInntektOppgavetekst';

interface Props extends RapporterInntektOppgaveProps {
    periode: DateRange;
    måned: string;
    setKvitteringData: (data: RapporterInntektKvitteringData) => void;
}

const RapporterInntektUbesvart = ({ oppgave, deltakerNavn, periode, måned, setKvitteringData }: Props) => {
    const navigate = useNavigate();
    return (
        <VStack gap="10">
            <GuidePanel>
                <RapporterInntektOppgavetekst
                    deltakerNavn={deltakerNavn}
                    periode={periode}
                    svarfrist={oppgave.sisteDatoEnKanSvare}
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
