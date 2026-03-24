import { zSøker } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

export enum ScenarioType {
    default = 'default',
}

export interface ScenarioData {
    søker: z.infer<typeof zSøker>;
}
