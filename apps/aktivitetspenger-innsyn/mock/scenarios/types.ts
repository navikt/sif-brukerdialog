import { zSøker } from '@navikt/k9-brukerdialog-prosessering-api';
import { BrukerdialogOppgaveDto, TilgjengeligSøknadResponse } from '@navikt/ung-brukerdialog-api';
import { z } from 'zod';

export enum ScenarioType {
    innsynUtenOppgaver = 'innsynUtenOppgaver',
    innsynMedOppgaver = 'harInnsyn',
    harUbehandletFørstegangssøknad = 'harUbehandletFørstegangssøknad',
    harUbehandletAndregangssøknad = 'harUbehandletAndregangssøknad',
    harIkkeTilgang = 'harIkkeTilgang',
    rapporterInntekt = 'rapporterInntekt',
    rapporterInntektDelerAvMåned = 'rapporterInntektDelerAvMåned',
    avvikInntekt = 'avvikInntekt',
    avvikInntektDelerAvMåned = 'avvikInntektDelerAvMåned',
    bekreftBosted = 'bekreftBosted',
}

export interface ScenarioData {
    søker: z.infer<typeof zSøker>;
    oppgaver: BrukerdialogOppgaveDto[];
    tilgangsinfo: TilgjengeligSøknadResponse;
}
