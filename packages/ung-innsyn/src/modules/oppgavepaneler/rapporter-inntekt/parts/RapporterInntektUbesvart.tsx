import { GuidePanel, VStack } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-utils';

import { RapporterInntektForm } from '../../../forms/rapporter-inntekt-form/RapporterInntektForm';
import { RapporterInntektKvitteringData, RapporterInntektOppgaveProps } from '../RapporterInntektOppgavePanel';
import { RapporterInntektOppgavetekst } from './RapporterInntektOppgavetekst';

interface Props extends RapporterInntektOppgaveProps {
    periode: DateRange;
    måned: string;
    setKvitteringData: (data: RapporterInntektKvitteringData) => void;
}

export const RapporterInntektUbesvart = ({ oppgave, navn, periode, måned, setKvitteringData }: Props) => {
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
            />
        </VStack>
    );
};
