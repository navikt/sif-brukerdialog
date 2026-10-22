import { zBarnOppslag, zSøker } from '@sif/k9-brukerdialog-prosessering-api';
import { TilgjengeligSøknadResponse } from '@sif/ung-brukerdialog-api';
import { KontonummerDto } from '@sif/ung-deltakelse-opplyser-api-deltaker';
import { z } from 'zod';

export enum ScenarioType {
    default = 'default',
    kanSøkeFørstegang = 'kanSøkeFørstegang',
    ubehandletFørstegangssøknad = 'ubehandletFørstegangssøknad',
    ubehandletAndregangssøknad = 'ubehandletAndregangssøknad',
    harAktivitetspengerMenUtenforSøknadsvindu = 'harAktivitetspengerMenUtenforSøknadsvindu',
    sperretAnnet = 'sperretAnnet',
    medKontonummer = 'medKontonummer',
    ingenRegistrerteBarn = 'ingenRegistrerteBarn',
    utenKontonummer = 'utenKontonummer',
    søker30ÅrEllerEldre = 'søker30ÅrEllerEldre',
}

export interface ScenarioData {
    søker: z.infer<typeof zSøker>;
    barn: { barn: Array<z.infer<typeof zBarnOppslag>> };
    kontonummer?: KontonummerDto;
    tilgjengeligSøknad: TilgjengeligSøknadResponse;
    mellomlagring?: Record<string, unknown>;
}
