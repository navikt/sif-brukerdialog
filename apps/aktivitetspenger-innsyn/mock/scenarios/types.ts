import { zSøker } from '@sif/k9-brukerdialog-prosessering-api';
import { BrukerdialogOppgaveDto, TilgjengeligSøknadResponse } from '@sif/ung-brukerdialog-api';
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
    bekreftAndreLivsoppholdsytelser = 'bekreftAndreLivsoppholdsytelser',
    bekreftAndreLivsoppholdsytelserOpphør = 'bekreftAndreLivsoppholdsytelserOpphør',
}

export interface ScenarioData {
    søker: z.infer<typeof zSøker>;
    oppgaver: BrukerdialogOppgaveDto[];
    tilgangsinfo: TilgjengeligSøknadResponse;
}
