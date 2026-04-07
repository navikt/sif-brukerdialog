import { zBarnOppslag, zSøker } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

export enum ScenarioType {
    default = 'default',
    ingenRegistrerteBarn = 'ingenRegistrerteBarn',
    innsendingFeiler = 'innsendingFeiler',
    innsendingFeilerMedUgyldigeParametre = 'innsendingFeilerMedUgyldigeParametre',
}

interface InnsendingResponse {
    status: number;
    body?: Record<string, unknown>;
}

export interface ScenarioData {
    søker: z.infer<typeof zSøker>;
    barn: { barn: Array<z.infer<typeof zBarnOppslag>> };
    mellomlagring?: Record<string, unknown>;
    innsendingResponse?: InnsendingResponse;
}
