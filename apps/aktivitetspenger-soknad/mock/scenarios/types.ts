import { zBarnOppslag, zSøker } from '@navikt/k9-brukerdialog-prosessering-api';
import { KontonummerDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { z } from 'zod';

export enum ScenarioType {
    default = 'default',
    medKontonummer = 'medKontonummer',
    ingenRegistrerteBarn = 'ingenRegistrerteBarn',
}

export interface ScenarioData {
    søker: z.infer<typeof zSøker>;
    barn: { barn: Array<z.infer<typeof zBarnOppslag>> };
    kontonummer?: KontonummerDto;
    mellomlagring?: Record<string, unknown>;
}
