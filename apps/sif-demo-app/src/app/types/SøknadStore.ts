import { SøknadState } from '../config/stegConfig';
import { RegistrertBarn, Søker } from '@navikt/sif-common-query';
import { Søknadsdata } from './Søknadsdata';

export interface SøknadStore {
    søknadState: SøknadState | undefined;
    init: (søker: Søker, barn: RegistrertBarn[], mellomlagretSøknadsdata?: Søknadsdata) => void;
    submitSteg: (data: Partial<Søknadsdata>) => void;
    erStegFullført: (stegId: string) => boolean;
    resetSøknad: () => void;
}
