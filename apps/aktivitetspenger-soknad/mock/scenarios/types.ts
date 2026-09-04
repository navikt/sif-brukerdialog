import { zBarnOppslag, zSøker } from '@navikt/k9-brukerdialog-prosessering-api';
import { KontonummerDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { TilgjengeligSøknadResponse } from '@navikt/ung-brukerdialog-api';
import { z } from 'zod';

export enum ScenarioType {
    default = 'default',
    kanSøkeFørstegang = 'kanSøkeFørstegang',
    kanIkkeSøke = 'kanIkkeSøke',
    medKontonummer = 'medKontonummer',
    ingenRegistrerteBarn = 'ingenRegistrerteBarn',
    utenKontonummer = 'utenKontonummer',
}

export interface ScenarioData {
    søker: z.infer<typeof zSøker>;
    barn: { barn: Array<z.infer<typeof zBarnOppslag>> };
    kontonummer?: KontonummerDto;
    tilgjengeligSøknad: TilgjengeligSøknadResponse;
    mellomlagring?: Record<string, unknown>;
}
