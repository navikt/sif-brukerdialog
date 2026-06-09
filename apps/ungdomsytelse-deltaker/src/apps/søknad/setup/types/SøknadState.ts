import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';
import { SøkYtelseOppgave } from '@sif/api/ung-brukerdialog';
import { UtvidetKontonummerInfo } from '@sif/api/ung-deltaker';

import { Søknadsdata } from './Søknadsdata';

export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    kontoInfo: UtvidetKontonummerInfo;
    søknadOppgave: SøkYtelseOppgave;
    søknadsdata: Søknadsdata;
}
