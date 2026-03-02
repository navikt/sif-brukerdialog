import { StegStatusCallbacks } from '@rammeverk/types';

import { skalStegVises } from '../config/stegConfig';
import { Søknadsdata } from '../types/Søknadsdata';
import { useSøknadStore } from './useSøknadStore';

export const useStegStatus = (): StegStatusCallbacks => {
    const erStegFullført = useSøknadStore((s) => s.erStegFullført);
    const søknadsdata = useSøknadStore((s) => s.søknadState?.søknadsdata) ?? ({} as Søknadsdata);

    return {
        erFullført: erStegFullført,
        skalVises: (stegId: string) => skalStegVises(stegId, søknadsdata),
    };
};
