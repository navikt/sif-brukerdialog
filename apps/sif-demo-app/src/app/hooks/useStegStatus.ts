import { StegStatusCallbacks } from '@rammeverk/types';

import { skalStegVises } from '../config/stegConfig';
import { Søknadsdata } from '../types/Søknadsdata';
import { useSøknadStore } from './useSøknadStore';

export const useStegStatus = (): StegStatusCallbacks => {
    const erStegFullført = useSøknadStore((s) => s.erStegFullført);

    return {
        erFullført: erStegFullført,
        skalVises: (stegId: string) => {
            // Les fresh state fra store for å unngå closure over gammel søknadsdata
            const søknadsdata = useSøknadStore.getState().søknadState?.søknadsdata ?? ({} as Søknadsdata);
            return skalStegVises(stegId, søknadsdata);
        },
    };
};
