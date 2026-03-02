import { z } from 'zod';
import { zBarnOppslag, zSøker } from '@navikt/k9-brukerdialog-prosessering-api';

export enum ScenarioType {
    default = 'default',
}

export interface ScenarioData {
    søker: z.infer<typeof zSøker>;
    barn: z.infer<typeof zBarnOppslag>[];
    mellomlagring?: Record<string, unknown>;
}
