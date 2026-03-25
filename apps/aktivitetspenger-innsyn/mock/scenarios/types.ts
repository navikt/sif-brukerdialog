import { zSøker } from '@navikt/k9-brukerdialog-prosessering-api';
import { BrukerdialogOppgaveDto } from '@navikt/ung-brukerdialog-api';
import { z } from 'zod';

export enum ScenarioType {
    default = 'default',
    rapporterInntekt = 'rapporterInntekt',
    rapporterInntektDelerAvMåned = 'rapporterInntektDelerAvMåned',
    avvikInntekt = 'avvikInntekt',
    avvikInntektDelerAvMåned = 'avvikInntektDelerAvMåned',
}

export interface ScenarioData {
    søker: z.infer<typeof zSøker>;
    oppgaver: BrukerdialogOppgaveDto[];
}
